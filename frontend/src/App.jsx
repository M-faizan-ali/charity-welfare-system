import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import SideBar from "./component/layout/SideBar"
import AdminDashboard from "./component/dashboard/AdminDashboard"
import Donations from "./component/donations/Donations"
import Expenses from "./component/expenses/Expenses"
import Reports from "./component/reports/Reports"
import Donors from "./component/donors/donors"
import DonorForm from "./component/donors/DonorForm"



export default function App() {
  return (
    // <BrowserRouter>
    //   <div className="flex">
    //     {/* Fixed sidebar */}
    //     <SideBar />

    //     {/* Main content area (push right of the fixed sidebar on ≥sm screens) */}
    //     <main className="w-full p-4 sm:ml-64">
    //       <Routes>
    //         {/* Redirect root to /dashboard */}
    //         <Route path="/" element={<Navigate to="/dashboard" replace />} />
    //         <Route path="/dashboard" element={<AdminDashboard />} />
    //         <Route path="/donations" element={<Donations />} />
    //         <Route path="/expenses" element={<Expenses />} />
    //         <Route path="/donors" element={<Donors />} />
    //         <Route path="/reports" element={<Reports />} />
    //         {/* 404 (optional) */}
    //         <Route path="*" element={<div className="p-6">Page not found</div>} />
    //       </Routes>
    //     </main>
    //   </div>
    // </BrowserRouter>
    <DonorForm/>
  )
}
