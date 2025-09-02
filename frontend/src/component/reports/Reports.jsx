import {
  BarChart3,
  Calendar,
  Download,
  Filter,
  PieChart,
  Printer,
  Search,
  Target,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { useState } from "react";

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    start: "2023-01-01",
    end: "2023-12-31"
  });
  const [filters, setFilters] = useState({
    donor: "",
    project: "",
    category: ""
  });

  // Mock data for reports
  const donationData = [
    { month: "Jan", amount: 12000, donors: 42, recurring: 28 },
    { month: "Feb", amount: 15000, donors: 51, recurring: 35 },
    { month: "Mar", amount: 18000, donors: 63, recurring: 42 },
    { month: "Apr", amount: 21000, donors: 72, recurring: 48 },
    { month: "May", amount: 24000, donors: 81, recurring: 52 },
    { month: "Jun", amount: 45000, donors: 95, recurring: 60 },
    { month: "Jul", amount: 39000, donors: 87, recurring: 58 },
    { month: "Aug", amount: 37000, donors: 84, recurring: 56 },
    { month: "Sep", amount: 42000, donors: 92, recurring: 62 },
    { month: "Oct", amount: 48000, donors: 103, recurring: 70 },
    { month: "Nov", amount: 51000, donors: 112, recurring: 75 },
    { month: "Dec", amount: 65000, donors: 125, recurring: 82 }
  ];
  
  const expenseData = [
    { month: "Jan", amount: 11000, categories: { Education: 5000, Healthcare: 3000, Administration: 2000, Fundraising: 1000 } },
    { month: "Feb", amount: 13000, categories: { Education: 6000, Healthcare: 3500, Administration: 2500, Fundraising: 1000 } },
    { month: "Mar", amount: 15000, categories: { Education: 7000, Healthcare: 4000, Administration: 3000, Fundraising: 1000 } },
    { month: "Apr", amount: 17000, categories: { Education: 8000, Healthcare: 4500, Administration: 3500, Fundraising: 1000 } },
    { month: "May", amount: 19000, categories: { Education: 9000, Healthcare: 5000, Administration: 4000, Fundraising: 1000 } },
    { month: "Jun", amount: 42000, categories: { Education: 25000, Healthcare: 10000, Administration: 5000, Fundraising: 2000 } },
    { month: "Jul", amount: 38000, categories: { Education: 22000, Healthcare: 9000, Administration: 5000, Fundraising: 2000 } },
    { month: "Aug", amount: 36000, categories: { Education: 20000, Healthcare: 9000, Administration: 5000, Fundraising: 2000 } },
    { month: "Sep", amount: 41000, categories: { Education: 24000, Healthcare: 10000, Administration: 5000, Fundraising: 2000 } },
    { month: "Oct", amount: 46000, categories: { Education: 28000, Healthcare: 11000, Administration: 5000, Fundraising: 2000 } },
    { month: "Nov", amount: 49000, categories: { Education: 30000, Healthcare: 12000, Administration: 5000, Fundraising: 2000 } },
    { month: "Dec", amount: 62000, categories: { Education: 40000, Healthcare: 14000, Administration: 6000, Fundraising: 2000 } }
  ];
  
  const expenseCategories = [
    { category: "Education", amount: 228000, percentage: 45 },
    { category: "Healthcare", amount: 104500, percentage: 21 },
    { category: "Administration", amount: 53000, percentage: 10 },
    { category: "Fundraising", amount: 21000, percentage: 4 },
    { category: "Community Support", amount: 100000, percentage: 20 }
  ];
  
  const topDonors = [
    { name: "John Smith", amount: 25000, type: "Monthly", joinDate: "2021-03-15" },
    { name: "ABC Corporation", amount: 50000, type: "One-time", joinDate: "2022-11-05" },
    { name: "Sarah Johnson", amount: 18000, type: "Monthly", joinDate: "2020-08-22" },
    { name: "XYZ Foundation", amount: 35000, type: "Quarterly", joinDate: "2022-05-10" },
    { name: "Michael Brown", amount: 12000, type: "Monthly", joinDate: "2021-12-01" }
  ];

  const donorRetentionData = {
    currentYear: 68,
    previousYear: 62,
    trend: "up"
  };

  const impactMetrics = {
    familiesSupported: 125,
    mealsProvided: 12500,
    educationGrants: 45,
    medicalTreatments: 200
  };

  const adminDetails = {
    generatedBy: "Admin User",
    lastUpdated: new Date().toISOString().split('T')[0],
    reportId: "RPT-2023-0125"
  };

  const handleExport = (format) => {
    alert(`Exporting report in ${format} format`);
    // In a real application, this would trigger a download
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };



  // Calculate totals
  const totalDonations = donationData.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenseData.reduce((sum, item) => sum + item.amount, 0);
  const netBalance = totalDonations - totalExpenses;

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Comprehensive financial and donor insights for Trust Management
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
          <button className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-4 py-2.5 rounded-lg">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <div className="relative">
            <select 
              onChange={(e) => handleExport(e.target.value)}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-4 py-2.5 rounded-lg appearance-none pr-8"
            >
              <option value="">Export</option>
              <option value="PDF">PDF</option>
              <option value="Excel">Excel</option>
              <option value="CSV">CSV</option>
            </select>
            <Download className="w-4 h-4 absolute right-2 top-3 pointer-events-none" />
          </div>
          <button className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium text-sm px-4 py-2.5 rounded-lg">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>
      
      {/* Report Info and Filters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Report Period</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Select a date range for the report</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <input 
                  type="date" 
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                />
              </div>
              <span className="self-center text-gray-500 hidden sm:block">to</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <input 
                  type="date" 
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Donor</label>
              <input
                type="text"
                name="donor"
                value={filters.donor}
                onChange={handleFilterChange}
                placeholder="Filter by donor"
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project</label>
              <input
                type="text"
                name="project"
                value={filters.project}
                onChange={handleFilterChange}
                placeholder="Filter by project"
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
              >
                <option value="">All Categories</option>
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Administration">Administration</option>
                <option value="Fundraising">Fundraising</option>
                <option value="Community Support">Community Support</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Report Details</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Generated By</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{adminDetails.generatedBy}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{adminDetails.lastUpdated}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Report ID</p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{adminDetails.reportId}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-blue-100">Total Donations</p>
              <h2 className="text-2xl font-bold mt-1">${totalDonations.toLocaleString()}</h2>
              <p className="text-blue-100 text-sm mt-2">Jan 1 - Dec 31, 2023</p>
            </div>
            <div className="bg-blue-400/20 p-3 rounded-full">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">18.2% increase from last year</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-5 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-purple-100">Total Expenses</p>
              <h2 className="text-2xl font-bold mt-1">${totalExpenses.toLocaleString()}</h2>
              <p className="text-purple-100 text-sm mt-2">Jan 1 - Dec 31, 2023</p>
            </div>
            <div className="bg-purple-400/20 p-3 rounded-full">
              {/* <Receipt className="w-6 h-6" /> */}
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">12.5% increase from last year</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-100">Net Balance</p>
              <h2 className="text-2xl font-bold mt-1">${netBalance.toLocaleString()}</h2>
              <p className="text-green-100 text-sm mt-2">Jan 1 - Dec 31, 2023</p>
            </div>
            <div className="bg-green-400/20 p-3 rounded-full">
              {/* <Wallet className="w-6 h-6" /> */}
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">22.8% increase from last year</span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-5 rounded-xl shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-100">Donor Retention</p>
              <h2 className="text-2xl font-bold mt-1">{donorRetentionData.currentYear}%</h2>
              <p className="text-amber-100 text-sm mt-2">Jan 1 - Dec 31, 2023</p>
            </div>
            <div className="bg-amber-400/20 p-3 rounded-full">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="text-sm">6% increase from last year</span>
          </div>
        </div>
      </div>
      

      
      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Expense Categories */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-gray-900 dark:text-white">Expense Categories</h3>
            <PieChart className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
            {expenseCategories.map((category, index) => {
              const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-yellow-500", "bg-red-500"];
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{category.category}</span>
                    <span className="text-gray-900 dark:text-white font-medium">${category.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${colors[index]} h-2 rounded-full`} 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {category.percentage}% of total expenses
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Impact Metrics */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-5 rounded-xl shadow">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-semibold text-gray-900 dark:text-white">Impact Metrics</h3>
            <Target className="w-5 h-5 text-gray-500" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              {/* <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" /> */}
              <h4 className="font-bold text-2xl text-blue-700 dark:text-blue-300">{impactMetrics.familiesSupported}</h4>
              <p className="text-sm text-blue-600 dark:text-blue-200">Families Supported</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
              </svg>
              <h4 className="font-bold text-2xl text-green-700 dark:text-green-300">{impactMetrics.mealsProvided.toLocaleString()}</h4>
              <p className="text-sm text-green-600 dark:text-green-200">Meals Provided</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
              <svg className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v6l9-5m-9 5l-9-5"></path>
              </svg>
              <h4 className="font-bold text-2xl text-purple-700 dark:text-purple-300">{impactMetrics.educationGrants}</h4>
              <p className="text-sm text-purple-600 dark:text-purple-200">Education Grants</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <h4 className="font-bold text-2xl text-red-700 dark:text-red-300">{impactMetrics.medicalTreatments}</h4>
              <p className="text-sm text-red-600 dark:text-red-200">Medical Treatments</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Top Donors Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 dark:text-white">Top Donors</h3>
          <Search className="w-5 h-5 text-gray-500" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {topDonors.map((donor, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{donor.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {donor.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {donor.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${donor.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      

    </div>
  );
}