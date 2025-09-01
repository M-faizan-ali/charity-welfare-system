import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  HeartHandshake,
  Users,
  ClipboardPlus,
  Receipt,
} from "lucide-react";

const linkBase =
  "flex items-center p-2 rounded-lg transition-colors text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";
const linkActive = "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white";

export default function SideBar() {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              <LayoutDashboard className="shrink-0" />
              <span className="ml-3">Dashboard</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/donations"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              <HeartHandshake className="shrink-0" />
              <span className="ml-3 flex-1 whitespace-nowrap">Donations</span>
              <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                Pro
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/expenses"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              <Receipt className="shrink-0" />
              <span className="ml-3 flex-1 whitespace-nowrap">Expenses</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/donors"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              <Users className="shrink-0" />
              <span className="ml-3 flex-1 whitespace-nowrap">Donors</span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : ""}`
              }
            >
              <ClipboardPlus className="shrink-0" />
              <span className="ml-3 flex-1 whitespace-nowrap">Reports</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
}
