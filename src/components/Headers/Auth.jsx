import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../Features/Auth/LoginForm";
import RegisterForm from "../../Features/Auth/RegisterForm";
import { modalSwitcher } from "../../stores/modalSlice";
import Modal from "../ui/Modal";

function Auth() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(null);
  const modal = useSelector((state) => state.modal.modalActive);
  const dispatch = useDispatch();
  const openModalFn = (e) => {
    dispatch(modalSwitcher(!modal));
    setTitle(e.target.value);
  };

  useEffect(() => {
    if (title === "สมัครสมาชิก") {
      setContent(<RegisterForm />);
    }
    if (title === "เข้าสู่ระบบ") {
      setContent(<LoginForm />);
    }
  }, [title]);

  return (
    <div className="flex mr-20 items-center">
      <button
        className="NavAuth BtnHover hover:bg-blue-600 hover:text-slate-100 text-blue-600"
        onClick={openModalFn}
        value="สมัครสมาชิก"
      >
        สมัครสมาชิก
      </button>
      <button
        className="NavAuth BtnHover  hover:bg-blue-600 hover:text-slate-100"
        onClick={openModalFn}
        value="เข้าสู่ระบบ"
      >
        เข้าสู่ระบบ
      </button>
      {modal && <Modal title={title}>{content}</Modal>}
    </div>
  );
}

export default Auth;
