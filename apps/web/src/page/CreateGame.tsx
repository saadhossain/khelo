import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { DataContext, GameContextType } from "../Context/DataProvider";
import Processing from "../components/Loader/Processing";
import CustomizationOptions from '../components/main/createGame/CustomizationOptions';
import ImagePreview from "../components/main/createGame/ImagePreview";
import SelectAssests from '../components/main/createGame/SelectAssests';
import UploadGameFile from '../components/main/createGame/UploadGameFile';
import UploadedImages from '../components/main/gameEdit/UploadedImages';
import { API } from "../config/config";
import { addUserNewGame } from "../redux/slices/gameSlice";
import { addUploadGame } from "../redux/slices/uploadGameSlice";
import { RootState } from "../redux/store";
import {
  uploadFiletoFirebase
} from "../utils/utils";

const CreateGame = () => {
  //Get the necessary States from the Context
  const { gameOptions, setGameOptions, img } = useContext(
    DataContext
  ) as GameContextType;
  const uploadGame = useSelector((state: RootState) => state.uploadGame.game);
  const [error, setError] = useState<string | null>(null);
  const [sseId, setSseId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  //Declare a loading state
  const [loading, setLoading] = useState(false);
  const userToken = localStorage.getItem("gamifyToken");
  //Functional logic to upload image
  const uploadImg = async () => {
    setLoading(true);
    if (!img || !gameOptions.gameTitle) {
      setError("Game Image and title is Required");
      setLoading(false);
    }
    //Genarate a New Game...
    try {
      const imgUrl = await uploadFiletoFirebase("images", img);
      if (userToken && imgUrl) {
        const res = await fetch(`${API}/generate/process`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: userToken,
          },
          body: JSON.stringify({
            imageURL: imgUrl,
            title: gameOptions.gameTitle,
          }),
        });

        if (!res.ok) {
          console.log('Response not Ok Error text :', await res.text())
          console.log('Response not Ok Error json :', await res.json())
        }
        const { data } = await res.json();
        setSseId(data.id);
      }
    } catch (error: any) {
      setError(error.message);
      console.log(error)
    }
  };
  useEffect(() => {
    if (sseId) {
      const sse = new EventSource(`${API}/generate/status/process/${sseId}`);
      function getRealtimeData(data: any) {
        console.log(data.status);
        if (data.status?.status === "completed") {
          console.log(data.status);
          const genaratedGame = data.status.data;
          dispatch(addUserNewGame({ ...genaratedGame }));
          dispatch(addUploadGame(genaratedGame));
          setGameOptions({ ...gameOptions, gameTitle: null });
          setLoading(false);
          sse.close();
        }
      }
      //Redirect to edit page after genarating the game...
      // window.location.href = '/edit'
      // navigate('/edit')
      sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
      sse.onerror = () => {
        sse.close();
      };
      return () => {
        sse.close();
      };
    }
  }, [sseId]);
  //Prevent Page reload or refresh
  // if (loading) {
  //   window.addEventListener("beforeunload", function (e) {
  //     const attemptRefresh = performance.navigation.type === 1;
  //     if (attemptRefresh) {
  //       const confirmation = window.confirm(
  //         "Are you sure to cancel the Game Genarating?"
  //       );
  //       if (confirmation) {
  //         // do nothing and let the page reload
  //       } else {
  //         // cancel the page reload
  //         e.preventDefault();
  //         e.returnValue = "";
  //       }
  //     }
  //   });
  // }
  return (
    // Updated layout
    <div className="min_full_screen mx-auto my-10">
      {/* Details sections */}
      <h2 className="text-xl md:text-2xl font-semibold text-white text-center mb-10">
        Create Your Own Game
      </h2>
      {/* Main Content section */}
      {loading ? (
        <Processing
          title={"Game Genarating"}
          height={"300px"}
        />
      ) : (
        <div>
          {uploadGame ? (
            <div className="flex flex-col items-center justify-center">
              <div className="flex gap-5">
                <SelectAssests />
                <ImagePreview />
                <CustomizationOptions />
              </div>
              <UploadedImages />
            </div>
          ) : (
            // Hide the Upload input/box when image uploaded
            <UploadGameFile
              uploadImg={uploadImg}
              loading={loading}
              error={error}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CreateGame;
