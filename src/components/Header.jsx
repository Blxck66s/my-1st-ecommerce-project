import LogoAndMode from "./Headers/LogoAndMode";
import Nav from "./Headers/Nav";
import Auth from "./Headers/Auth";
import { useSelector } from "react-redux";
import User from "./Headers/User";

function Header() {
  const isLogged = useSelector((state) => state.auth.isLogged);

  return (
    <div className="flex justify-between min-w-[1080px] bg-slate-100 dark:bg-slate-800  dark:text-slate-100">
      <LogoAndMode />
      <Nav />
      {isLogged ? <User /> : <Auth />}
    </div>
  );
}

export default Header;
