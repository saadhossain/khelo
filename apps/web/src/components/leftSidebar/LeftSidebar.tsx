import { onAuthStateChanged, signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import {
  AiFillCode,
  AiFillProfile,
  AiOutlineBarChart,
  AiOutlineClose
} from "react-icons/ai";
import {
  FaClipboardList,
  FaGamepad,
  FaPencilAlt,
  FaSignOutAlt,
  FaUserAstronaut,
  FaUserEdit,
} from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { TbLayoutSidebarLeftExpand, TbLayoutSidebarRightExpand } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { DataContext, GameContextType } from "../../Context/DataProvider";
import gamify from "../../assets/gamify-icon.png";
import { auth } from "../../config/firebase.config";
import '../../index.css';
import { login, logout } from "../../redux/slices/authSlice";
import { RootState } from "../../redux/store";
import { GiPaintBrush } from 'react-icons/gi';

const LeftSidebar = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const { collapse, setCollapse } = useContext(DataContext) as GameContextType;
  //Make menu expanded when device width is less than 768px
  useEffect(() => {
    const handleResize =()=> {
      if (window.innerWidth < 768) {
        setCollapse(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  const [expand, setExpand] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        const userData = {
          name: user.displayName,
          picture: user.photoURL,
          user_id: user.uid,
          email: user.email,
          email_verified: user.emailVerified,
        };
        dispatch(login({ user: userData }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch, auth]);

  const logOutHandler = async () => {
    await signOut(auth);
  };
  return (
    <aside
      className={`bg-secondary ${collapse ? "w-20" : "w-full md:w-[200px]"}`}
    >
      <nav className="sticky top-0 z-50">
        <div className='md:min-h-screen flex flex-col justify-between'>
          <div className="flex md:flex-col justify-between items-center py-2 border-b border-slate-200 md:border-none">
            <div className="flex items-center w-full md:border-b border-slate-200 px-5 md:pt-5">
              <Link to="/" className="flex items-center gap-1 pb-2">
                <img src={gamify} alt="Gamify" className="h-8" />
                <h2
                  className={`text-2xl font-bold text-white ${collapse && "hidden"
                    }`}
                >
                  Gamify
                </h2>
              </Link>
            </div>
            <div className={`justify-between items-start gap-2 m-4`}>
              {/* Main Navigations */}
              <ul
                className={`bg-secondary md:bg-transparent items-end md:items-start gap-2 md:gap-5 absolute md:static duration-300 ease-in-out ${expand
                  ? "top-14 right-0 py-5 px-5 w-full mt-1 shadow-lg"
                  : "top-[-600px] right-0 w-full shadow-none"
                  }`}
              >
                {user && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={`flex gap-2 p-2 rounded items-center text-white font-semibold w-full  hover:bg-accent mb-2`}
                    >
                      <AiOutlineBarChart className="h-5 w-5" title='Dashboard' />
                      <span className={`${collapse && "hidden"}`}>Dashboard</span>
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink
                    to="/create-game"
                    className={`flex gap-2 p-2 rounded items-center text-white font-semibold w-full mb-2 hover:bg-accent`}
                  >
                    <MdOutlineAddPhotoAlternate className="h-5 w-5" title='Create Game' />
                    <span className={`${collapse && "hidden"}`}>
                    Create Game
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/canvas"
                    className={`flex gap-2 p-2 rounded items-center text-white font-semibold w-full mb-2 hover:bg-accent`}
                  >
                    <GiPaintBrush className="h-5 w-5" title='Canvas' />
                    <span className={`${collapse && "hidden"}`}>
                      Canvas
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className={`flex gap-2 p-2 rounded items-center text-white font-semibold w-full mb-2 hover:bg-accent`}
                  >
                    <FaGamepad className="h-5 w-5" title='Games' />
                    <span className={`${collapse && "hidden"}`}>Games</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/codex"
                    className={`flex gap-2 p-2 rounded items-center text-white font-semibold w-full mb-2 hover:bg-accent`}
                  >
                    <AiFillCode className="h-5 w-5" title='Codex' />
                    <span className={`${collapse && "hidden"}`}>Codex</span>
                  </NavLink>
                </li>
                {/* Login Logout button */}
                {!user && (
                  <NavLink
                    to="/login"
                    className="flex gap-2 items-center p-2 rounded w-full  hover:bg-accent font-semibold mb-2 text-white"
                  >
                    <FaUserAstronaut className="h-5 w-5" title='Login' />{" "}
                    <span className={`${collapse && "hidden"}`}>Login</span>
                  </NavLink>
                )}
                {/* Logout Button */}
                {user && (
                  <>
                    <li>
                      <NavLink
                        to="/profile"
                        className={`flex gap-2 p-2 rounded items-center text-white font-semibold w-full mb-2 hover:bg-accent`}
                      >
                        <AiFillProfile className="h-5 w-5" title='My Profile' />
                        <span className={`${collapse && "hidden"}`}>
                          My Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/editprofile"
                        className={`flex gap-2 p-2 rounded items-center text-white font-semibold w-full mb-2 hover:bg-accent`}
                      >
                        <FaUserEdit className="h-5 w-5" title='My Profile' />
                        <span className={`${collapse && "hidden"}`}>
                          Edit Profile
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/activity"
                        className={`flex gap-2 p-2 rounded items-center text-white font-semibold w-full mb-2 hover:bg-accent`}
                      >
                        <FaClipboardList className="h-5 w-5" title='My Profile' />
                        <span className={`${collapse && "hidden"}`}>
                          Activities
                        </span>
                      </NavLink>
                    </li>
                    <div
                      onClick={logOutHandler}
                      className="flex gap-2 items-center cursor-pointer p-2 rounded w-full  hover:bg-accent font-semibold  text-white"
                    >
                      <FaSignOutAlt className="h-5 w-5" title='Logout' />
                      <span className={`${collapse && "hidden"}`}>Logout</span>
                    </div>
                  </>
                )}
              </ul>
            </div>
            {/* Responsive menu tigger */}
            <div
              onClick={() => setExpand(!expand)}
              className={`cursor-pointer text-white md:hidden pr-5`}
            >
              {expand ? (
                <AiOutlineClose className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </div>
          </div>
          {/* Collapsible Menu Tigger */}
          <div
            onClick={() => setCollapse(!collapse)}
            className="hidden md:block text-white cursor-pointer mb-5 ml-5"
          >
            {collapse ? (
              <TbLayoutSidebarLeftExpand className="w-6 h-6" title='Expand Menus' />
            ) : (
              <p className='flex gap-2 font-semibold text-white'><TbLayoutSidebarRightExpand className="w-6 h-6" /> Collapse</p>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default LeftSidebar;
