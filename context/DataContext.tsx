
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../src/supabaseClient';
import { SERVICE_GROUPS, PRICING_PLANS, CALCULATOR_COMPONENTS } from '../constants';
import { ServiceGroup, PricingPlan, ComponentProps, Lead, LeadStatus, ServiceCategory, Service } from '../types';

interface DataContextType {
    serviceGroups: ServiceGroup[];
    pricingPlans: PricingPlan[];
    calculatorComponents: ComponentProps[];
    leads: Lead[];
    isLoading: boolean;
    updateServiceGroups: (groups: ServiceGroup[]) => Promise<void>;
    updatePricingPlans: (plans: PricingPlan[]) => void;
    updateCalculatorComponents: (components: ComponentProps[]) => void;
    addLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'status'>) => Promise<Lead>;
    addLeadComment: (leadId: string, comment: string, author: string) => Promise<void>;
    importLeadsFromCSV: (file: File) => Promise<void>;
    updateLeadStatus: (id: string, status: LeadStatus) => void;
    deleteLead: (id: string) => void;
    resetToDefaults: () => void;

    // Agent Management
    profiles: any[]; // Ideally 'Profile[]' if imported
    fetchProfiles: () => Promise<void>;
    updateProfile: (id: string, updates: any) => Promise<void>;
    deleteProfile: (id: string) => Promise<void>;
    assignLead: (leadId: string, agentId: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);
    const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
    const [calculatorComponents, setCalculatorComponents] = useState<ComponentProps[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchServiceGroups = async () => {
        try {
            // Fetch Categories
            const { data: categories, error: catError } = await supabase
                .from('categories')
                .select('*')
                .order('created_at', { ascending: true });

            if (catError) throw catError;

            // Fetch Services
            const { data: services, error: servError } = await supabase
                .from('services')
                .select('*');

            if (servError) throw servError;

            if (categories && services) {
                const groups: ServiceGroup[] = categories.map(cat => ({
                    category: cat.name as ServiceCategory,
                    description: cat.description || '',
                    services: services
                        .filter(s => s.category_id === cat.id)
                        .map(s => ({
                            name: s.name,
                            startingPrice: s.starting_price,
                            features: s.features || []
                        }))
                }));
                if (groups.length > 0) setServiceGroups(groups);
            }
        } catch (error) {
            console.error('Error fetching data from Supabase:', error);
            // Fallback to constants if DB fails (or is empty)
            if (serviceGroups.length === 0) setServiceGroups(SERVICE_GROUPS);
        }
    };

    // Agent Management Local State
    const [profiles, setProfiles] = useState<any[]>([]);

    const fetchProfiles = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Supabase fetchProfiles error:', error);
                throw error;
            }
            console.log('Fetched profiles raw:', data);
            if (data) setProfiles(data);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    // Add create/update/delete profile helpers
    const createAgentProfile = async (email: string, fullName: string, role: string) => {
        // This is a "best effort" insert. It will fail if user doesn't exist in Auth.
        // We rely on the trigger for real creation, this is just for manual admin overrides or pre-seeds if foreign key was looser.
        // However, since we have strict FK, we might just return an error or handle it.
        // For now, let's assume we can't create directly without auth user.
        console.warn("Cannot create profile without Auth User. Ask agent to sign up.");
        return null;
    };

    const updateProfile = async (id: string, updates: any) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', id);

            if (error) throw error;
            await fetchProfiles();
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    };

    const deleteProfile = async (id: string) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setProfiles(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting profile:', error);
            throw error;
        }
    };

    const fetchLeads = async () => {
        try {
            // Join with profiles to get assigned agent name
            // Note: assigned_to is UUID, so we join on profiles via assigned_to
            const { data, error } = await supabase
                .from('leads')
                .select(`
                    *,
                    assigned_to_profile:profiles!leads_assigned_to_fkey(full_name)
                `)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Supabase fetchLeads error:', error);
                throw error;
            }

            console.log('Fetched leads:', data?.length);

            if (data) {
                const mappedLeads: Lead[] = data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    email: item.email,
                    phone: item.phone,
                    location: item.location || '',
                    plan: item.plan || '',
                    price: item.price || '',
                    status: item.status as LeadStatus,
                    timestamp: item.created_at,
                    source: item.source || 'Website',
                    comments: item.comments || [],
                    items: item.items,
                    assignedTo: item.assigned_to,
                    assignedToName: item.assigned_to_profile?.full_name
                }));
                setLeads(mappedLeads);
            }
        } catch (error) {
            console.error('Error fetching leads:', error);
        }
    };

    useEffect(() => {
        const initializeData = async () => {
            await fetchServiceGroups();
            await fetchProfiles();
            await fetchLeads();

            // Keep other data local/constants for now as per plan
            const savedPricing = localStorage.getItem('majestic_pricing');
            const savedCalculator = localStorage.getItem('majestic_calculator');

            // Fallback for services if fetch failed (handled in fetchServiceGroups but redundant check for safety)
            if (serviceGroups.length === 0) setServiceGroups(SERVICE_GROUPS);

            if (savedPricing) setPricingPlans(JSON.parse(savedPricing));
            else setPricingPlans(PRICING_PLANS);

            if (savedCalculator) setCalculatorComponents(JSON.parse(savedCalculator));
            else setCalculatorComponents(CALCULATOR_COMPONENTS);

            setIsLoading(false);
        };

        initializeData();
    }, []);

    const updateServiceGroups = async (groups: ServiceGroup[]) => {
        // Optimistic update
        setServiceGroups(groups);
        console.warn('Update functionality requires backend implementation matching new schema IDs.');
    };

    const updatePricingPlans = (plans: PricingPlan[]) => {
        setPricingPlans(plans);
        localStorage.setItem('majestic_pricing', JSON.stringify(plans));
    };

    const updateCalculatorComponents = (components: ComponentProps[]) => {
        setCalculatorComponents(components);
        localStorage.setItem('majestic_calculator', JSON.stringify(components));
    };

    const addLead = async (leadData: Omit<Lead, 'id' | 'timestamp' | 'status'>): Promise<Lead> => {
        const tempId = `temp-${Date.now()} `;
        const newLead: Lead = {
            ...leadData,
            id: tempId,
            timestamp: new Date().toISOString(),
            status: 'New',
            source: 'Website',
            comments: []
        };

        try {
            const { data, error } = await supabase
                .from('leads')
                .insert([{
                    name: leadData.name,
                    email: leadData.email,
                    phone: leadData.phone,
                    location: leadData.location,
                    plan: leadData.plan,
                    price: leadData.price,
                    status: 'New',
                    source: 'Website',
                    comments: [],
                    items: leadData.items
                }])
                .select()
                .single();

            if (error) throw error;

            if (data) {
                const createdLead: Lead = {
                    id: data.id,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    location: data.location || '',
                    plan: data.plan || '',
                    price: data.price || '',
                    status: data.status as LeadStatus,
                    timestamp: data.created_at,
                    source: data.source,
                    comments: data.comments,
                    items: data.items
                };
                setLeads(prev => [createdLead, ...prev]);
                return createdLead;
            }
        } catch (error) {
            console.error('Error adding lead:', error);
            alert('Failed to save lead to database. Please try again.');
        }
        return newLead;
    };

    const addLeadComment = async (leadId: string, comment: string, author: string) => {
        try {
            const leadIndex = leads.findIndex(l => l.id === leadId);
            if (leadIndex === -1) return;

            const existingComments = leads[leadIndex].comments || [];
            const newCommentObj = {
                text: comment,
                timestamp: new Date().toISOString(),
                author: author
            };
            const updatedComments = [...existingComments, newCommentObj];

            // Optimistic update
            const updatedLeads = [...leads];
            updatedLeads[leadIndex] = { ...updatedLeads[leadIndex], comments: updatedComments };
            setLeads(updatedLeads);

            const { error } = await supabase
                .from('leads')
                .update({ comments: updatedComments })
                .eq('id', leadId);

            if (error) {
                console.error('Error adding comment:', error);
                // Revert if needed
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const importLeadsFromCSV = async (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target?.result as string;
            if (!text) return;

            const rows = text.split('\n');
            // Assuming header: Name, Email, Phone, Location, Plan, Price, Source, Status
            const headers = rows[0].split(',').map(h => h.trim().toLowerCase());

            const newLeadsPayload = [];

            for (let i = 1; i < rows.length; i++) {
                const row = rows[i].split(',');
                if (row.length < 3) continue; // Skip empty/invalid rows

                const leadObj: any = {};
                row.forEach((cell, index) => {
                    // Simple CSV parsing, might need better logic for quoted fields
                    const cleanCell = cell.replace(/"/g, '').trim();
                    const header = headers[index];

                    if (header === 'name') leadObj.name = cleanCell;
                    else if (header === 'email') leadObj.email = cleanCell;
                    else if (header === 'phone') leadObj.phone = cleanCell;
                    else if (header === 'location') leadObj.location = cleanCell;
                    else if (header === 'plan') leadObj.plan = cleanCell;
                    else if (header === 'price') leadObj.price = cleanCell;
                    else if (header === 'source') leadObj.source = cleanCell;
                    else if (header === 'status') leadObj.status = cleanCell;
                });

                if (leadObj.name && leadObj.email) {
                    newLeadsPayload.push({
                        name: leadObj.name,
                        email: leadObj.email,
                        phone: leadObj.phone || '',
                        location: leadObj.location || '',
                        plan: leadObj.plan || 'Custom',
                        price: leadObj.price || '0',
                        status: leadObj.status || 'New',
                        source: leadObj.source || 'CSV Import',
                        comments: [],
                        items: []
                    });
                }
            }

            if (newLeadsPayload.length > 0) {
                try {
                    const { data, error } = await supabase
                        .from('leads')
                        .insert(newLeadsPayload)
                        .select();

                    if (error) throw error;

                    if (data) {
                        const importedLeads: Lead[] = data.map((item: any) => ({
                            id: item.id,
                            name: item.name,
                            email: item.email,
                            phone: item.phone,
                            location: item.location || '',
                            plan: item.plan || '',
                            price: item.price || '',
                            status: item.status as LeadStatus,
                            timestamp: item.created_at,
                            source: item.source,
                            comments: item.comments,
                            items: item.items
                        }));
                        setLeads(prev => [...importedLeads, ...prev]);
                        alert(`Successfully imported ${importedLeads.length} leads.`);
                    }
                } catch (err) {
                    console.error('Error importing CSV:', err);
                    alert('Failed to import leads.');
                }
            }
        };
        reader.readAsText(file);
    };

    const updateLeadStatus = async (id: string, status: LeadStatus) => {
        // Optimistic update
        setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));

        try {
            const { error } = await supabase
                .from('leads')
                .update({ status })
                .eq('id', id);

            if (error) {
                console.error('Error updating status in DB:', error);
            }
        } catch (error) {
            console.error('Error updating lead status:', error);
        }
    };

    const deleteLead = async (id: string) => {
        // Optimistic update
        setLeads(prev => prev.filter(l => l.id !== id));

        try {
            const { error } = await supabase
                .from('leads')
                .delete()
                .eq('id', id);

            if (error) {
                console.error('Error deleting lead from DB:', error);
            }
        } catch (error) {
            console.error('Error deleting lead:', error);
        }
    };

    const resetToDefaults = () => {
        // Only reset local items
        setPricingPlans(PRICING_PLANS);
        setCalculatorComponents(CALCULATOR_COMPONENTS);
        setLeads([]);
        localStorage.removeItem('majestic_pricing');
        localStorage.removeItem('majestic_calculator');
        localStorage.removeItem('majestic_leads');
        // Services are now DB source of truth, so we reload them
        fetchServiceGroups();
    };

    // Add helper to assign lead
    const assignLead = async (leadId: string, agentId: string) => {
        // Optimistic
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, assignedTo: agentId } : l));
        try {
            const { error } = await supabase
                .from('leads')
                .update({ assigned_to: agentId })
                .eq('id', leadId);
            if (error) throw error;
            await fetchLeads(); // Refresh to get name
        } catch (error) {
            console.error('Error assigning lead:', error);
        }
    };

    return (
        <DataContext.Provider value={{
            serviceGroups,
            pricingPlans,
            calculatorComponents,
            leads,
            isLoading,
            updateServiceGroups,
            updatePricingPlans,
            updateCalculatorComponents,
            addLead,
            updateLeadStatus,
            deleteLead,
            addLeadComment,
            importLeadsFromCSV,
            // Agent Stuff
            profiles,
            fetchProfiles,
            updateProfile,
            deleteProfile,
            assignLead
        }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
