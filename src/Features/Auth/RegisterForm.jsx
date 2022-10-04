import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../contexts/AuthContext";
import { modalSwitcher } from "../../stores/modalSlice";
import RegisterValidation from "../../utils/RegisterValidation";

function RegisterForm() {
  const { register, getuser } = useContext(AuthContext);
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const initialValuePH = {
    firstName: "ชื่อ",
    lastName: "นามสกุล",
    email: "อีเมล",
    mobile: "เบอร์",
    username: "username",
    password: "รหัสผ่าน",
    confirmPassword: "ยืนยันรหัสผ่าน",
  };
  const [inputPH, setInputPH] = useState({
    firstName: "ชื่อ",
    lastName: "นามสกุล",
    email: "อีเมล",
    mobile: "เบอร์",
    username: "username",
    password: "รหัสผ่าน",
    confirmPassword: "ยืนยันรหัสผ่าน",
  });
  const [unique, setUnique] = useState("");
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.modalActive);
  const closeModalFn = (e) => {
    dispatch(modalSwitcher(!modal));
  };
  useEffect(() => {}, [inputPH]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setInputPH({ initialValuePH });
      let errors = RegisterValidation(input);
      if (Object.keys(errors).length !== 0) {
        const merged = Object.assign(initialValuePH, errors);
        setInputPH({ ...merged });
        errors = null;

        return;
      }
      await register(input);

      await getuser();
      closeModalFn();
    } catch (err) {
      console.log(err);
      console.log(err.response.data.message);
      if (err.response.data.message === "username must be unique")
        setUnique("username นี้ได้ถูกใช้ไปแล้ว");
    }
  };
  return (
    <form>
      <div className="min-h-fit flex flex-col my-5 gap-2 items-center ">
        <div className="flex flex-col gap-1">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="ชื่อ"
              className={`placeholder:pl-2 placeholder:text-slate-400 w-40 dark:bg-gray-500 ${
                inputPH.firstName !== "ชื่อ" ? "border border-red-500" : ""
              }`}
              value={input.firstName}
              onChange={(e) =>
                setInput({ ...input, firstName: e.target.value })
              }
            ></input>

            <input
              type="text"
              placeholder="นามสกุล"
              className={`placeholder:pl-2 placeholder:text-slate-400 w-40 dark:bg-gray-500 ${
                inputPH.lastName !== "นามสกุล" ? "border border-red-500" : ""
              }`}
              value={input.lastName}
              onChange={(e) => setInput({ ...input, lastName: e.target.value })}
            ></input>
          </div>
          <div className="flex gap-4 justify-around">
            <span className="text-red-500 text-xs">
              {inputPH.firstName !== "ชื่อ" ? inputPH.firstName : ""}
            </span>
            <span className="text-red-500 text-xs">
              {inputPH.lastName !== "นามสกุล" ? inputPH.lastName : ""}
            </span>
          </div>
        </div>

        <input
          type="email"
          placeholder="อีเมล"
          className={`placeholder:pl-2 placeholder:text-slate-400 w-[21rem] dark:bg-gray-500 ${
            inputPH.email !== "อีเมล" ? "border border-red-500" : ""
          } `}
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
        ></input>
        <span className="text-red-500 text-xs">
          {inputPH.email !== "อีเมล" ? inputPH.email : ""}
        </span>

        <input
          type="tel"
          placeholder="เบอร์"
          className={`placeholder:pl-2 placeholder:text-slate-400 w-[21rem] dark:bg-gray-500  ${
            inputPH.mobile !== "เบอร์" ? "border border-red-500" : ""
          }`}
          value={input.mobile}
          onChange={(e) => setInput({ ...input, mobile: e.target.value })}
        ></input>
        <span className="text-red-500 text-xs">
          {inputPH.mobile !== "เบอร์" ? inputPH.mobile : ""}
        </span>

        <input
          type="text"
          placeholder="username"
          className={`placeholder:pl-2 placeholder:text-slate-400 w-[21rem] dark:bg-gray-500 ${
            inputPH.username !== "username" ? "border border-red-500" : ""
          } `}
          value={input.username}
          onChange={(e) => setInput({ ...input, username: e.target.value })}
        ></input>
        <span className="text-red-500 text-xs">
          {inputPH.username !== "username" ? inputPH.username : ""}
        </span>
        <input
          type="password"
          placeholder="รหัสผ่าน"
          className={`placeholder:pl-2 placeholder:text-slate-400 w-[21rem] dark:bg-gray-500 ${
            inputPH.password !== "รหัสผ่าน" ? "border border-red-500" : ""
          } `}
          value={input.password}
          onChange={(e) => setInput({ ...input, password: e.target.value })}
        ></input>
        <span className="text-red-500 text-xs">
          {inputPH.password !== "รหัสผ่าน" ? inputPH.password : ""}
        </span>

        <input
          type="password"
          placeholder="ยืนยันรหัสผ่าน"
          className={`placeholder:pl-2 placeholder:text-slate-400 w-[21rem] dark:bg-gray-500 ${
            inputPH.confirmPassword !== "ยืนยันรหัสผ่าน"
              ? "border border-red-500"
              : ""
          } `}
          value={input.confirmPassword}
          onChange={(e) =>
            setInput({ ...input, confirmPassword: e.target.value })
          }
        ></input>
        <span className="text-red-500 text-xs">
          {inputPH.confirmPassword !== "ยืนยันรหัสผ่าน"
            ? inputPH.confirmPassword
            : ""}
        </span>
        <span className="text-red-500 text-sm">{unique ? unique : ""}</span>
      </div>
      <div className="my-5">
        <button
          className="NavAuth BtnHover hover:bg-blue-600 hover:text-slate-100 text-blue-600"
          onClick={handleRegister}
          value="ยืนยัน"
        >
          ยืนยัน
        </button>
      </div>
    </form>
  );
}

export default RegisterForm;
