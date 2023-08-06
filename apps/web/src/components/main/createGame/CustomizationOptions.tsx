import gsap from "gsap";
import { useContext, useEffect, useRef } from "react";
import { DataContext, GameContextType } from '../../../Context/DataProvider';

const CustomizationOptions = () => {
  //Get necessary states from the context
  const { gameOptions, setGameOptions } = useContext(DataContext) as GameContextType;

  // Gsap animations
  let timeline = gsap.timeline({ paused: true });
  let customTitle = useRef(null);
  let input1 = useRef(null);
  let input2 = useRef(null);

  useEffect(() => {
    timeline.fromTo(
      customTitle.current,
      {
        duration: 0.5,
        opacity: 0,
        x: 100,
        ease: 'Power3.easeOut',
      },
      { opacity: 1, x: 0 }
    );
    timeline.fromTo(
      [input1.current, input2.current],
      {
        duration: 0.5,
        opacity: 0,
        x: 200,
        skewY: 10,
        stagger: {
          amount: 0.6,
        },
        ease: 'Power3.easeOut',
      },
      { opacity: 1, x: 0, skewY: 0 }
    );
    timeline.play();
    return () => {
      timeline.paused();
    };
    //eslint-disable-next-line
  }, []);
  //Handle Set Background color
  const handleBgColor = (color: string) => {
    setGameOptions({
      ...gameOptions,
      backgroundColor: color,
    });
  };
  return (
    <div>
      <section
        ref={input1}
        className="grid grid-cols-1 gap-4 justify-between"
      >
        {/* Select Game Level */}
        <div className="bg-accent p-2 rounded text-white">
          <legend className="font-2xl md:font-semibold">
            Game Difficulty Level
          </legend>
          <fieldset
            className="grid grid-cols-3 md:gap-3 items-center"
            onClick={(e) => setGameOptions({ ...gameOptions, difficultyLevel: (e.target as HTMLSelectElement).value })}
          >
            <div className="flex gap-1 items-center">
              <input
                className="cursor-pointer"
                type="radio"
                value="easy"
                name="game-level"
                id="easy"
              />
              <label className="cursor-pointer" htmlFor="easy">
                Easy
              </label>
            </div>
            <div className="flex gap-1 items-center">
              <input
                className="cursor-pointer"
                type="radio"
                value="medium"
                name="game-level"
                id="medium"
              />
              <label className="cursor-pointer" htmlFor="medium">
                Mid
              </label>
            </div>
            <div className="flex gap-1 items-center">
              <input
                className="cursor-pointer"
                type="radio"
                value="hard"
                name="game-level"
                id="hard"
              />
              <label className="cursor-pointer" htmlFor="hard">
                Hard
              </label>
            </div>
          </fieldset>
        </div>
        {/* Select Game Level End*/}
        {/* Select Game Player */}
        <div className="bg-accent p-2 rounded text-white">
          <legend className="font-2xl md:font-semibold">Game Player</legend>
          <fieldset
            className="flex gap-3 items-center"
            onClick={(e) => setGameOptions({ ...gameOptions, playerCount: (e.target as HTMLSelectElement).value })}
          >
            <div className="flex gap-1 items-center">
              <input
                className="cursor-pointer"
                type="radio"
                value="single-player"
                name="game-player"
                id="single-player"
              />
              <label className="cursor-pointer" htmlFor="single-player">
                Single
              </label>
            </div>
            <div className="flex gap-1 items-center">
              <input
                className="cursor-pointer"
                type="radio"
                value="multiplayer"
                name="game-player"
                id="multiplayer"
              />
              <label className="cursor-pointer" htmlFor="multiplayer">
                Multiplayer
              </label>
            </div>
          </fieldset>
        </div>
        {/* Select Game Player  end*/}
        <div className="border-2 border-accent px-2 rounded text-white md:font-semibold">
          <p
            className="md:font-semibold text-white "
          >
            Background Color
          </p>
          <input
            onChange={(e) => setGameOptions({ ...gameOptions, backgroundColor: (e.target as HTMLInputElement).value })}
            type="color"
            name="background-color"
            id="bg-color"
            className="w-full h-8 rounded border-2 border-accent my-2"
          />
        </div>
      </section>
      {/* Game Customization Second Section */}
      <section
        ref={input2}
        className="grid grid-cols-2 gap-4 my-5 text-white"
      >
        {/* Game Sound toggle */}
        <div>
          <p className="md:font-semibold text-white ">
            Game Sound
          </p>
          <div
            className="flex text-white "
          >
            <button
              className={`px-4 py-1 border-2 border-accent rounded-l-md ${gameOptions.gameSound
                ? "bg-accent text-white"
                : "bg-transparent"
                }`}
            >
              Yes
            </button>
            <button
              className={`px-4 py-1 border-2 border-accent rounded-r-md ${!gameOptions.gameSound
                ? "bg-accent text-white"
                : "bg-transparent"
                }`}
            >
              No
            </button>
          </div>
        </div>
        {/* Select Game Level */}
        <div>
          <p className="md:font-semibold text-white "> Level Count </p>
          <select
            name="game-level"
            id="level-count"
            className="border-2 border-accent px-4 py-1 rounded-md bg-accent outline-none">
            <option value="5">Level 5</option>
            <option value="10">Level 10</option>
            <option value="15">Level 15</option>
            <option value="20">Level 20</option>
            <option value="25">Level 25</option>
          </select>
        </div>
        {/* Scores toggle */}
        <div>
          <p className="md:font-semibold text-white ">
            Include Score?
          </p>
          <div
            className="flex text-white "
          >
            <button
              className={`px-4 py-1 border-2 border-accent rounded-l-md ${gameOptions.gameScore
                ? "bg-accent text-white"
                : "bg-transparent"
                }`}
            >
              Yes
            </button>
            <button
              className={`px-4 py-1 border-2 border-accent rounded-r-md ${!gameOptions.gameScore
                ? "bg-accent text-white"
                : "bg-transparent"
                }`}
            >
              No
            </button>
          </div>
        </div>
        {/* Share Game options */}
        <div>
          <p className="md:font-semibold text-white ">
            Share Option?
          </p>
          <div
            className="flex text-white "
          >
            <button
              className={`px-4 py-1 border-2 border-accent rounded-l-md ${gameOptions.gameShare
                ? "bg-accent text-white"
                : "bg-transparent"
                }`}
            >
              Yes
            </button>
            <button
              className={`px-4 py-1 border-2 border-accent rounded-r-md ${!gameOptions.gameShare
                ? "bg-accent text-white"
                : "bg-transparent"
                }`}
            >
              No
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomizationOptions;
