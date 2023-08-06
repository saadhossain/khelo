import LikedGames from '../../components/main/myProfile/LikedGames';
import MyGames from '../../components/main/myProfile/MyGames';
import PlayedGames from '../../components/main/myProfile/PlayedGames';
import SharedGames from '../../components/main/myProfile/SharedGames';

const MyProfile = () => {
  return (
    <div className="my-10 min_full_screen">
      <h1 className="ml-5 md:ml-0 text-xl md:text-3xl font-semibold text-white ">
        My Profile
      </h1>
      <MyGames />
      <LikedGames />
      <PlayedGames />
      <SharedGames />
    </div>
  );
};

export default MyProfile;