import { useSelector } from "react-redux";
import { useGetUserDefaultGameListQuery } from "../../redux/api/userApi";
import { RootState } from "../../redux/store";
import { GamesDataType } from "../../types";
import Loading from "../Loader/Loading";
import DisplaySingleGameForUser from "../common/DisplaySingleGameForUser";
import TemplateCloneModal from "../common/TemplateCloneModal";

const UserDefaultGames = () => {
  const { isLoading } = useGetUserDefaultGameListQuery(null);
  const userDefaultGames = useSelector((state: RootState) =>
    state.game.userDefaultGames.filter((item) => item.category === "default")
  );
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="my-5">
      <h2 className="ml-5 md:ml-0 text-xl md:text-3xl font-semibold text-white ">
        Featured Games
      </h2>
      <div className="w-11/12 md:w-full mx-auto grid grid-cols-1 gap-4 py-4">
        {userDefaultGames?.map((game: GamesDataType) => (
          <DisplaySingleGameForUser game={game} key={game.id} />
        ))}
      </div>
      <TemplateCloneModal />
    </div>
  );
};

export default UserDefaultGames;
