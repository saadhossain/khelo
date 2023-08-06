import { useGetDefaultGameListQuery } from "../../redux/api/userApi";
import { GamesDataType } from "../../types";
import Loading from "../Loader/Loading";
import FeaturedGameSingle from "../common/FeaturedGameSingle";
import TemplateCloneModal from "../common/TemplateCloneModal";

const DefaultGames = () => {
  const { data, isLoading } = useGetDefaultGameListQuery(null);
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="my-5">
      <h2 className="ml-5 md:ml-0 text-xl md:text-3xl font-semibold text-white">
        Featured Games
      </h2>
      <div className="w-11/12 md:w-full mx-auto grid grid-cols-1 gap-4 py-4">
        {data?.map((game: GamesDataType) => (
          <FeaturedGameSingle game={game} key={game.id} />
        ))}
      </div>
      <TemplateCloneModal />
    </div>
  );
};

export default DefaultGames;
