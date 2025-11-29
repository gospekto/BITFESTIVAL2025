import { useAuth } from "../../context/AuthContext";
import NavbarLogged from "./NavbarLogged";
import NavbarGuest from "./NavbarGuest";

export default function Navbar() {
  const { user } = useAuth();

  return user ? <NavbarLogged /> : <NavbarGuest />;
}
