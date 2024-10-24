import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
  Dashboard,
  HouseTwoTone,
  StarHalf,
  SupervisedUserCircle,
  VerifiedUser,
  VerticalSplit
} from "@material-ui/icons";

const navList = [
    { id: 1, linkName: "Dashboard", icon: <Dashboard /> },
    { id: 2, linkName: "Students", icon: <SupervisedUserCircle /> },
    { id: 3, linkName: "Teachers", icon: <VerifiedUser /> },
    { id: 4, linkName: "Staff", icon: <StarHalf /> },
    { id: 5, linkName: "Vehicle", icon: <VerticalSplit /> },
    { id: 6, linkName: "Hostel", icon: <HouseTwoTone /> },
    { id: 1, linkName: "Dashboard", icon: <Dashboard /> },
    { id: 2, linkName: "Students", icon: <SupervisedUserCircle /> },
    { id: 3, linkName: "Teachers", icon: <VerifiedUser /> },
    { id: 4, linkName: "Staff", icon: <StarHalf /> },
    { id: 5, linkName: "Vehicle", icon: <VerticalSplit /> },
    { id: 6, linkName: "Hostel", icon: <HouseTwoTone /> }
];

export default function DrawerList () {
  return (
    <List>
      {navList.map((items) => (
        <ListItem key={items.id} button>
          <ListItemIcon>{items.icon}</ListItemIcon>
          <ListItemText>{items.linkName}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

