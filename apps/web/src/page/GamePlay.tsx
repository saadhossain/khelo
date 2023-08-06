import { useEffect, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loader/Loading";
import GameShareOptions from "../components/common/GameShareOptions";
import GamesInteractions from "../components/common/GamesInteractions";
import { useGetGameQuery } from "../redux/api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { GamesDataType } from '../types';

const GamePlay = () => {
  const param = useParams() as { id: string };
  const game = useSelector((state: RootState) =>
    state.game.userDefaultGames.find((item) => item.id === param.id)
  ) as GamesDataType
  const { isLoading } = useGetGameQuery(param.id);
  //Toggle Share options
  const [expandSocial, setExpandSocial] = useState(false);
  //Get and show data from iframe
  const handleMessage = (event: MessageEvent) => {
    if (event.data.message) {
      console.log(event.data.message);
    }
  };
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  //Loading spinner
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="w-full flex justify-center py-2 relative">
        <GamesInteractions
          game={game}
          expandSocial={expandSocial}
          setExpandSocial={setExpandSocial}
        />
        {expandSocial && (
          <GameShareOptions game={game} setExpandSocial={setExpandSocial} />
        )}
        <button
          onClick={goBack}
          className="absolute right-1 flex items-center gap-1 text-white"
        >
          <TiArrowBack className="w-6 h-6" />
          Back
        </button>
      </div>
      {game && (
        <iframe
          src={`${game?.gameUrl}`}
          title="l"
          className="min-h-screen w-full"
        ></iframe>
      )}
    </div>
  );
};

export default GamePlay;
