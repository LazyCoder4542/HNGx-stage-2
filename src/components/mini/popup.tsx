import React, { useEffect } from "react";
import { IPopupContext, usePopup } from "./popupContext";

import { ReactComponent as CloseIcon} from './../../assets/icons/close.svg'

import style from "./popup.module.css"
const Popup = () => {
  const { value, clearPopup } = usePopup() as IPopupContext;
  
  useEffect(() => {
    if (value !== null) {
      const timer = setTimeout(() => {
        clearPopup();
      },3000);
      return () => clearTimeout(timer);
    }
  }, [value, clearPopup]);

  return value ? <div className={style.popup}>
    <span>{value}</span>
    <span
    onClick={() => {
      clearPopup()
    }}
    >
      <CloseIcon/>
    </span>
  </div> : null;
};

export default Popup;
