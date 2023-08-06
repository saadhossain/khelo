import Loading from "../components/Loader/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const PrivateSection: React.FC<Props> = ({ children }) => {
  const { user, loading } = useSelector((state: RootState) => state.auth);
  if (loading) {
    return <Loading />;
  }
  return <> {user && children} </>;
};

export default PrivateSection;
