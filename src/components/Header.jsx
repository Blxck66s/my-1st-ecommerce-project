import LogoAndMode from "./Headers/LogoAndMode";
import Nav from "./Headers/Nav";
import Auth from "./Headers/Auth";
import { useSelector } from "react-redux";
import User from "./Headers/User";

function Header() {
  const mode = useSelector((state) => state.header.mode);
  const user = useSelector((state) => state.auth.user);
  return (
    <div className={mode ? "dark" : ""}>
      <div className="flex justify-between min-w-[1080px] bg-slate-100 dark:bg-slate-800  dark:text-slate-100">
        <LogoAndMode />
        <Nav />
        {user ? <User /> : <Auth />}
      </div>
    </div>
  );
}

export default Header;
