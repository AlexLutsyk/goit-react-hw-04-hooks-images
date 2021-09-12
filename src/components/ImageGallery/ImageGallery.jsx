import { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API from "../../API/API";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import s from "./ImageGallery.module.css";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default function ImageGallery({ keyWord }) {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!keyWord) {
      return;
    }

    setStatus(Status.PENDING);

    API(keyWord, 1)
      .then((images) => {
        if (images.total === 0) {
          toast.error(`Sorry this ${keyWord} image is not found.`);
          setStatus(Status.REJECTED);
          return;
        }

        setImages(images.hits);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
    setPage(2);
  }, [keyWord]);

  const getNextPage = () => {
    setPage(page + 1);
    API(keyWord, page).then((images) => {
      setImages((prevImages) => [...prevImages, ...images.hits]);
      setStatus(Status.RESOLVED);
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  if (status === Status.IDLE) {
    return (
      <>
        <p>Enter a keyword to find images.</p>
      </>
    );
  }
  if (status === Status.PENDING) {
    return (
      <div className={s.loaderContainer}>
        <Loader
          type="Watch"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    );
  }
  if (status === Status.REJECTED) {
    return <p>Wrong keyword. Please try again.</p>;
  }

  if (status === Status.RESOLVED) {
    return (
      <div>
        <ul className={s.ImageGallery}>
          {images.map((image) => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              tags={image.tags}
              largeImageURL={image.largeImageURL}
            />
          ))}
        </ul>
        <Button onClickMore={getNextPage} />
      </div>
    );
  }
}
