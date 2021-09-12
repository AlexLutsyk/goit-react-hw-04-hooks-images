import { useState } from "react";

import Modal from "../Modal/Modal";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ webformatURL, tag, largeImageURL }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <li className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItemImage}
          src={webformatURL}
          alt={tag}
          onClick={toggleModal}
        />
      </li>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
}
