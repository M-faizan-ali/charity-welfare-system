import React from "react";
import { Plus, DollarSign, Users, Wallet, Receipt } from "lucide-react";

export default function AdminDashboard() {
  const allData = [
    { details: "Current Balance", detailsInNumber: 2000, icon: Wallet, color: "bg-blue-100 text-blue-600" },
    { details: "Total Donors", detailsInNumber: 342, icon: Users, color: "bg-purple-100 text-purple-600" },
    { details: "Monthly Donation", detailsInNumber: 45000, icon: DollarSign, color: "bg-green-100 text-green-600" },
    { details: "Monthly Expenses", detailsInNumber: 40000, icon: Receipt, color: "bg-red-100 text-red-600" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <div className="mt-4 sm:mt-0 flex gap-3">
          <button
            type="button"
            className="rounded-md text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium text-sm px-5 py-2.5 dark:focus:ring-yellow-900 shadow-md"
          >
            Generate Reports
          </button>
          <button
            type="button"
            className="flex items-center gap-2 text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium text-sm px-5 py-2.5 rounded-md dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {allData.map((data, idx) => {
          const Icon = data.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                {/* Icon */}
                <div className={`p-3 rounded-full ${data.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {/* Details */}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{data.details}</p>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${data.detailsInNumber.toLocaleString()}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
