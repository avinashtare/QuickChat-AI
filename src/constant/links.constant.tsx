import { BadgePlus, ImageIcon, Search, type LucideIcon } from "lucide-react";

// Define the interface for a navbar item
export interface NavbarItem {
  label: string;
  path: string;
  roles?: string[]; // Optional: for role-based access control
}

// Navbar items list
export const NAVBAR_ITEMS: NavbarItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Services",
    path: "/Services",
  },
  {
    label: "Pricing",
    path: "/Pricing",
  },
  {
    label: "About",
    path: "/About",
  },
];

export interface SideBarItems {
  label: string;
  path?: string;
  icon: LucideIcon; // Optional: for role-based access control
  isLink: boolean;
  roles?: string[]; // Optional: for role-based access control
}

export const SideBar_ITEMS: SideBarItems[] = [
  {
    label: "New Chat",
    path: "/",
    isLink: true,
    icon: BadgePlus,
  },
  {
    label: "Search",
    path: "/search",
    isLink: false,
    icon: Search,
  },
  {
    label: "Gallary",
    path: "/gallary",
    isLink: true,
    icon: ImageIcon,
  },
];
