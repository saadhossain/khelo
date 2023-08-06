import { BsFillChatLeftFill } from "react-icons/bs";
import player1 from "../../assets/players/player-1.png";
import player2 from "../../assets/players/player-2.png";
import player3 from "../../assets/players/player-3.png";
import player4 from "../../assets/players/player-4.png";

const AllUsers = () => {
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <p className="text-white font-semibold">New Members</p>
        <p className="text-gray-300">See all</p>
      </div>
      {/* User Cards */}
      <div className="flex justify-between items-center bg-primary p-2 rounded text-white mt-2 border-l-4 border-accent">
        <div className="flex gap-2">
          <img src={player4} alt="player" className="w-10" />
          <div>
            <p className="font-semibold">Analina Rone</p>
            <p className="text-gray-500">5 mins ago</p>
          </div>
        </div>
        <BsFillChatLeftFill />
      </div>
      <div className="flex justify-between items-center bg-primary p-2 rounded text-white mt-2 border-l-4 border-accent">
        <div className="flex gap-2">
          <img src={player1} alt="player" className="w-10" />
          <div>
            <p className="font-semibold">Gorge Brown</p>
            <p className="text-gray-500">26 mins ago</p>
          </div>
        </div>
        <BsFillChatLeftFill />
      </div>
      <div className="flex justify-between items-center bg-primary p-2 rounded text-white mt-2 border-l-4 border-accent">
        <div className="flex gap-2">
          <img src={player2} alt="player" className="w-10" />
          <div>
            <p className="font-semibold">Hardik Dey</p>
            <p className="text-gray-500">32 mins ago</p>
          </div>
        </div>
        <BsFillChatLeftFill />
      </div>
      <div className="flex justify-between items-center bg-primary p-2 rounded text-white mt-2 border-l-4 border-accent">
        <div className="flex gap-2">
          <img src={player3} alt="player" className="w-10" />
          <div>
            <p className="font-semibold">Gautam Babu</p>
            <p className="text-gray-500">45 mins ago</p>
          </div>
        </div>
        <BsFillChatLeftFill />
      </div>
    </div>
  );
};

export default AllUsers;
