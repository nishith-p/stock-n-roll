"use client";

import { usePathname } from "next/navigation";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathName = usePathname();
  const isActive =
    pathName === href || (pathName === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } 
		hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
      isActive ? "bg-blue-200 text-white" : ""
    }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSideBarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${
    isSideBarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  const SidebarLinks: SidebarLinkProps[] = [
    {
      href: "/dashboard",
      icon: Layout,
      label: "Dashboard",
      isCollapsed: isSideBarCollapsed,
    },
    {
      href: "/inventory",
      icon: Archive,
      label: "Inventory",
      isCollapsed: isSideBarCollapsed,
    },
    {
      href: "/products",
      icon: Clipboard,
      label: "Products",
      isCollapsed: isSideBarCollapsed,
    },
    {
      href: "/users",
      icon: User,
      label: "Users",
      isCollapsed: isSideBarCollapsed,
    },
    {
      href: "/settings",
      icon: SlidersHorizontal,
      label: "Settings",
      isCollapsed: isSideBarCollapsed,
    },
    {
      href: "/expenses",
      icon: CircleDollarSign,
      label: "Expenses",
      isCollapsed: isSideBarCollapsed,
    },
  ];

  return (
    <div className={sidebarClassNames}>
      {/*LOGO*/}
      <div
        className={`flex gap-3 jusitfy-between md:justfiy-normal items-center pt-8 ${
          isSideBarCollapsed ? "px-4" : "px-8"
        }`}
      >
        <div>Logo</div>
        <h1
          className={`${
            isSideBarCollapsed ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >{`Stock'n'Roll`}</h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/*LINKS*/}
      <div className="flex-grow mt-8">
        {SidebarLinks.map((link) => (
          <SidebarLink
            key={link.label}
            href={link.href}
            icon={link.icon}
            label={link.label}
            isCollapsed={link.isCollapsed}
          />
        ))}
      </div>

      {/*FOOTER*/}
      <div className={`${isSideBarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 {`Stock'n'Roll Inc.`}
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
