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
