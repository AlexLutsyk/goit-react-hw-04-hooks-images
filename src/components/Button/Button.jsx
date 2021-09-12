import React from "react";
import s from "./Button.module.css";

export default function Button({ onClickMore }) {
  return (
    <button className={s.Button} type="button" onClick={onClickMore}>
      Load More
    </button>
  );
}
