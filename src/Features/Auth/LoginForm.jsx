import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalSwitcher } from "../../stores/modalSlice";

function LoginForm() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.modalActive);
  const openModalFn = (e) => {
    dispatch(modalSwitcher(!modal));
  };
  return (
    <form>
      <div className="h-[80px] flex flex-col my-5 gap-4 items-center">
        <input
          type="text"
          placeholder="username"
          className="placeholder:pl-2 placeholder:text-slate-400 w-[17rem]"
        ></input>

        <input
          type="password"
          placeholder="รหัสผ่าน"
          className="placeholder:pl-2 placeholder:text-slate-400 w-[17rem]"
        ></input>
      </div>
      <div className="my-5">
        <button
          className="NavAuth BtnHover hover:bg-blue-600 hover:text-slate-100 text-blue-600"
          onClick={openModalFn}
          value="เข้าสู่ระบบ"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
