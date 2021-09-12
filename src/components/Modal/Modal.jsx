import { useEffect } from "react";
import { createPortal } from "react-dom";

import s from ".//Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener("keydown", onEscape);
  });

  const onEscape = (e) => {
    if (e.code === "Escape") {
      onClose();
    }
  };

  const onOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.modalBackdrop} onClick={onOverlay}>
      <div className={s.modalContent}>{children}</div>
    </div>,
    modalRoot
  );
}
