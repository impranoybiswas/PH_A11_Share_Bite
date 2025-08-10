import { FaUser } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { FaBowlFood } from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";

export const dashbordLinks = [
    {name : "My Profile", path: "/dashboard/my-profile", icon: <FaUser/>},
    {name : "Add Food", path: "/dashboard/add-food", icon: <IoIosAddCircle />},
    {name : "My Foods", path: "/dashboard/my-foods", icon: <FaBowlFood />},
    {name : "My Requests", path: "/dashboard/my-requests", icon: <MdFastfood />},
]
