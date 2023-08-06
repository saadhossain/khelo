import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { AiFillDollarCircle, AiFillStar, AiFillTrophy, AiOutlinePlayCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../components/Loader/Loading';
import GameShareOptions from '../../components/common/GameShareOptions';
import GamesInteractions from '../../components/common/GamesInteractions';
import { useGetGameQuery, usePostUserPlaysMutation } from '../../redux/api/userApi';
import { countUserPlay } from '../../redux/slices/gameSlice';
import { RootState } from '../../redux/store';
import { GamesDataType } from '../../types';

const SingleGame = () => {
    const param = useParams() as { id: string };
    const singleGame = useSelector((state: RootState) =>
        state.game.userDefaultGames.find((item) => item.id === param.id)
    ) as GamesDataType
    const { isLoading } = useGetGameQuery(param.id);
    const [postUserPlays] = usePostUserPlaysMutation();
    //Toggle Share options
    const [expandSocial, setExpandSocial] = useState(false);
    const dispatch = useDispatch();
    const gamePlayHandler = (game: GamesDataType) => {
        dispatch(countUserPlay(game.id));
        postUserPlays(game);
    };
    if (isLoading) {
        return <Loading />
    }
    return (
        <div className='my-10 min_full_screen'>
            <h1 className="ml-5 md:ml-0 mb-5 text-xl md:text-3xl font-semibold text-white ">
                Single Game
            </h1>
            <div className="bg-secondary shadow-md rounded-md p-4 md:flex relative">
                {/* Game Details */}
                <div className="w-full md:w-3/5 flex flex-col justify-between mb-5 md:mb-0">
                    {/* Game name and hours played */}
                    <div>
                        <div className="flex gap-2 items-center py-2">
                            <h1 className="text-xl font-semibold text-center text-white uppercase">
                                {singleGame.game_name}
                            </h1>
                            <p className="text-slate-100">
                                <span className="text-accent font-semibold">{singleGame.plays}+</span>{" "}
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
                            onClick={() => gamePlayHandler(singleGame)}
                            to={`/game/play/${singleGame.id}`}
                            className="flex gap-1 items-center py-1 px-2 rounded bg-accent text-white text-center font-semibold"
                        >
                            <AiOutlinePlayCircle className="w-6 h-6" /> Play
                        </Link>
                    </div>
                    {/* User Interactions */}
                    <GamesInteractions
                        game={singleGame}
                        expandSocial={expandSocial}
                        setExpandSocial={setExpandSocial}
                    />
                </div>
                {/* Game Image/Thumbnail */}
                <img
                    src={singleGame.img}
                    loading="lazy"
                    alt="brickout"
                    className="w-64 md:w-2/5 h-44 mx-auto md:h-56 rounded-md"
                />
                {/* Share options */}
                {expandSocial && (
                    <GameShareOptions game={singleGame} setExpandSocial={setExpandSocial} />
                )}
                <Toaster />
            </div>
        </div>
    );
};

export default SingleGame;