import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../stores/authSlice";
import { modalSwitcher } from "../../stores/modalSlice";

function LoginForm() {
  const [input, setInput] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.modalActive);
  const user = useSelector((state) => state.auth.user);
  const closeModalFn = () => {
    dispatch(modalSwitcher(!modal));
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(login(input));
      console.log(user);
      closeModalFn();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleLogin}>
      <div className="h-[80px] flex flex-col my-5 gap-4 items-center">
        <input
          type="text"
          placeholder="username"
          className="placeholder:pl-2 placeholder:text-slate-400 w-[17rem]"
          value={input.username}
          onChange={(e) => setInput({ ...input, username: e.target.value })}
        ></input>

        <input
          type="password"
          placeholder="รหัสผ่าน"
          className="placeholder:pl-2 placeholder:text-slate-400 w-[17rem]"
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        ></input>
      </div>
      <div className="my-5">
        <button
          className="NavAuth BtnHover hover:bg-blue-600 hover:text-slate-100 text-blue-600"
          value="เข้าสู่ระบบ"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
