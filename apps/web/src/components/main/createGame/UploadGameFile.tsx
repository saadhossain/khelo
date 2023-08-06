import gsap from "gsap";
import { useContext, useEffect, useRef, useState } from "react";
import { FiFileText } from "react-icons/fi";
import uploadIconWhite from "../../../assets/upload-icon-white.png";
import { DataContext, GameContextType } from '../../../Context/DataProvider';

//Define the of the upload image
interface GameFileProp {
  uploadImg: () => Promise<void>;
  error: string | null;
  loading: boolean
}

const UploadGameFile = ({ uploadImg, error, loading }: GameFileProp) => {
  //Get important states from the context
  const { gameOptions, setGameOptions, img, setImg, } = useContext(DataContext) as GameContextType;
  //Use ref for the handling file input on browse button
  const inputRef = useRef<HTMLInputElement>();
  //Drag and Drop file functionality
  const handleDragFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setImg(e.dataTransfer.files);
  };
  const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setImg(e.dataTransfer.files);
  };
  const setGameTitle = (title: string) => {
    setGameOptions({
      ...gameOptions,
      gameTitle: title,
    });
  };
  //Gsap animations
  const timeline = gsap.timeline({ paused: true });
  let uploadField = useRef(null);
  useEffect(() => {
    timeline.from(uploadField.current, {
      opacity: 0,
      duration: 0.4,
      y: 60,
      x: -50,
      ease: 'Power3.easeInOut',
    });
    timeline.play();
    return () => {
      timeline.paused();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <div ref={uploadField} className="w-11/12 md:w-[450px] mx-auto">
      {/* Game Title */}
      <div>
        <p
          className="md:font-semibold text-white"
        >
          Game Title <span className="text-red-600 text-xl">*</span>
        </p>
        <input
          onChange={(e) => setGameTitle(e.target.value)}
          value={gameOptions.gameTitle}
          placeholder="Enter Preferred Game Title"
          type="text"
          name="game-title"
          id="game-title"
          className="p-2 rounded-md border-2 border-[#E7E7E7] text-white outline-none bg-transparent w-full"
        />
      </div>
      {/* File upload box */}
      <p
        className="md:font-semibold text-white"
      >
        Game Image <span className="text-red-600 text-xl">*</span>
      </p>
      <div className="flex flex-col items-center border-dashed border-2 border-[#E7E7E7] py-5 text-white font-semibold rounded-md">
        <div
          onDragOver={handleDragFile}
          onDrop={handleDropFile}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            src={uploadIconWhite}
            alt="Upload file"
            className="w-12"
          />
          <h4 className="text-xl">Drag and Drop file</h4>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-light"></div>
          <p className="px-3 text-md">OR</p>
          <div className="flex-1 h-px sm:w-16 bg-light"></div>
        </div>
        {/* Input file field to add file by browsing the folder */}
        <input
          type="file"
          onChange={(e) => setImg(e.target.files && e.target.files[0])}
          hidden
          ref={inputRef as React.RefObject<HTMLInputElement>}
        />
        <button
          onClick={() => inputRef.current && inputRef.current.click()}
          className="flex items-center gap-2 py-2 px-4 rounded-lg bg-secondary mt-2 text-night"
        >
          <FiFileText /> Choose File
        </button>
        {/* Show the file Name, if uploaded */}
        {img &&
          <p className="font-semibold text-white">
            {img?.name}
          </p>
        }
      </div>
      <button
        onClick={uploadImg}
        className="py-2 px-10 rounded-lg bg-accent my-2 text-white font-semibold duration-300 ease-in-out hover:bg-secondary"
      >Create Game</button>
      {/* Error Message */}
      <p className="font-poppins mt-2 text-red-600">{error && error}</p>
    </div>
  );
};

export default UploadGameFile;
