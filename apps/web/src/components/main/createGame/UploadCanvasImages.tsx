import gsap from "gsap";
import { useContext, useRef, useEffect } from "react";
import { DataContext, GameContextType } from '../../../Context/DataProvider';
import CanvasImageInput from '../../common/CanvasImageInput';

//Define the of the upload image
interface GameFileProp {
    genarateGame: () => Promise<void>;
    error: string | null;
    loading: boolean
}

const UploadCanvasImages = ({ genarateGame, error }: GameFileProp) => {
    //Get important states from the context
    const { gameOptions, setGameOptions, canvasImage1, canvasImage2, canvasImage3, setCanvasImage1, setCanvasImage2, setCanvasImage3 } = useContext(DataContext) as GameContextType;
    //Use ref for the handling file input on browse button
    const inputRef1 = useRef<HTMLInputElement>();
    const inputRef2 = useRef<HTMLInputElement>();
    const inputRef3 = useRef<HTMLInputElement>();
    const setGameDescription = (description: string) => {
        setGameOptions({
            ...gameOptions,
            gameDescription: description,
        });
    };
    //Gsap animations
    const timeline = gsap.timeline({ paused: true });
    let inputRef = useRef(null);
    let instructionsRef = useRef(null);
    useEffect(() => {
        timeline.from(inputRef.current, {
            opacity: 0,
            duration: 0.6,
            y: 100,
            ease: 'Power3.easeInOut',
        });
        timeline.play();
        return () => {
            timeline.paused();
        };
        //eslint-disable-next-line
    }, []);
    useEffect(() => {
        timeline.from(instructionsRef.current, {
            opacity: 0,
            duration: 0.6,
            y: -120,
            scaleY:0.6,
            ease: 'Power3.easeInOut',
        });
        timeline.play();
        return () => {
            timeline.paused();
        };
        //eslint-disable-next-line
    }, []);
    return (
        <>
            {/* File upload box */}
            <div
            ref={inputRef}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:mt-12'>
                {/* input field 1 */}
                <CanvasImageInput
                    inputRef={inputRef1}
                    canvasImage={canvasImage1[0]}
                    setCanvasImage={setCanvasImage1}
                    imageIndex={0}
                />
                {/* input field 2 */}
                <CanvasImageInput
                    inputRef={inputRef2}
                    canvasImage={canvasImage2[0]}
                    setCanvasImage={setCanvasImage2}
                    imageIndex={1}
                />
                {/* input field 3 */}
                <CanvasImageInput
                    inputRef={inputRef3}
                    canvasImage={canvasImage3[0]}
                    setCanvasImage={setCanvasImage3}
                    imageIndex={2}
                />
            </div>
            {/* Instructions Text Area */}
            <div
            ref={instructionsRef}
            className="flex shadow-lg bg-secondary rounded-lg gap-2 p-2 items-center mx-3 mt-10 md:mt-30 lg:mt-52">
                    <input
                        type="text"
                        className="w-full p-3 outline-none bg-transparent text-gray-100"
                        placeholder="Describe your game..."
                        onChange={(e)=> setGameDescription(e.target.value)}
                    />
                <button
                    type="button"
                    className="bg-accent rounded shadow-md px-10 py-2 font-semibold text-white"
                    onClick={() => genarateGame()}
                >
                    Genarate
                </button>
                <p className="font-poppins mt-2 text-red-600">{error && error}</p>
            </div>
            {/* Error Message */}
        </>
    );
};

export default UploadCanvasImages;
