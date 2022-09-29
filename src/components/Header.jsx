import LogoAndMode from "./Headers/LogoAndMode";
import Nav from "./Headers/Nav";
import Auth from "./Headers/Auth";
import { useSelector } from "react-redux";

function Header() {
  const mode = useSelector((state) => state.header.mode);

  return (
    <div className={mode ? "dark" : ""}>
      <div className="flex justify-between min-w-[1060px] bg-slate-100 dark:bg-slate-800  dark:text-slate-100">
        <LogoAndMode />
        <Nav />
        <Auth />
      </div>
    </div>
  );
}

export default Header;
