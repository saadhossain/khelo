import { useSelector } from "react-redux";
import { useGetUserGamesQuery } from '../../../redux/api/userApi';
import Loading from '../../Loader/Loading';
import { RootState } from '../../../redux/store';
import { GamesDataType } from '../../../types';
import DisplaySingleGameForUser from '../../common/DisplaySingleGameForUser';

const MyGames = () => {
  const { isLoading } = useGetUserGamesQuery(null);
  const userGames = useSelector((state: RootState) =>
    state.game.userDefaultGames.filter((item) => item.category !== "default")
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-5">
      <h1 className="ml-5 md:ml-0 text-lg md:text-2xl font-semibold text-accent">
        My Games
      </h1>
      {userGames?.length > 0 ? (
        <div className="w-11/12 md:w-full mx-auto grid grid-cols-1 gap-4  py-4">
          {userGames.map((game: GamesDataType) => (
            <DisplaySingleGameForUser game={game} key={game.id} />
          ))}
        </div>
      ) : (
        <h1 className="ml-5 md:ml-0 text-xl md:text-3xl font-semibold text-white  text-center top-5 md:top-20">
          No Games Found
        </h1>
      )}
    </div>
  );
};

export default MyGames;
