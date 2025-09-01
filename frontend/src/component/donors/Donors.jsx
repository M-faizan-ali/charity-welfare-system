import React, { useState, useMemo } from 'react';
import { Users, UserCheck, UserX, Award, Search, Plus, Upload, Download, MoreVertical, BarChart2, List, Bell } from 'lucide-react';

// --- Reusable Status Badge Component ---
const DonorStatusBadge = ({ status }) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap";
    let specificClasses = "";
    let dotClasses = "";

    switch (status.toLowerCase()) {
        case 'active':
            specificClasses = "bg-green-100 text-green-800";
            dotClasses = "bg-green-500";
            break;
        case 'inactive':
            specificClasses = "bg-yellow-100 text-yellow-800";
            dotClasses = "bg-yellow-500";
            break;
        case 'banned':
            specificClasses = "bg-red-100 text-red-800";
            dotClasses = "bg-red-500";
            break;
        default:
            specificClasses = "bg-gray-100 text-gray-800";
            dotClasses = "bg-gray-400";
    }

    return (
        <span className={`${baseClasses} ${specificClasses}`}>
            <span className={`w-2 h-2 mr-2 ${dotClasses} rounded-full`}></span>
            {status}
        </span>
    );
};
const donorsData = [
    { id: 'DONOR-001', fullName: 'Ayesha Khan', email: 'ayesha.k@example.com', totalDonations: 2500, currency: 'PKR', lastDonationDate: '2025-08-15', preferredCause: 'Education', status: 'Active' },
    { id: 'DONOR-002', fullName: 'Bilal Ahmed', email: 'bilal.a@example.com', totalDonations: 1500, currency: 'PKR', lastDonationDate: '2025-07-20', preferredCause: 'Health', status: 'Active' },
    { id: 'DONOR-003', fullName: 'Fatima Ali', email: 'fatima.a@example.com', totalDonations: 500, currency: 'PKR', lastDonationDate: '2024-01-10', preferredCause: 'Orphans', status: 'Inactive' },
    { id: 'DONOR-004', fullName: 'Usman Sharif', email: 'usman.s@example.com', totalDonations: 5000, currency: 'PKR', lastDonationDate: '2025-08-01', preferredCause: 'General Fund', status: 'Active' },
    { id: 'DONOR-005', fullName: 'Zainab Omar', email: 'zainab.o@example.com', totalDonations: 800, currency: 'PKR', lastDonationDate: '2025-06-05', preferredCause: 'Health', status: 'Active' },
    { id: 'DONOR-006', fullName: 'Saad Malik', email: 'saad.m@example.com', totalDonations: 200, currency: 'PKR', lastDonationDate: '2023-11-22', preferredCause: 'Education', status: 'Inactive' },
];
const Donors = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const { stats, filteredDonors } = useMemo(() => {
        const stats = {
            total: donorsData.length,
            active: donorsData.filter(d => d.status === 'Active').length,
            inactive: donorsData.filter(d => d.status === 'Inactive').length,
            topDonor: donorsData.reduce((max, donor) => max.totalDonations > donor.totalDonations ? max : donor),
        };

        const filtered = donorsData.filter(donor =>
            donor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.id.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return { stats, filteredDonors: filtered };
    }, [searchTerm]);
    
    return (
        <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Donors Dashboard</h1>
                    <p className="text-gray-500 mt-2">Manage and track all donor activities and contributions.</p>
                </header>

                {/* --- Donor Stats Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard icon={<Users />} title="Total Donors" value={stats.total} color="blue" />
                    <StatCard icon={<UserCheck />} title="Active Donors" value={stats.active} color="green" />
                    <StatCard icon={<UserX />} title="Inactive Donors" value={stats.inactive} color="yellow" />
                    <StatCard icon={<Award />} title="Top Donor" value={stats.topDonor.fullName} color="purple" note={`PKR ${stats.topDonor.totalDonations.toLocaleString()}`} />
                </div>

                {/* --- Filters & Actions --- */}
                <div className="bg-white p-4 rounded-2xl shadow-sm mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                        <div className="relative lg:col-span-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or ID..."
                                className="w-full pl-10 pr-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2 flex-wrap justify-start lg:justify-end lg:col-span-2">
                            <ActionButton icon={<Plus />} text="Add Donor" primary />
                            <ActionButton icon={<Upload />} text="Import" />
                            <ActionButton icon={<Download />} text="Export" />
                        </div>
                    </div>
                </div>

                {/* --- Donor Table --- */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600 hidden md:table">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Donor</th>
                                    <th scope="col" className="px-6 py-4">Total Donations</th>
                                    <th scope="col" className="px-6 py-4">Last Donation</th>
                                    <th scope="col" className="px-6 py-4">Preferred Cause</th>
                                    <th scope="col" className="px-6 py-4 text-center">Status</th>
                                    <th scope="col" className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDonors.map((d) => (
                                    <tr key={d.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-800">{d.fullName}</div>
                                            <div className="text-xs text-gray-500">{d.email}</div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-800">
                                            {new Intl.NumberFormat('en-PK', { style: 'currency', currency: d.currency }).format(d.totalDonations)}
                                        </td>
                                        <td className="px-6 py-4">{d.lastDonationDate}</td>
                                        <td className="px-6 py-4">{d.preferredCause}</td>
                                        <td className="px-6 py-4 text-center"><DonorStatusBadge status={d.status} /></td>
                                        <td className="px-6 py-4 text-center">
                                            <button className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100">
                                                <MoreVertical size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* --- Mobile Card View --- */}
                    <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                        {filteredDonors.map(d => (
                            <div key={d.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-gray-800">{d.fullName}</p>
                                        <p className="text-xs text-gray-500">{d.email}</p>
                                    </div>
                                    <DonorStatusBadge status={d.status} />
                                </div>
                                <div className="border-t pt-3 space-y-2 text-sm">
                                    <InfoRow label="Total Donated" value={new Intl.NumberFormat('en-PK', { style: 'currency', currency: d.currency }).format(d.totalDonations)} />
                                    <InfoRow label="Last Donation" value={d.lastDonationDate} />
                                    <InfoRow label="Preferred Cause" value={d.preferredCause} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Post-Table Analytics --- */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <AnalyticsCard icon={<BarChart2/>} title="Donation Trends">
                         <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                           <p className="text-gray-500"></p>
                         </div>
                    </AnalyticsCard>
                     <AnalyticsCard icon={<List/>} title="Recent Activity">
                        <ul className="space-y-3">
                           <ActivityItem text="Ayesha Khan donated PKR 500." time="2h ago" />
                           <ActivityItem text="New donor 'Bilal Ahmed' added." time="1d ago" />
                           <ActivityItem text="Usman Sharif's status changed to Active." time="3d ago" />
                        </ul>
                    </AnalyticsCard>
                     <AnalyticsCard icon={<Bell/>} title="Reminders">
                        <ul className="space-y-3">
                           <ActivityItem text="Follow-up with Fatima Ali." time="Due tomorrow" />
                           <ActivityItem text="Send thank you note to Usman Sharif." time="Due in 3 days" />
                        </ul>
                    </AnalyticsCard>
                </div>
            </div>
        </div>
    );
};


// --- Helper Components ---
const StatCard = ({ icon, title, value, color, note }) => {
    const colors = {
        blue: 'text-blue-500 bg-blue-100',
        green: 'text-green-500 bg-green-100',
        yellow: 'text-yellow-500 bg-yellow-100',
        purple: 'text-purple-500 bg-purple-100',
    };
    return(
        <div className="bg-white p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-2xl font-bold text-gray-800 truncate">{value}</p>
                    {note && <p className="text-xs text-gray-400">{note}</p>}
                </div>
                <div className={`p-3 rounded-xl ${colors[color]}`}>{React.cloneElement(icon, { className: "h-8 w-8" })}</div>
            </div>
        </div>
    );
};

const ActionButton = ({ icon, text, primary = false }) => (
    <button className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg transition-colors ${primary ? 'bg-blue-600 text-white hover:bg-blue-700 shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
        {icon}
        <span>{text}</span>
    </button>
);

const InfoRow = ({ label, value }) => (
    <div className="flex justify-between"><span className="text-gray-500">{label}</span><span className="font-medium text-gray-800 text-right">{value}</span></div>
);

const AnalyticsCard = ({ icon, title, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm lg:col-span-1 first:lg:col-span-3 lg:first:col-span-1">
        <div className="flex items-center mb-4">
            {React.cloneElement(icon, {className: "h-6 w-6 text-gray-500"})}
            <h3 className="text-lg font-semibold text-gray-800 ml-3">{title}</h3>
        </div>
        {children}
    </div>
);

const ActivityItem = ({ text, time }) => (
    <li className="flex justify-between items-center text-sm">
        <p className="text-gray-700">{text}</p>
        <span className="text-gray-400 whitespace-nowrap">{time}</span>
    </li>
);
export default Donors
