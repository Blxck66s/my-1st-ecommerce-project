import React from "react";
import logoLight from "../../public/LogoLight.png";
import logoDark from "../../public/LogoDark.png";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { modeSwitcher } from "../../stores/headerSlice";

function LogoAndMode() {
  const mode = useSelector((state) => state.header.mode);
  const dispatch = useDispatch();
  const modeFn = () => dispatch(modeSwitcher(!mode));

  return (
    <div className="flex  items-center ml-20">
      <i className="ml-4 mr-4">
        <img src={mode ? logoDark : logoLight} alt="logolight" width="150px" />
      </i>
      <button onClick={modeFn}>
        {mode ? (
          <MoonIcon className="BtnHover h-7 w-7 ml-16 text-slate-100" />
        ) : (
          <SunIcon className="BtnHover h-7 w-7 ml-16 text-slate-700" />
        )}
      </button>
    </div>
  );
}

export default LogoAndMode;
