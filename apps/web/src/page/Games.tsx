import { useSelector } from "react-redux";
import Loading from "../components/Loader/Loading";
import DefaultGames from "../components/main/DefaultGames";
import UserCustomizedGames from '../components/main/UserCustomizedGames';
import UserDefaultGames from "../components/main/UserDefaultGames";
import { RootState } from "../redux/store";
import PrivateSection from "../router/PrivateContainer";

const Games = () => {
  const auth = useSelector((state: RootState) => state.auth);
  if (auth.loading) {
    return <Loading />;
  }
  return (
    <div className="min_full_screen mx-auto">
      {!auth.user && <DefaultGames />}
      <PrivateSection>
        <UserDefaultGames />
        <UserCustomizedGames />
      </PrivateSection>
    </div>
  );
};

export default Games;
