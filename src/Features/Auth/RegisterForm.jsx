import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalSwitcher } from "../../stores/modalSlice";

function RegisterForm() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.modalActive);
  const openModalFn = (e) => {
    dispatch(modalSwitcher(!modal));
  };
  return (
    <form>
      <div className="h-[270px] flex flex-col my-5 gap-4 items-center">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="ชื่อ"
            className="placeholder:pl-2 placeholder:text-slate-400 w-32"
          ></input>

          <input
            type="text"
            placeholder="นามสกุล "
            className="placeholder:pl-2 placeholder:text-slate-400 w-32"
          ></input>
        </div>

        <input
          type="email"
          placeholder="อีเมล"
          className="placeholder:pl-2 placeholder:text-slate-400 w-[17rem]"
        ></input>

        <input
          type="tel"
          placeholder="เบอร์"
          className="placeholder:pl-2 placeholder:text-slate-400 w-[17rem]"
        ></input>

        <input
          type="text"
          placeholder="username"
          className="placeholder:pl-2 placeholder:text-slate-400 w-[17rem]"
        ></input>
        <span className="-my-3 text-xs text-red-400">
          ** รหัสผ่านจะต้องมีอย่างน้อย 8 หลักขึ้นไป
        </span>
        <input
          type="password"
          placeholder="รหัสผ่าน"
          className="placeholder:pl-2 placeholder:text-slate-400 w-[17rem]"
        ></input>

        <input
          type="password"
          placeholder="ยืนยัน รหัสผ่าน"
          className="placeholder:pl-2 placeholder:text-slate-400 w-[17rem]"
        ></input>
      </div>
      <div className="my-5">
        <button
          className="NavAuth BtnHover hover:bg-blue-600 hover:text-slate-100 text-blue-600"
          onClick={openModalFn}
          value="สมัครสมาชิก"
        >
          ยืนยัน
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
