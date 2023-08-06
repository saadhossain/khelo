import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import gamerImg from "../../assets/gamer-icon.png";
import { RootState } from "../../redux/store";
import AllUsers from "./AllUsers";

const RightSidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <aside className="bg-secondary w-[250px] hidden md:block">
      <div className="sticky top-0 ">
        {/* User Details */}
        <div className="text-white flex flex-col justify-center items-center py-5">
          <Link to='/editprofile'>
            <img
              src={user ? user.picture : gamerImg}
              alt="Profile"
              title='Dashboard'
              className="border-2 border-accent w-16 h-16 rounded-full"
            />
          </Link>
          <h3 className="font-semibold">{user ? user.name : "Laail Gamer"}</h3>
        </div>
        {/* All Users section */}
        <AllUsers />
      </div>
    </aside>
  );
};

export default RightSidebar;
