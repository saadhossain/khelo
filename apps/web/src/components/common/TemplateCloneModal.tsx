import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API } from "../../config/config";
import { addUserNewGame } from "../../redux/slices/gameSlice";
import { setGameName } from "../../redux/slices/templateSlice";
import { RootState } from "../../redux/store";
import Processing from "../Loader/Processing";

const TemplateCloneModal = () => {
  const dispatch = useDispatch();
  const [sseId, setSseId] = useState();
  const user = useSelector((state: RootState) => state.auth.user);
  const { templateName, template } = useSelector(
    (state: RootState) => state.template
  );
  const [showModal, setShowModal] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);
  //Declare a loading state
  const [loading, setLoading] = useState(false);
  const handleGameClone = async () => {
    //Clear the input field after clicking genarate button
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    setLoading(true);
    const token = localStorage.getItem("gamifyToken");
    if (token) {
      const res = await fetch(`${API}/generate/clone`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          game_name: template.name,
          template_name: templateName,
          game: template,
        }),
      });
      const { data } = await res.json();
      setSseId(data.id);
    }
  };

  useEffect(() => {
    if (sseId) {
      const sse = new EventSource(`${API}/generate/status/clone/${sseId}`);
      function getRealtimeData(data: any) {
        console.log(data.status);
        if (data.status.status === "completed") {
          const newGame = data.status.data;

          dispatch(
            addUserNewGame({
              ...newGame,
            })
          );
          toast.success(`${template.game_name} Game Successfully clonned...`);
          setLoading(false);
          setShowModal(false);
          sse.close();
          setTimeout(() => {
            setShowModal(true);
          }, 500);
        }
      }
      sse.onmessage = (e) => getRealtimeData(JSON.parse(e.data));
      sse.onerror = () => {
        sse.close();
      };
      return () => {
        sse.close();
      };
    }
  }, [sseId]);
  return (
    <div>
      {/* Game Clone Modal */}
      {showModal && (
        <>
          <input
            type="checkbox"
            id="gameTemplateModal"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box relative bg-primary">
              <label
                htmlFor="gameTemplateModal"
                className="btn btn-sm btn-circle absolute right-2 top-2 bg-accent hover:bg-accent"
              >
                ✕
              </label>
              {!user ? (
                <div className="text-white text-center">
                  <h1 className="text-lg md:text-2xl font-semibold">
                    Please login First
                  </h1>
                  <h3 className="text-lg mb-2">Before clonning a Game...</h3>
                  <Link
                    to="/login"
                    className="py-2 px-5 rounded bg-accent text-white font-semibold"
                  >
                    Login
                  </Link>
                </div>
              ) : (
                <div>
                  {!loading ? (
                    <>
                      <h3 className="text-lg font-bold text-white">
                        Clone this Game
                      </h3>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter a Name..."
                          className="input border-secondary w-full"
                          ref={inputRef}
                          onChange={(e) =>
                            dispatch(setGameName(e.target.value))
                          }
                        />
                        <div className="modal-action">
                          <label
                            htmlFor="gameTemplateModal"
                            className="bg-accent border-none rounded-r py-3 text-white font-semibold px-5 hover:bg-secondary duration-300 ease-in-out absolute top-0 right-0 cursor-pointer"
                            onClick={handleGameClone}
                          >
                            Clone
                          </label>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Processing
                      title={"Game Clonning"}
                      height={"0px"}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TemplateCloneModal;
