import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import gamifyWhite from "../assets/gamify-white.png";
import { auth } from "../config/firebase.config";
import { login } from "../redux/slices/authSlice";
import { API } from "../config/config";

const Login = () => {
  const facebookProvider = new FacebookAuthProvider();
  const googleProvider = new GoogleAuthProvider();
  //Use locaion from react router hook
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const loginHandler = async (provider: any) => {
    try {
      const { user }: any = await signInWithPopup(auth, provider);
      localStorage.setItem("gamifyToken", `Bearer ${user.accessToken}`);
      const res = await fetch(`${API}/user/register`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
      });
      const data = await res.json();
      navigate(from, { replace: true });
    } catch (error) {
      console.dir(error);
    }
  };

  //Gsap animations
  let timeline = gsap.timeline({ paused: true });
  let googleRef = useRef(null);
  let facebookRef = useRef(null);

  useEffect(() => {
    timeline.fromTo(
      googleRef.current,
      {
        duration: 0.5,
        opacity: 0,
        x: 100,
        stagger: {
          amount: 0.4,
        },
        ease: "Power3.easeOut",
      },
      { opacity: 1, x: 0 }
    );
    timeline.fromTo(
      facebookRef.current,
      {
        duration: 0.5,
        opacity: 0,
        x: -100,
        stagger: {
          amount: 0.4,
        },
        ease: "Power3.easeOut",
      },
      { opacity: 1, x: 0 },
      "-=0.4"
    );

    timeline.play();
    return () => {
      timeline.pause();
    };
    //eslint-disable-next-line
  }, []);
  return (
    <div className="min-h-screen flex gap-4 justify-center items-center">
      <div className="bg-secondary w-11/12 md:w-96 h-72 rounded-lg flex flex-col items-center justify-center gap-5 border-2 border-accent">
        <img src={gamifyWhite} alt="Gamify" className="h-10" />
        <h1 className="text-lg font-semibold font-shantell text-white">
          Please login to Explore,
        </h1>
        <div ref={googleRef}>
          <button
            className="w-full btn bg-accent hover:bg-primary duration-500 ease-in-out border-none flex gap-2 items-center"
            onClick={() => loginHandler(googleProvider)}
          >
            <FaGoogle className="w-6 h-6" />
            Sign with Google
          </button>
        </div>
        <div ref={facebookRef}>
          <button
            className="w-full btn bg-accent hover:bg-primary duration-500 ease-in-out border-none flex gap-2 items-center"
            onClick={() => loginHandler(facebookProvider)}
          >
            <FaFacebookF className="w-6 h-6" />
            Sign with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
