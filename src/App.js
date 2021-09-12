import { useState } from "react";
import { ToastContainer } from "react-toastify";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";

import "./App.css";

export default function App() {
  const [keyWord, setKeyword] = useState("");

  const handleKeywordSubmit = (imageKeyWord) => {
    setKeyword(imageKeyWord);
  };

  return (
    <div className="App">
      <Searchbar onSubmitKeyword={handleKeywordSubmit} />
      <ImageGallery keyWord={keyWord} />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
