import { FiSearch } from 'react-icons/fi';

const GameEditSearch = () => {
    return (
        <div>
            <form className="relative">
                <input type="search" name="Search" placeholder="Search..." className="w-full p-2 text-sm rounded-md focus:outline-none bg-secondary text-white" />
                <span className="absolute inset-y-0 right-2 flex items-center">
                    <button type="button" title="search" className="p-1 focus:outline-none focus:ring">
                        <FiSearch className='w-4 h-4 text-white' />
                    </button>
                </span>
            </form>
        </div>
    );
};

export default GameEditSearch;