import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Canvas from '../page/Canvas';
import Codex from "../page/Codex";
import CreateGame from '../page/CreateGame';
import GamePlay from "../page/GamePlay";
import Games from "../page/Games";
import Login from "../page/Login";
import Dashboard from "../page/dashboard/Dashboard";
import EditProfile from '../page/dashboard/EditProfile';
import MyActivity from '../page/dashboard/MyActivity';
import MyProfile from "../page/dashboard/MyProfile";
import SingleGame from '../page/dashboard/SingleGame';
import Editor from '../page/editor/Editor';
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Games />,
      },
      {
        path: "/codex",
        element: <Codex />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/game/:id",
        element: <SingleGame />,
      },
      {
        path: "/game/play/:id",
        element: <GamePlay />,
      },

      //Upload Image Page
      {
        path: "/create-game",
        element: (
          <PrivateRoute>
            <CreateGame />
          </PrivateRoute>
        ),
      },
      //Canvas Page for uploading multiple Image
      {
        path: "/canvas",
        element: (
          <PrivateRoute>
            <Canvas />
          </PrivateRoute>
        ),
      },
      {
        path: "/editor/:id",
        element: (
          <PrivateRoute>
            <Editor />
          </PrivateRoute>
        ),
      },
      {
        path: "/editor",
        element: (
          <Editor />
        ),
      },
      //Dashboard pages
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      //Profile edit page
      {
        path: "/editprofile",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: '/activity',
        element: <PrivateRoute><MyActivity /></PrivateRoute>
      }

    ],
  },
]);
