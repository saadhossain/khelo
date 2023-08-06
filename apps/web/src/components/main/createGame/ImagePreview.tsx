import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { usePostUserPlaysMutation } from "../../../redux/api/userApi";
import { countUserPlay } from "../../../redux/slices/gameSlice";
import { RootState } from "../../../redux/store";

const ImagePreview = () => {
  const [postUserPlays] = usePostUserPlaysMutation();
  const uploadGame = useSelector((state: RootState) => state.uploadGame.game);
  console.log(uploadGame);
  const dispatch = useDispatch();
  let imagePrev = useRef(null);
  //Gsap animations
  let timeline = gsap.timeline({ paused: true });
  useEffect(() => {
    timeline.fromTo(
      imagePrev.current,
      {
        opacity: 0,
        y: 200,
        x: -100,
        skewX: -5,
        duration: 0.8,
        ease: "Power3.easeOut",
      },
      { y: 0, x: 0, skewX: 0, opacity: 1 }
    );
    timeline.play();
    return () => {
      timeline.paused();
    };
    //eslint-disable-next-line
  }, []);

  return (
    <div ref={imagePrev}>
      {uploadGame ? (
        <>
          <img
            src={uploadGame.img}
            alt="Game Preview"
            className="w-full md:w-[450px] h-60 md:h-64 shadow-md rounded-lg bg-accent"
          />
          <div className='flex items-center gap-3 mt-5'>
            <Link
              onClick={() => {
                dispatch(countUserPlay(uploadGame.id));
                postUserPlays(uploadGame);
              }}
              to={`/game/play/${uploadGame.id}`}
              className="w-2/4 p-2 rounded bg-accent text-white text-center font-semibold"
            >
              Play
            </Link>
            <Link
            to={`/editor/${uploadGame.storage_id}`}
            className="w-2/4 p-2 rounded bg-accent text-white text-center font-semibold"
            >Edit</Link>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center w-full md:w-[450px] h-60 md:h-80 shadow-md rounded-lg bg-accent text-white font-semibold">
          <p className="text-lg text-center">
            Image Size <br />
            (320X320) pixels
          </p>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
