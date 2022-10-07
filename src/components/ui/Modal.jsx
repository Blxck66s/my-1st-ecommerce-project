import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalSwitcher } from "../../stores/modalSlice";
import { XMarkIcon } from "@heroicons/react/24/solid";

function Modal({ title, children }) {
  const modal = useSelector((state) => state.modal.modalActive);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(modalSwitcher(!modal));
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black bg-opacity-40 backdrop-blur-sm z-[1000]"
      onClick={closeModal}
    >
      <div
        className="flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[500px] min-h-fit bg-slate-100 rounded-3xl dark:bg-slate-700 
        transition-all ease-in-out duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="my-2 h-1/6 text-4xl flex items-center justify-between">
          <span className="h-full w-6 ml-5"></span>
          <span>{title}</span>
          <button
            className=" BtnHover mt-3 hover:bg-blue-600 hover:text-slate-100 text-blue-600 mr-4 "
            onClick={closeModal}
          >
            <XMarkIcon className="h-8 w-8 " />
          </button>
        </div>
        <div className=" w-full h-5/6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
