import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { IoMdShareAlt } from "react-icons/io";
import { MdOutlineModeComment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  usePostUserDislikesMutation,
  usePostUserLikesMutation,
} from "../../redux/api/userApi";
import { countUserLikes, removeUserLikes } from "../../redux/slices/gameSlice";
import { RootState } from "../../redux/store";
import { GamesDataType } from '../../types';
import { handleComment } from "../../utils/utils";

//Define type of share options
interface InteractionsProps {
  game: GamesDataType;
  expandSocial: boolean;
  setExpandSocial: React.Dispatch<React.SetStateAction<boolean>>
}

const GamesInteractions = ({ game, expandSocial, setExpandSocial }: InteractionsProps) => {
  const navigate = useNavigate();
  const [postUserLikes] = usePostUserLikesMutation();
  const [postUserDislikes] = usePostUserDislikesMutation();
  const dispatch = useDispatch();
  //Toggle Comment field
  const [expandComment, setExpandComment] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      <div className="flex gap-6 items-center text-white">
        <div className="flex gap-2 items-center">
          {user && (
            <>
              {game?.isLiked ? (
                <AiFillHeart
                  onClick={() => {
                    dispatch(removeUserLikes(game.id));
                    postUserDislikes(game.id);
                  }}
                  className={`cursor-pointer w-6 h-6 hover:text-white duration-300 ease-in-out text-[#EE2844] `}
                />
              ) : (
                <AiFillHeart
                  onClick={() => {
                    dispatch(countUserLikes(game.id));
                    postUserLikes(game);
                  }}
                  className={`cursor-pointer w-6 h-6 hover:text-[#EE2844] duration-300 ease-in-out text-white`}
                />
              )}
            </>
          )}

          {/* Interaction Count */}
          <p>{game?.likes} Loves</p>
        </div>
        <div className="flex gap-2 items-center">
          <MdOutlineModeComment
            onClick={() => setExpandComment(!expandComment)}
            className="cursor-pointer w-6 h-6"
          />
          <p>720 Comments</p>
        </div>
        <div className="flex gap-2 items-center">
          <IoMdShareAlt
            onClick={() => setExpandSocial(!expandSocial)}
            className="cursor-pointer w-6 h-6"
          />
          <p>{game?.shares} Shares</p>
        </div>
      </div>
      {expandComment && user && (
        <form
          onSubmit={(e) =>
            handleComment(e, game.id, user, setExpandComment)
          }
          className="flex justify-between mx-3 text-white"
        >
          <input
            type="text"
            name="comment"
            className="w-10/12 bg-primary py-1 px-2 rounded-l focus:outline-none"
          />
          <button type="submit" className="w-2/12 bg-accent py-1 rounded-r">
            Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default GamesInteractions;
