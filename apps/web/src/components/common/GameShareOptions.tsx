import {
  FaCopy,
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaWhatsapp,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { usePostUserSharesMutation } from "../../redux/api/userApi";
import { countUserShare } from "../../redux/slices/gameSlice";
import { toast } from "react-hot-toast";
import { GamesDataType } from '../../types';

//Define type of share options
interface ShareProps{
  game: GamesDataType;
  setExpandSocial: React.Dispatch<React.SetStateAction<boolean>>
}

const GameShareOptions = ({ game, setExpandSocial }: ShareProps) => {
  const [postUserShares] = usePostUserSharesMutation();
  //Game URL to Share
  const dispatch = useDispatch();
  const shareUrl = `${window.location}game/play/${game.id}`;

  const gameShareHandler = (link?: string) => {
    if (link) {
      window.open(
        `${link}=${shareUrl}`,
        "popup",
        "width=500,height=300, left=500, top=100"
      );
    }
    postUserShares(game);
    dispatch(countUserShare(game.id));
    setExpandSocial(false);
    if (!link) {
      toast.success("Game Link copied and ready for sharing...");
    }
  };
  return (
    <div className="bg-primary p-5 rounded z-50 flex gap-3 text-white absolute top-[55%] right-[45%]">
      <FaFacebookSquare
        onClick={() =>
          gameShareHandler("https://www.facebook.com/sharer/sharer.php?u")
        }
        className="cursor-pointer w-6 h-6"
      />
      <FaTwitterSquare
        onClick={() => gameShareHandler("https://twitter.com/share?url")}
        className="cursor-pointer w-6 h-6"
      />
      <FaInstagram className="cursor-pointer w-6 h-6" />
      <FaWhatsapp
        onClick={() => gameShareHandler("https://web.whatsapp.com/send?text")}
        className="cursor-pointer w-6 h-6"
      />
      <FaCopy
        onClick={() => gameShareHandler()}
        className="cursor-pointer w-6 h-6"
      />
    </div>
  );
};

export default GameShareOptions;
