import LogoAndMode from "./Headers/LogoAndMode";
import Nav from "./Headers/Nav";
import Auth from "./Headers/Auth";

import User from "./Headers/User";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-between min-w-[1080px] bg-slate-100 dark:bg-slate-800  dark:text-slate-100">
      <LogoAndMode />
      <Nav />
      {user ? <User /> : <Auth />}
    </div>
  );
}

export default Header;
