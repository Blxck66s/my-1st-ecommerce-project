import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../contexts/AuthContext";
import { modalSwitcher } from "../../stores/modalSlice";

function LoginForm() {
  const { login, getuser } = useContext(AuthContext);
  const [input, setInput] = useState({ username: "", password: "" });
  const [usernamePH, setUsernamePH] = useState("username");
  const [passwordPH, setPasswordPH] = useState("password");
  const [usernamePHBL, setUsernamePHBL] = useState(false);
  const [passwordPHBL, setPasswordPHBL] = useState(false);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.modalActive);

  const closeModalFn = () => {
    dispatch(modalSwitcher(!modal));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setUsernamePH("username");
    setPasswordPH("password");
    setUsernamePHBL(false);
    setPasswordPHBL(false);
    try {
      await login(input);
      await getuser();
      closeModalFn();
    } catch (err) {
      console.log(err);
      console.log(err.response?.data?.message);
      setInput({ username: "", password: "" });
      if (err.response?.data?.message === "this username doesnt exist") {
        setUsernamePH("username is invalid");
        setUsernamePHBL(true);
      }
      if (err.response?.data?.message === "password is invalid") {
        setPasswordPH("password is invalid");
        setPasswordPHBL(true);
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="h-[80px] flex flex-col my-5 gap-4 items-center">
        <input
          type="text"
          placeholder={usernamePH}
          className={`placeholder:pl-2 placeholder:text-slate-400 w-[17rem] dark:bg-gray-500 ${
            usernamePHBL ? "placeholder:text-red-500 border border-red-500" : ""
          }`}
          value={input.username}
          onChange={(e) => setInput({ ...input, username: e.target.value })}
        ></input>

        <input
          type="password"
          placeholder={passwordPH}
          className={`placeholder:pl-2 placeholder:text-slate-400 w-[17rem] dark:bg-gray-500 ${
            passwordPHBL ? "placeholder:text-red-500 border border-red-500" : ""
          }`}
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
