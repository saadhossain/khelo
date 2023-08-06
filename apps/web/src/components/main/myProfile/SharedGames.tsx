import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { GamesDataType } from '../../../types';
import DisplaySingleGameForUser from '../../common/DisplaySingleGameForUser';

const SharedGames = () => {
  //Find if logged in user Played
  const sharedGames = useSelector((state: RootState) =>
    state.game.userDefaultGames.filter((item) => item.isShared === true))
  return (
    <div className="mt-5">
      {sharedGames.length > 0 && (
        <>
          <h1 className="ml-5 md:ml-0 text-lg md:text-2xl font-semibold text-accent">
            Shared Games
          </h1>
          <div className="w-11/12 md:w-full mx-auto grid grid-cols-1 gap-4  py-4">
            {sharedGames.map((game: GamesDataType) => (
              <DisplaySingleGameForUser game={game} key={game.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SharedGames;
