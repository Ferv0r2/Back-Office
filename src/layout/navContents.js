import { HiCollection, HiBell, HiUser } from "react-icons/hi";
import {
  RiLayoutLeftFill,
  RiCalculatorFill,
  RiContactsBook2Fill,
} from "react-icons/ri";
import { GoSignIn } from "react-icons/go";

const contents = [
  {
    id: "n1",
    name: "Dashboard",
    url: "/dashboard",
    icon: <RiLayoutLeftFill />,
  },
  {
    id: "n2",
    name: "Tables",
    url: "/tables",
    icon: <HiCollection />,
  },
  {
    id: "n4",
    name: "Event",
    url: "/event",
    icon: <HiBell />,
  },
  {
    id: "n5",
    name: "Profile",
    url: "/profile",
    icon: <HiUser />,
  },
  {
    id: "n6",
    name: "Sign In",
    url: "/signin",
    icon: <GoSignIn />,
  },
  {
    id: "n7",
    name: "Sign Up",
    url: "/signup",
    icon: <RiContactsBook2Fill />,
  },
];

export default contents;
