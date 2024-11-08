import { BsGeoAltFill } from "react-icons/bs";
import { HiOutlineTicket } from "react-icons/hi2";
import { PiUserCircleBold } from "react-icons/pi";
import { MdOutlineSpaceDashboard, MdPayment } from "react-icons/md";

const Data = [
    {
        id: 1,
        route: "/",
        key: "Dashboard",
        routeName: "Dashboard",
        iconName: <MdOutlineSpaceDashboard fontSize={24} />
    },
    {
        id: 2,
        key: "Users",
        route: "/Userlist",
        routeName: "User",
        iconName: <PiUserCircleBold fontSize={24} />
    },
    {
        id: 3,
        route: "/Voucher",
        key: "Payment Summary",
        routeName: "Voucher",
        iconName: <HiOutlineTicket fontSize={24} />
    },
    {
        id: 4,
        route: "/Payment",
        key: "Payment Summary",
        routeName: "Payment Summary",
        iconName: <MdPayment fontSize={24} />
    },
    {
        id: 5,
        route: "/Destination",
        key: "Payment Summary",
        routeName: "Destination",
        iconName: <BsGeoAltFill fontSize={24} />
    }
];

export default Data
