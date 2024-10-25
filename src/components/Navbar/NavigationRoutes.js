import { LuTag } from "react-icons/lu";
import { BsGeoAltFill } from "react-icons/bs";
import { HiOutlineTicket } from "react-icons/hi2";
import { PiUserCircleBold } from "react-icons/pi";
import { MdOutlineSpaceDashboard, MdPayment } from "react-icons/md";

const Data = [
    {
        id: 1,
        route: "/Dashboard",
        key: "Dashboard",
        iconName: <MdOutlineSpaceDashboard fontSize={24} color="#000" />,
        routeName: "Dashboard"
    },
    {
        id: 2,
        route: "/Userlist",
        key: "Users",
        iconName: <PiUserCircleBold fontSize={24} color="#000" />,
        routeName: "User"
    },
    {
        id: 3,
        route: "/Voucher",
        key: "Payment Summary",
        iconName: <HiOutlineTicket fontSize={24} color="#000" />,
        routeName: "Voucher"
    },
    {
        id: 4,
        route: "/Payment",
        key: "Payment Summary",
        iconName: <MdPayment fontSize={24} color="#000" />,
        routeName: "Payment Summary"
    },
    {
        id: 5,
        route: "/Destination",
        key: "Payment Summary",
        iconName: <BsGeoAltFill fontSize={24} color="#000" />,
        routeName: "Destination"
    },
    {
        id: 6,
        route: "/Scheme",
        key: "Scheme",
        iconName: <LuTag fontSize={24} color="#000" />,
        routeName: "Scheme"
    }
];

export default Data
