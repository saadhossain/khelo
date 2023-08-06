import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loader/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const PrivateRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return <>{children} </>;
};

export default PrivateRoute;
