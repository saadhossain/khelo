import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";
import {
  AiFillDollarCircle,
  AiFillStar,
  AiFillTrophy,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { FaRegClone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectGameForClone } from "../../redux/slices/templateSlice";
import { GamesDataType } from "../../types";
import GameShareOptions from "./GameShareOptions";
import GamesInteractions from "./GamesInteractions";

const FeaturedGameSingle = ({ game }: { game: GamesDataType }) => {
  // console.log(game)
  //Toggle Share options
  const [expandSocial, setExpandSocial] = useState(false);
  const dispatch = useDispatch();
  // Gsap animations
  let timeline = gsap.timeline();
  let gamesRef = useRef(null);
  useEffect(() => {
    timeline.from(gamesRef.current, {
      opacity: 0,
      duration: 0.8,
      scale: 0.1,
      y: -50,
      ease: "power3.inOut",
      stagger: {
        amount: 1.5,
      },
    });
    //eslint-disable-next-line
  }, []);
  return (
    <div className="bg-secondary shadow-md rounded-md p-4 md:flex relative">
      {/* Game Details */}
      <div className="w-full md:w-3/5 flex flex-col justify-between mb-5 md:mb-0">
        {/* Game name and hours played */}
        <div>
          <div className="flex gap-2 items-center py-2">
            <h1 className="text-xl font-semibold text-center text-white uppercase">
              {game.game_name}
            </h1>
            <p className="text-slate-100">
              <span className="text-accent font-semibold">{game.plays}+</span>{" "}
              Times Played
            </p>
          </div>
          <hr className="border-spacing-10 border-gray-500 w-4/5" />
        </div>
        {/* Game player count and Pricing */}
        <div className="flex gap-8 py-2">
          {/* Game Ratings */}
          <div className="text-white">
            <p>Game Rating</p>
            <span className="flex gap-1 items-center">
              <AiFillStar className="text-accent" />
              <p className="text-slate-300">4.9/5.0</p>
            </span>
          </div>
          {/* Game win ratio */}
          <div className="text-white">
            <p>Win Ratio</p>
            <span className="flex gap-1 items-center">
              <AiFillTrophy className="text-accent w-4 h-4" />
              <p className="text-slate-300">74.9%</p>
            </span>
          </div>
          {/* Game Price */}
          <div className="text-white">
            <p>Game Cost</p>
            <span className="flex gap-1 items-center">
              <AiFillDollarCircle className="text-accent w-4 h-4" />
              <p className="text-slate-300">Free</p>
            </span>
          </div>
        </div>
        {/* Game Play and Clone button */}
        <div className="flex items-center gap-5">
          <Link
            to={`/game/play/${game.id}`}
            className="flex gap-1 items-center py-1 px-2 rounded bg-accent text-white text-center font-semibold"
          >
            <AiOutlinePlayCircle className="w-6 h-6" /> Play
          </Link>
          <label
            onClick={() => dispatch(selectGameForClone(game))}
            htmlFor="gameTemplateModal"
            className="flex gap-1 items-center py-1 px-2 rounded border-2 border-accent text-white hover:bg-accent hover:text-white duration-300 ease-in-out text-center cursor-pointer font-semibold"
          >
            <FaRegClone /> Clone
          </label>
        </div>
        {/* User Interactions */}
        <GamesInteractions
          game={game}
          expandSocial={expandSocial}
          setExpandSocial={setExpandSocial}
        />
      </div>
      {/* Game Image/Thumbnail */}
      <img
        src={game.img}
        loading="lazy"
        alt="brickout"
        className="w-64 md:w-2/5 h-44 mx-auto md:h-56 rounded-md"
      />
      {/* Share options */}
      {expandSocial && (
        <GameShareOptions game={game} setExpandSocial={setExpandSocial} />
      )}
      <Toaster />
    </div>
  );
};

export default FeaturedGameSingle;
