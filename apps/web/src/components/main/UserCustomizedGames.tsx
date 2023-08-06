import { useSelector } from "react-redux";
import { useGetUserGamesQuery } from "../../redux/api/userApi";
import DisplaySingleGameForUser from "../common/DisplaySingleGameForUser";
import Loading from "../Loader/Loading";
import { RootState } from "../../redux/store";
import { GamesDataType } from '../../types';
const UserCustomizedGames = () => {
  const { isLoading } = useGetUserGamesQuery(null);
  const userGames = useSelector((state: RootState) =>
    state.game.userDefaultGames.filter((item) => item.category !== "default")
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      {userGames?.length > 0 && (
        <div>
          <h1 className="ml-5 md:ml-0 text-xl md:text-3xl font-semibold text-white font-shantell">
            Customized Games
          </h1>
          <div className="w-11/12 md:w-full mx-auto grid grid-cols-1 gap-4  py-4">
            {userGames.map((game: GamesDataType) => (
              <DisplaySingleGameForUser game={game} key={game.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCustomizedGames;
