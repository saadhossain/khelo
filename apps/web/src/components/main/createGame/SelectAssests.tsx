import { FaBaseballBall } from 'react-icons/fa';
import { GiBrickWall } from 'react-icons/gi';
import { HiClipboardList } from 'react-icons/hi';

const SelectAssests = () => {
    return (
        <div className='px-5'>
            <h1 className='text-2xl font-semibold text-white'>Assests</h1>
            <hr className='border border-accent' />
            {/* Bricks */}
            <div className='flex gap-2 items-center text-white mt-2'>
                <GiBrickWall className='w-8 h-8 border-2 border-accent p-1 rounded hover:bg-accent cursor-pointer duration-300 ease-in-out' />
                <p>Bricks</p>
            </div>
            {/* Change ball */}
            <div className='flex gap-2 items-center text-white mt-2'>
                <FaBaseballBall className='w-8 h-8 border-2 border-accent p-1 rounded hover:bg-accent cursor-pointer duration-300 ease-in-out' />
                <p>Ball</p>
            </div>
            {/* Core Features */}
            <div className='flex gap-2 items-center text-white mt-2'>
                <HiClipboardList className='w-8 h-8 border-2 border-accent p-1 rounded hover:bg-accent cursor-pointer duration-300 ease-in-out' />
                <p>Core</p>
            </div>
        </div>
    );
};

export default SelectAssests;