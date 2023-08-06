import React, { ReactNode, createContext, useState } from "react";
import DesignLayouts from '../components/main/gameEdit/DesignLayouts';
import DesignOptions from '../components/main/gameEdit/DesignOptions';
interface Props {
  children: ReactNode;
}

export interface GameContextType {
  gameOptions: any;
  setGameOptions: any;
  collapse: any;
  setCollapse: any;
  img: any;
  setImg: any;
  canvasImage1: any;
  canvasImage2: any;
  canvasImage3: any;
  setCanvasImage1: any;
  setCanvasImage2: any;
  setCanvasImage3: any;
  canvasImages: FileList | [];
  toolsOptions: JSX.Element;
  setToolsOptions: React.Dispatch<React.SetStateAction<JSX.Element>>;
  gameEditPreview: string;
  setGameEditPreview: React.Dispatch<React.SetStateAction<string>>;
}

//get the default file
import gamePreview from '../assets/suggested/suggested1.png';

export const DataContext = createContext<GameContextType | null>(null);
const DataProvider: React.FC<Props> = ({ children }) => {
  //Receive the game title from the input
  const [gameOptions, setGameOptions] = useState({
    gameTitle: "",
    gameDescription: "",
    difficultyLevel: "",
    playerCount: "",
    gameSound: true,
    backgroundColor: "",
    levelCount: 5,
    levelDuration: 30,
    gameScore: true,
    gameShare: true,
  });

  //Sidebar collapse state
  const [collapse, setCollapse] = useState(false);
  //Set the image to the state from upload image page
  const [img, setImg] = useState([]);

  //Keep all three images from vanvas in a array
  let canvasImages: FileList | [] = []

  const [canvasImage1, setCanvasImage1] = useState([]);
  const [canvasImage2, setCanvasImage2] = useState([]);
  const [canvasImage3, setCanvasImage3] = useState([]);

  canvasImages.push(canvasImage1[0], canvasImage2[0], canvasImage3[0])

  //Set ToolsOptions
  const [toolsOptions, setToolsOptions] = useState(DesignOptions);

  //Game Edit Preview Image
  const [gameEditPreview, setGameEditPreview] = useState(gamePreview)

  //Send all state and data so that anywhere from the app we can access them
  const dataInfo = {
    gameOptions,
    setGameOptions,
    collapse,
    setCollapse,
    img,
    setImg,
    canvasImage1,
    canvasImage2,
    canvasImage3,
    setCanvasImage1,
    setCanvasImage2,
    setCanvasImage3,
    canvasImages,
    toolsOptions,
    setToolsOptions,
    gameEditPreview,
    setGameEditPreview,
  };
  return (
    <DataContext.Provider value={dataInfo}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
