import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import Frame from "react-frame-component";
import { toast } from "react-hot-toast";
import { FaRegClone } from "react-icons/fa";
import { API } from "../config/config";

const Codex = () => {
  const [instruction, setInstruction] = useState("");
  const [code, setCode] = useState("");
  const instructionHandler = async () => {
    const res = await fetch(`${API}/playground`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ comment: instruction }),
    });
    const { code } = await res.json();
    setCode(code);
    setInstruction("");
  };

  //Onclick Text/Command copy functionality
  const copyToClipboard: React.MouseEventHandler<SVGElement> = (e) => {
    e.stopPropagation();
    const command: string | null = (e.currentTarget.parentNode as Element)
      ?.textContent;
    if (command !== null) {
      navigator.clipboard.writeText(command);
      toast.success("Command Copied to Clipboard");
    }
  };
  //Gsap animation
  let timeline = gsap.timeline({ paused: true });
  let commandRef1 = useRef(null);
  let commandRef2 = useRef(null);
  let commandRef3 = useRef(null);
  let commandInput = useRef(null);
  //Command 1 animation
  useEffect(() => {
    timeline.from(commandRef1.current, {
      duration: 0.3,
      opacity: 0,
      y: -50,
      ease: "Power3.easeOut",
    });
    //Command 2 animation
    timeline.from(commandRef2.current, {
      duration: 0.3,
      opacity: 0,
      x: 100,
      ease: "Power3.easeOut",
    });
    //Command 3 animation
    timeline.from(commandRef3.current, {
      duration: 0.3,
      opacity: 0,
      y: 200,
      ease: "Power3.easeOut",
    });
    //Command input filed animation
    timeline.from(commandInput.current, {
      duration: 0.3,
      opacity: 0,
      x: -500,
      skewX: -50,
      scale: 0.1,
      ease: "Power3.easeOut",
    });
    timeline.play();
    return () => {
      timeline.paused();
    };
  }, []);

  return (
    <div className="min_full_screen mx-auto px-4 md:flex py-2 md:py-8 gap-4 text-white ">
      <div className="w-full md:w-8/12 flex-1 gap-4 flex flex-col">
        <div className="container_output flex-1 flex flex-col">
          <h1 className="text-2xl md:text-4xl font-bold py-4 font-shantell">
            JavaScript Playground
          </h1>
          <div
            className="bg-secondary flex-1 rounded-lg shadow-lg flex border-2 border-primary"
            id="instruction_output"
          >
            <Frame
              initialContent={`<!DOCTYPE html><html><head></head><body><div id="mountHere"></div><script id="my-script">${code}</script></body></html>`}
              className="overflow-hidden flex-1 rounded-lg shadow-lg"
            >
              <></>
            </Frame>
          </div>
        </div>
        <div ref={commandInput} className="container_input">
          <div className="flex shadow-lg bg-secondary p-4 rounded-lg gap-2 items-center">
            <div className="flex-1">
              <input
                type="text"
                className="w-full p-2 outline-none bg-transparent"
                placeholder="Provide instruction"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="bg-accent rounded shadow-md px-10 py-2 font-semibold text-white"
              onClick={instructionHandler}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <aside className="w-full md:w-4/12 mt-5 md:mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold font-shantell">
          Commands
        </h2>
        {/* Command 1 */}
        <code
          ref={commandRef1}
          className="text-[#F25B78] bg-secondary py-1 px-3 rounded-md flex gap-2 items-center justify-between mb-2 border-l-4 border-accent mt-5"
        >
          Make a snowstorm on a black background
          <FaRegClone onClick={copyToClipboard} className="cursor-pointer" />
        </code>
        {/* Command 2 */}
        <code
          ref={commandRef2}
          className="text-[#F25B78] bg-secondary py-1 px-3 rounded-md flex gap-2 items-center justify-between mb-2 border-l-4 border-accent"
        >
          Create a word guessing game
          <FaRegClone onClick={copyToClipboard} className="cursor-pointer" />
        </code>
        {/* Command 3 */}
        <code
          ref={commandRef3}
          className="text-[#F25B78] bg-secondary py-1 px-3 rounded-md flex gap-2 items-center justify-between mb-2 border-l-4 border-accent"
        >
          Make a ping pong ball on a black background and move
          <FaRegClone
            onClick={copyToClipboard}
            className="w-5 h-5 cursor-pointer"
          />
        </code>
      </aside>
    </div>
  );
};

export default Codex;
