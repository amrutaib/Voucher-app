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
        routeName: "User",
        route: "/userslist",
        subRoutes: [
            '/adduser',
            '/editUser',
            '/userpayment',
            '/uservouchers'
        ],
        iconName: <PiUserCircleBold fontSize={24} />
    },
    {
        id: 3,
        route: "/Voucher",
        key: "Voucher",
        routeName: "Voucher",
        subRoutes: [],
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
        key: "Destination",
        routeName: "Destination",
        iconName: <BsGeoAltFill fontSize={24} />
    }
];

export default Data
