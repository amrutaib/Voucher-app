import { BsGeoAltFill } from "react-icons/bs";
import { HiOutlineTicket } from "react-icons/hi2";
import { PiUserCircleBold } from "react-icons/pi";
import { MdOutlineSpaceDashboard, MdPayment } from "react-icons/md";

const Data = [
    {
        id: 1,
        route: "/dashboard",
        key: "Dashboard",
        routeName: "Dashboard",
        subRoutes: [
            '/dashboard',
            '/UserProfile',
        ],
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
            '/uservouchers',
        ],
        iconName: <PiUserCircleBold fontSize={24} />
    },
    {
        id: 3,
        route: "/vouchers",
        key: "Voucher",
        routeName: "Voucher",
        subRoutes: ['/editVoucher'],
        iconName: <HiOutlineTicket fontSize={24} />
    },
    {
        id: 4,
        route: "/payment",
        key: "Payment Summary",
        routeName: "Payment Summary",
        iconName: <MdPayment fontSize={24} />
    },
    {
        id: 5,
        route: "/destination",
        key: "Destination",
        routeName: "Destination",
        iconName: <BsGeoAltFill fontSize={24} />
    }
];

export default Data
