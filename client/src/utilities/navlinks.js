import { FaUser } from "react-icons/fa";

export const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Available Foods", path: "/available-foods" },
];

export const privateLinks = [
    {name : "My Profile", path: "/my-profile", icon: FaUser},
    {name : "Add Food", path: "/add-food"},
    {name : "My Foods", path: "/my-foods"},
    {name : "My Requests", path: "/my-requests"},
]