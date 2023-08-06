import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import LeftSidebar from "../components/leftSidebar/LeftSidebar";
import RightSidebar from "../components/rightSidebar/RightSidebar";
import EditingTools from '../components/leftSidebar/EditingTools';
import Header from '../components/Header/Header';
import GameEdit from '../page/GameEdit';

const Main = () => {
  const location = useLocation();
  const hideSideBar = location.pathname === '/upload' || location.pathname.includes('play')

  const gameEditPage = location.pathname.includes('editor')
  return (
    <div className="md:flex gap-5 min-h-screen w-full md:w-[1440] mx-auto">
      {/* <LeftSidebar/> */}
      {/* {
        gameEdit ? <EditingTools/> : <LeftSidebar/>
      } */}
      {gameEditPage ? null : <LeftSidebar/>}
      <div className="flex-1 w-full md:w-[990px] min-h-screen mr-5">
        <Outlet />
      </div>
      {/* {hideSideBar ? null : <RightSidebar />} */}
    </div>
  );
};

export default Main;
