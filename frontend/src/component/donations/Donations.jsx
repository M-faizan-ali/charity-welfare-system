import React, { useState, useMemo } from 'react';

// --- Icon Components (as inline SVGs for portability) ---
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.975 5.975 0 0112 13a5.975 5.975 0 013 5.197M15 21a6 6 0 00-9-5.197" />
  </svg>
);

const DollarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1m-4 0H8v-1h4v1zm-4 4h12M8 4h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z" />
  </svg>
);

const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
);


// --- Status Badge Component (re-usable and clean) ---
const StatusBadge = ({ status }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
  let specificClasses = "";
  let dotClasses = "";

  switch (status.toLowerCase()) {
    case 'completed':
      specificClasses = "bg-green-100 text-green-800";
      dotClasses = "bg-green-500";
      break;
    case 'pending':
      specificClasses = "bg-yellow-100 text-yellow-800";
      dotClasses = "bg-yellow-500";
      break;
    case 'failed':
      specificClasses = "bg-red-100 text-red-800";
      dotClasses = "bg-red-500";
      break;
    case 'refunded':
      specificClasses = "bg-gray-200 text-gray-800";
      dotClasses = "bg-gray-500";
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

// --- Sample Donation Data ---
const donationsData = [
    { id: 'DON-2024001', name: 'Alice Johnson', email: 'alice.j@example.com', amount: 100.00, currency: 'USD', date: '2024-08-15', method: 'Credit Card', type: 'One-time', purpose: 'Education Fund', status: 'Completed' },
    { id: 'DON-2024002', name: 'Bob Williams', email: 'bob.w@example.com', amount: 50.00, currency: 'USD', date: '2024-08-14', method: 'PayPal', type: 'Recurring', purpose: 'Food Drive', status: 'Pending' },
    { id: 'DON-2024003', name: 'Charlie Brown', email: 'charlie.b@example.com', amount: 250.00, currency: 'EUR', date: '2024-08-12', method: 'Bank Transfer', type: 'One-time', purpose: 'General Fund', status: 'Failed' },
    { id: 'DON-2024004', name: 'Diana Prince', email: '', amount: 75.00, currency: 'USD', date: '2024-08-11', method: 'Cash', type: 'One-time', purpose: 'Animal Shelter', status: 'Completed' },
    { id: 'DON-2024005', name: 'Ethan Hunt', email: 'ethan.h@example.com', amount: 120.00, currency: 'GBP', date: '2024-08-10', method: 'Credit Card', type: 'Recurring', purpose: 'Education Fund', status: 'Refunded' },
    { id: 'DON-2024006', name: 'Fiona Glenanne', email: 'fiona.g@example.com', amount: 300.00, currency: 'USD', date: '2024-08-09', method: 'PayPal', type: 'One-time', purpose: 'Food Drive', status: 'Completed' },
];
const Donations = () => {
  const [filter, setFilter] = useState('All');

  // --- Calculate stats and filter data ---
  const { totalDonated, uniqueDonors, totalDonations, filteredDonations } = useMemo(() => {
    const completedDonations = donationsData.filter(d => d.status === 'Completed');
    
    const totalDonated = completedDonations.reduce((sum, d) => sum + d.amount, 0);
    const uniqueDonors = new Set(donationsData.map(d => d.email || d.name)).size;
    const totalDonations = donationsData.length;

    const filteredDonations = filter === 'All' 
      ? donationsData 
      : donationsData.filter(d => d.status === filter);
      
    return { totalDonated, uniqueDonors, totalDonations, filteredDonations };
  }, [filter]);

  return (
    <div className="bg-gray-50 p-4 sm:p-6 lg:p-8 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Donations Dashboard</h1>
          <p className="text-gray-500 mt-1">An overview of all fundraising activities.</p>
        </header>

        {/* --- Summary Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">Total Donated (Completed)</p>
                    <p className="text-3xl font-bold text-gray-800">${totalDonated.toFixed(2)}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-xl"><DollarIcon /></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">Unique Donors</p>
                    <p className="text-3xl font-bold text-gray-800">{uniqueDonors}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-xl"><UsersIcon /></div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">Total Donations</p>
                    <p className="text-3xl font-bold text-gray-800">{totalDonations}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-xl"><HeartIcon /></div>
            </div>
        </div>

        {/* --- Table Container --- */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* --- Filters --- */}
          <div className="p-4 border-b border-gray-200 flex items-center space-x-2">
             <h3 className="text-lg font-semibold text-gray-700 mr-4">Transactions</h3>
            {['All', 'Completed', 'Pending', 'Failed', 'Refunded'].map(status => (
              <button 
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${filter === status ? 'bg-blue-500 text-white shadow' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* --- Responsive Table/Card List --- */}
          <div className="overflow-x-auto">
            {/* This table is hidden on small screens */}
            <table className="w-full text-sm text-left text-gray-600 hidden md:table">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4">Donor</th>
                  <th scope="col" className="px-6 py-4">Amount</th>
                  <th scope="col" className="px-6 py-4">Purpose</th>
                  <th scope="col" className="px-6 py-4">Date</th>
                  <th scope="col" className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((d) => (
                  <tr key={d.id} className="bg-white border-b hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4">
                        <div className="font-semibold text-gray-800">{d.name}</div>
                        <div className="text-xs text-gray-500">{d.email || d.id}</div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: d.currency }).format(d.amount)}
                    </td>
                    <td className="px-6 py-4">{d.purpose}</td>
                    <td className="px-6 py-4">{d.date}</td>
                    <td className="px-6 py-4 text-center">
                      <StatusBadge status={d.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* This card list is shown on small screens, hidden on md and up */}
            <div className="grid grid-cols-1 gap-4 p-4 md:hidden">
                {filteredDonations.map(d => (
                    <div key={d.id} className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                           <div>
                                <p className="font-bold text-gray-800">{d.name}</p>
                                <p className="text-xs text-gray-500">{d.email || d.id}</p>
                           </div>
                           <StatusBadge status={d.status} />
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-bold text-lg text-gray-800">{new Intl.NumberFormat('en-US', { style: 'currency', currency: d.currency }).format(d.amount)}</span>
                        </div>
                        <div className="border-t pt-2 space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500">Purpose</span><span className="font-medium text-gray-700">{d.purpose}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium text-gray-700">{d.date}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500">Method</span><span className="font-medium text-gray-700">{d.method}</span></div>
                        </div>
                    </div>
                ))}
            </div>

          </div>
        </div>
        {filteredDonations.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">No donations found</h3>
            <p className="text-gray-500 mt-1">There are no donations matching the "{filter}" filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Donations
