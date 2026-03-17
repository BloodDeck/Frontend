import React, { useState, useEffect } from 'react';
import { Users, Shield, CheckCircle, XCircle, Search, Filter, Activity, X, PlusCircle, Save } from 'lucide-react';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { fetchData, postData, updateData } from '../../../api/api';
import { toast } from 'react-toastify';

interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    is_active: boolean;
    date_joined: string;
}

const UserManagement = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    
    // Search and Filter State
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('All');

    // Add User Modal State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addingUser, setAddingUser] = useState(false);
    const [newUserForm, setNewUserForm] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        role: 'donor'
    });

    const loadUsers = async () => {
        try {
            const data = await fetchData('admin/users/');
            setUsers(Array.isArray(data) ? data : (data?.results || []));
        } catch (error) {
            console.error("Failed to load users:", error);
            toast.error("Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    // --- ACTIONS ---

    const handleToggleStatus = async (user: UserData) => {
        // Optimistic UI update toast
        const action = user.is_active ? 'suspending' : 'activating';
        const loadingToast = toast.loading(`${action} user...`);

        try {
            // Sends a PATCH request to the new endpoint we just created
            await updateData(`admin/users/${user.id}/`, {
                is_active: !user.is_active
            });
            
            toast.update(loadingToast, { 
                render: `User successfully ${user.is_active ? 'suspended' : 'activated'}!`, 
                type: "success", 
                isLoading: false, 
                autoClose: 3000 
            });
            
            // Reload the table so the UI reflects the new status instantly
            await loadUsers();

        } catch (error: any) {
            toast.update(loadingToast, { 
                render: error.message || "Failed to update user status.", 
                type: "error", 
                isLoading: false, 
                autoClose: 4000 
            });
        }
    };

    const handleAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setAddingUser(true);
        try {
            // Reuse your existing registration endpoint
            await postData('auth/register/', newUserForm);
            toast.success("User created successfully!");
            setIsAddModalOpen(false);
            setNewUserForm({ email: '', password: '', first_name: '', last_name: '', role: 'donor' });
            await loadUsers(); // Refresh the table
        } catch (error: any) {
            console.error("Failed to create user:", error);
            toast.error(error.message || "Failed to create user. Check if email already exists.");
        } finally {
            setAddingUser(false);
        }
    };

    // --- FILTERING ---
    const filteredUsers = users.filter((user) => {
        const matchesSearch = 
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
            (user.first_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.last_name || '').toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = roleFilter === 'All' || user.role === roleFilter;

        return matchesSearch && matchesRole;
    });

    // Quick Stats Calculations
    const activeUsers = users.filter(u => u.is_active).length;
    const hospitalCount = users.filter(u => u.role === 'hospital').length;
    const donorCount = users.filter(u => u.role === 'donor').length;

    // Helper to format roles nicely
    const formatRole = (role: string) => {
        switch (role) {
            case 'admin': return { label: 'Super Admin', color: 'text-purple-500 bg-purple-900/20' };
            case 'hospital': return { label: 'Hospital', color: 'text-blue-500 bg-blue-900/20' };
            case 'bloodbank': return { label: 'Blood Bank', color: 'text-red-500 bg-red-900/20' };
            default: return { label: 'Donor', color: 'text-green-500 bg-green-900/20' };
        }
    };

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                    <div className="space-y-3">
                        <div className="h-8 w-56 bg-[#2D2D2D] rounded-lg"></div>
                        <div className="h-4 w-72 bg-[#2D2D2D] rounded-lg"></div>
                    </div>
                    <div className="h-10 w-40 bg-[#2D2D2D] rounded-lg"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>)}
                </div>
                <div className="h-14 bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
                <div className="h-[400px] bg-[#2D2D2D] rounded-xl border border-[#3D3D3D]"></div>
            </div>
        );
    }
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">User Management</h1>
                    <p className="text-gray-400 text-sm mt-1">View and manage all registered accounts on the platform.</p>
                </div>
                <button 
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-colors flex items-center gap-2"
                >
                    <PlusCircle size={18} /> Add New User
                </button>
            </div>

            {/* KPI Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Users"
                    value={users.length.toString()}
                    icon={<Users size={20} />}
                    iconColor="text-blue-500"
                />
                <StatCard
                    label="Active Accounts"
                    value={activeUsers.toString()}
                    subtext={`${users.length - activeUsers} inactive`}
                    icon={<Activity size={20} />}
                    iconColor="text-green-500"
                />
                <StatCard
                    label="Registered Hospitals"
                    value={hospitalCount.toString()}
                    icon={<Shield size={20} />}
                    iconColor="text-purple-500"
                />
                <StatCard
                    label="Registered Donors"
                    value={donorCount.toString()}
                    icon={<CheckCircle size={20} />}
                    iconColor="text-yellow-500"
                />
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 bg-[#2D2D2D] p-3 rounded-xl border border-[#3D3D3D] shadow-sm">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg md:rounded-l-lg pl-9 pr-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 transition-colors placeholder:text-gray-600"
                    />
                </div>
                <div className="flex gap-2">
                    <select 
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="bg-[#1A1A1A] text-gray-300 text-sm border border-[#3D3D3D] rounded-lg px-4 py-2 hover:border-blue-500 focus:outline-none transition-colors"
                    >
                        <option value="All">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="hospital">Hospital</option>
                        <option value="donor">Donor</option>
                        <option value="bloodbank">Blood Bank</option>
                    </select>
                    <button className="px-3 bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                        <Filter size={16} />
                    </button>
                </div>
            </div>

            {/* Data Table */}
            <DataTable
                columns={[
                    {
                        header: 'User / Email',
                        accessor: (row: UserData) => (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-900 to-purple-900 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                                    {row.first_name ? row.first_name.charAt(0).toUpperCase() : row.email.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-bold text-white text-sm">
                                        {row.first_name || row.last_name ? `${row.first_name} ${row.last_name}` : 'Unknown User'}
                                    </p>
                                    <p className="text-xs text-gray-500">{row.email}</p>
                                </div>
                            </div>
                        )
                    },
                    {
                        header: 'Role',
                        accessor: (row: UserData) => {
                            const roleUi = formatRole(row.role);
                            return (
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/5 ${roleUi.color}`}>
                                    {roleUi.label}
                                </span>
                            );
                        }
                    },
                    {
                        header: 'Status',
                        accessor: (row: UserData) => (
                            <div className="flex items-center gap-1.5">
                                {row.is_active ? (
                                    <><CheckCircle size={14} className="text-green-500" /> <span className="text-xs text-gray-300 font-medium">Active</span></>
                                ) : (
                                    <><XCircle size={14} className="text-red-500" /> <span className="text-xs text-red-500 font-medium">Suspended</span></>
                                )}
                            </div>
                        )
                    },
                    {
                        header: 'Date Joined',
                        accessor: (row: UserData) => <span className="text-xs text-gray-400 font-medium">{new Date(row.date_joined).toLocaleDateString()}</span>
                    }
                ]}
                data={filteredUsers}
                actions={(row) => (
                    <div className="flex gap-2 justify-end">
                        <button 
                            onClick={() => handleToggleStatus(row)}
                            className={`text-xs font-bold px-3 py-1.5 rounded-md transition-colors border ${
                                row.is_active 
                                    ? 'border-red-900/50 text-red-500 hover:bg-red-900/20' 
                                    : 'border-green-900/50 text-green-500 hover:bg-green-900/20'
                            }`}
                        >
                            {row.is_active ? 'Suspend' : 'Activate'}
                        </button>
                    </div>
                )}
            />

            {/* --- ADD USER MODAL --- */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#2D2D2D] rounded-2xl border border-[#3D3D3D] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-6 border-b border-[#3D3D3D] flex justify-between items-center">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <PlusCircle className="text-blue-500" size={20}/> Add New User
                            </h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleAddUser} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                                    <input required type="text" value={newUserForm.first_name} onChange={(e) => setNewUserForm({...newUserForm, first_name: e.target.value})} className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                                    <input required type="text" value={newUserForm.last_name} onChange={(e) => setNewUserForm({...newUserForm, last_name: e.target.value})} className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                                <input required type="email" value={newUserForm.email} onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})} className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Temporary Password</label>
                                <input required type="password" value={newUserForm.password} onChange={(e) => setNewUserForm({...newUserForm, password: e.target.value})} className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">System Role</label>
                                <select required value={newUserForm.role} onChange={(e) => setNewUserForm({...newUserForm, role: e.target.value})} className="w-full bg-[#1A1A1A] border border-[#3D3D3D] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                                    <option value="donor">Donor</option>
                                    <option value="hospital">Hospital</option>
                                    <option value="bloodbank">Blood Bank</option>
                                    <option value="admin">Super Admin</option>
                                </select>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2.5 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" disabled={addingUser} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50">
                                    <Save size={16} /> {addingUser ? 'Creating...' : 'Create Account'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserManagement;