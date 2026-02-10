
import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import {
    Users,
    Search,
    UserPlus,
    Trash2,
    Shield,
    Mail,
    Edit2,
    Check,
    X
} from 'lucide-react';
import { Profile } from '../../types';

const AdminAgents: React.FC = () => {
    const { profiles, updateProfile, deleteProfile } = useData();
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
    const [editForm, setEditForm] = useState({ fullName: '', role: 'agent' });

    // Derive current user profile to check if admin
    const currentProfile = useMemo(() => {
        const profile = profiles.find(p => p.email === user?.email);
        console.log('AdminAgents Debug:', {
            userEmail: user?.email,
            profilesCount: profiles.length,
            foundProfile: profile,
            allProfiles: profiles
        });
        return profile;
    }, [profiles, user]);

    const isAdmin = currentProfile?.role === 'admin';

    const filteredProfiles = useMemo(() => {
        return profiles.filter(profile => {
            const matchesSearch =
                (profile.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                profile.email.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [profiles, searchTerm]);

    const handleEditClick = (profile: Profile) => {
        setEditingProfile(profile);
        setEditForm({
            fullName: profile.full_name || '',
            role: profile.role || 'agent'
        });
        setIsEditModalOpen(true);
    };

    const handleUpdateProfile = async () => {
        if (!editingProfile) return;

        await updateProfile(editingProfile.id, {
            full_name: editForm.fullName,
            role: editForm.role
        });
        setIsEditModalOpen(false);
        setEditingProfile(null);
    };

    const handleDeleteClick = async (id: string) => {
        if (confirm('Are you sure you want to delete this profile? This cannot be undone.')) {
            await deleteProfile(id);
        }
    };

    if (!isAdmin) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                    <Shield className="w-16 h-16 text-slate-300 mb-4" />
                    <h2 className="text-2xl font-black text-slate-900">Access Denied</h2>
                    <p className="text-slate-500 mt-2">Only Administrators can manage agents.</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Agent Management</h1>
                        <p className="text-slate-500 mt-2 font-medium text-sm md:text-base">Manage your team members and their roles.</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl px-6 py-3 flex items-center gap-3 justify-center">
                        <Users className="text-indigo-400" />
                        <div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Agents</span>
                            <span className="text-xl font-black text-white">{profiles.length}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-900 rounded-[3rem] border border-slate-800 shadow-2xl overflow-hidden">
                    <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row gap-6 justify-between items-center">
                        <div className="relative w-full md:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search agents..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 text-white rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-indigo-500 transition-all font-medium"
                            />
                        </div>
                        {/* 
                         NOTE: 'Create Agent' is tricky without backend admin API. 
                         We instruct users to sign up, then admin upgrades them.
                         Or we can add an 'Invite' button that just shows instructions.
                        */}
                        <div className="text-slate-400 text-xs font-medium bg-slate-800 px-4 py-2 rounded-xl border border-slate-700">
                            To add an agent, ask them to sign up. Then edit their role here.
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/5 border-b border-white/5 uppercase tracking-widest text-[10px] font-black text-slate-500">
                                    <th className="px-8 py-5">Agent</th>
                                    <th className="px-8 py-5">Email</th>
                                    <th className="px-8 py-5">Role</th>
                                    <th className="px-8 py-5">Joined</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredProfiles.map((profile) => (
                                    <tr key={profile.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-black text-sm">
                                                    {(profile.full_name || profile.email).charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <span className="text-white font-black block leading-tight">{profile.full_name || 'No Name'}</span>
                                                    <span className="text-slate-500 text-[10px] font-bold mt-1 uppercase tracking-widest">ID: {profile.id.slice(0, 8)}...</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                                <Mail className="w-3.5 h-3.5 text-indigo-400" /> {profile.email}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide ${profile.role === 'admin'
                                                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                }`}>
                                                {profile.role}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-slate-500 text-xs font-bold">
                                                {new Date(profile.created_at || '').toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => handleEditClick(profile)}
                                                    className="p-2 text-slate-600 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-all"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(profile.id)}
                                                    className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="bg-white rounded-[2rem] p-8 w-full max-w-md relative z-10 shadow-2xl">
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6 text-slate-500" />
                        </button>

                        <h2 className="text-2xl font-black text-slate-900 mb-6">Edit Profile</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
                                <input
                                    type="text"
                                    value={editForm.fullName}
                                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 font-medium text-slate-900"
                                />
                            </div>
                            <div>
                                <label className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Role</label>
                                <select
                                    value={editForm.role}
                                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value as any })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 font-medium text-slate-900 appearance-none"
                                >
                                    <option value="agent">Agent</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-3">
                            <button
                                onClick={handleUpdateProfile}
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default AdminAgents;
