
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SERVICE_GROUPS, PRICING_PLANS, CALCULATOR_COMPONENTS } from '../constants';
import { ServiceGroup, PricingPlan, ComponentProps, Lead, LeadStatus } from '../types';

interface DataContextType {
    serviceGroups: ServiceGroup[];
    pricingPlans: PricingPlan[];
    calculatorComponents: ComponentProps[];
    leads: Lead[];
    updateServiceGroups: (groups: ServiceGroup[]) => void;
    updatePricingPlans: (plans: PricingPlan[]) => void;
    updateCalculatorComponents: (components: ComponentProps[]) => void;
    addLead: (lead: Omit<Lead, 'id' | 'timestamp' | 'status'>) => Lead;
    updateLeadStatus: (id: string, status: LeadStatus) => void;
    deleteLead: (id: string) => void;
    resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [serviceGroups, setServiceGroups] = useState<ServiceGroup[]>([]);
    const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);
    const [calculatorComponents, setCalculatorComponents] = useState<ComponentProps[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const savedServices = localStorage.getItem('majestic_services');
        const savedPricing = localStorage.getItem('majestic_pricing');
        const savedCalculator = localStorage.getItem('majestic_calculator');
        const savedLeads = localStorage.getItem('majestic_leads');

        if (savedServices) setServiceGroups(JSON.parse(savedServices));
        else setServiceGroups(SERVICE_GROUPS);

        if (savedPricing) setPricingPlans(JSON.parse(savedPricing));
        else setPricingPlans(PRICING_PLANS);

        if (savedCalculator) setCalculatorComponents(JSON.parse(savedCalculator));
        else setCalculatorComponents(CALCULATOR_COMPONENTS);

        if (savedLeads) setLeads(JSON.parse(savedLeads));

        setIsLoaded(true);
    }, []);

    const updateServiceGroups = (groups: ServiceGroup[]) => {
        setServiceGroups(groups);
        localStorage.setItem('majestic_services', JSON.stringify(groups));
    };

    const updatePricingPlans = (plans: PricingPlan[]) => {
        setPricingPlans(plans);
        localStorage.setItem('majestic_pricing', JSON.stringify(plans));
    };

    const updateCalculatorComponents = (components: ComponentProps[]) => {
        setCalculatorComponents(components);
        localStorage.setItem('majestic_calculator', JSON.stringify(components));
    };

    const addLead = (leadData: Omit<Lead, 'id' | 'timestamp' | 'status'>): Lead => {
        const newLead: Lead = {
            ...leadData,
            id: `MG-${Math.floor(Math.random() * 9000) + 1000}`,
            timestamp: new Date().toISOString(),
            status: 'New'
        };
        const updatedLeads = [newLead, ...leads];
        setLeads(updatedLeads);
        localStorage.setItem('majestic_leads', JSON.stringify(updatedLeads));
        return newLead;
    };

    const updateLeadStatus = (id: string, status: LeadStatus) => {
        const updatedLeads = leads.map(l => l.id === id ? { ...l, status } : l);
        setLeads(updatedLeads);
        localStorage.setItem('majestic_leads', JSON.stringify(updatedLeads));
    };

    const deleteLead = (id: string) => {
        const updatedLeads = leads.filter(l => l.id !== id);
        setLeads(updatedLeads);
        localStorage.setItem('majestic_leads', JSON.stringify(updatedLeads));
    };

    const resetToDefaults = () => {
        setServiceGroups(SERVICE_GROUPS);
        setPricingPlans(PRICING_PLANS);
        setCalculatorComponents(CALCULATOR_COMPONENTS);
        setLeads([]);
        localStorage.removeItem('majestic_services');
        localStorage.removeItem('majestic_pricing');
        localStorage.removeItem('majestic_calculator');
        localStorage.removeItem('majestic_leads');
    };

    if (!isLoaded) return null;

    return (
        <DataContext.Provider value={{
            serviceGroups,
            pricingPlans,
            calculatorComponents,
            leads,
            updateServiceGroups,
            updatePricingPlans,
            updateCalculatorComponents,
            addLead,
            updateLeadStatus,
            deleteLead,
            resetToDefaults
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
