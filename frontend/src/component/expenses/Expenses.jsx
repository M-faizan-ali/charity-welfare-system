import React from 'react'
import  { useState, useMemo } from 'react';
import { Landmark, Hourglass, CheckCircle2, FileText } from 'lucide-react';

// --- Reusable Status Badge Component ---
const ExpenseStatusBadge = ({ status }) => {
    const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap";
    let specificClasses = "";
    let dotClasses = "";

    switch (status.toLowerCase()) {
        case 'paid':
        case 'approved':
            specificClasses = "bg-green-100 text-green-800";
            dotClasses = "bg-green-500";
            break;
        case 'pending':
            specificClasses = "bg-yellow-100 text-yellow-800";
            dotClasses = "bg-yellow-500";
            break;
        case 'rejected':
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

// --- Sample Expense Data ---
const expensesData = [
    { id: 'EXP-2025001', title: 'Q1 School Fees Payment', category: 'Education', amount: 1250.00, currency: 'USD', date: '2025-08-28', project: 'Education Program', status: 'Paid', enteredBy: 'Ahmad Khan' },
    { id: 'EXP-2025002', title: 'Medical Supplies for Camp', category: 'Healthcare', amount: 780.50, currency: 'USD', date: '2025-08-25', project: 'Health Camp', status: 'Approved', enteredBy: 'Fatima Ali' },
    { id: 'EXP-2025003', title: 'Office Electricity Bill', category: 'Utilities', amount: 150.00, currency: 'USD', date: '2025-08-22', project: 'Administration', status: 'Pending', enteredBy: 'Ahmad Khan' },
    { id: 'EXP-2025004', title: 'Vehicle Fuel for Orphanage', category: 'Transportation', amount: 200.00, currency: 'USD', date: '2025-08-20', project: 'Orphan Support', status: 'Rejected', enteredBy: 'Zainab Omar' },
    { id: 'EXP-2025005', title: 'IT Department Laptops', category: 'Administration', amount: 2500.00, currency: 'EUR', date: '2025-08-18', project: 'Administration', status: 'Paid', enteredBy: 'Fatima Ali' },
    { id: 'EXP-2025006', title: 'Catering for Health Event', category: 'Healthcare', amount: 450.00, currency: 'USD', date: '2025-08-15', project: 'Health Camp', status: 'Approved', enteredBy: 'Ahmad Khan' },
];
const Expenses = () => {
   const [filter, setFilter] = useState('All');

    // --- Calculate stats and filter data ---
    const { totalSpent, pendingCount, approvedCount, filteredExpenses } = useMemo(() => {
        const paidOrApproved = expensesData.filter(e => e.status === 'Paid' || e.status === 'Approved');
        const totalSpent = paidOrApproved.reduce((sum, e) => {
            // Basic currency conversion for summary, assuming EUR is ~1.1 USD
            const amountInUSD = e.currency === 'EUR' ? e.amount * 1.1 : e.amount;
            return sum + amountInUSD;
        }, 0);

        const pendingCount = expensesData.filter(e => e.status === 'Pending').length;
        const approvedCount = expensesData.filter(e => e.status === 'Approved').length;

        const filteredExpenses = filter === 'All'
            ? expensesData
            : expensesData.filter(e => e.status === filter);

        return { totalSpent, pendingCount, approvedCount, filteredExpenses };
    }, [filter]);

    return (
        <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Expenses Dashboard</h1>
                    <p className="text-gray-500 mt-2">An overview of all organizational expenditures.</p>
                </header>

                {/* --- Summary Cards --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Spent (Paid & Approved)</p>
                            <p className="text-3xl font-bold text-gray-800">${totalSpent.toFixed(2)}</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-xl"><Landmark className="h-8 w-8 text-blue-500" /></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Expenses</p>
                            <p className="text-3xl font-bold text-gray-800">{pendingCount}</p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-xl"><Hourglass className="h-8 w-8 text-yellow-500" /></div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Approved (Ready to Pay)</p>
                            <p className="text-3xl font-bold text-gray-800">{approvedCount}</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-xl"><CheckCircle2 className="h-8 w-8 text-green-500" /></div>
                    </div>
                </div>

                {/* --- Table Container --- */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-200 flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-700 mr-4">Transactions</h3>
                        {['All', 'Paid', 'Approved', 'Pending', 'Rejected'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${filter === status ? 'bg-blue-600 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    {/* --- Responsive Table --- */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-600 hidden md:table">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Expense / ID</th>
                                    <th scope="col" className="px-6 py-4">Amount</th>
                                    <th scope="col" className="px-6 py-4">Category</th>
                                    <th scope="col" className="px-6 py-4">Date</th>
                                    <th scope="col" className="px-6 py-4 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredExpenses.map((e) => (
                                    <tr key={e.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-800">{e.title}</div>
                                            <div className="text-xs text-gray-500">{e.id}</div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-800">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: e.currency }).format(e.amount)}
                                        </td>
                                        <td className="px-6 py-4">{e.category}</td>
                                        <td className="px-6 py-4">{e.date}</td>
                                        <td className="px-6 py-4 text-center">
                                            <ExpenseStatusBadge status={e.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* --- Responsive Card List for Mobile --- */}
                    <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                        {filteredExpenses.map(e => (
                            <div key={e.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold text-gray-800">{e.title}</p>
                                        <p className="text-xs text-gray-500">{e.id}</p>
                                    </div>
                                    <ExpenseStatusBadge status={e.status} />
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Amount</span>
                                    <span className="font-bold text-lg text-gray-800">{new Intl.NumberFormat('en-US', { style: 'currency', currency: e.currency }).format(e.amount)}</span>
                                </div>
                                <div className="border-t pt-2 space-y-2 text-sm">
                                    <div className="flex justify-between"><span className="text-gray-500">Category</span><span className="font-medium text-gray-700">{e.category}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Project</span><span className="font-medium text-gray-700">{e.project}</span></div>
                                    <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium text-gray-700">{e.date}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredExpenses.length === 0 && (
                        <div className="text-center py-16">
                             <FileText className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-lg font-medium text-gray-800">No expenses found</h3>
                            <p className="text-gray-500 mt-1">There are no expenses matching the "{filter}" filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Expenses
