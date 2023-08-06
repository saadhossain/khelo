import gsap from 'gsap';
import { useEffect } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { FaCopy, FaShare } from 'react-icons/fa';
import { IoLogoGameControllerA } from 'react-icons/io';
import { MdRebaseEdit } from 'react-icons/md';

const Dashboard = () => {
    let timeline = gsap.timeline({ paused: true })
    useEffect(() => {
        timeline.from('.topRef', {
            opacity: 0,
            duration: 0.5,
            y: -100,
            stagger: {
                amount: 0.1
            },
            ease: "Power3.easeOut"
        })
        timeline.from('.bottomRef', {
            opacity: 0,
            duration: 0.5,
            y: 100,
            stagger: {
                amount: 0.1
            },
            ease: "Power3.easeOut"
        })

        timeline.play()
        return () => {
            timeline.paused()
        }
    }, [])
    return (
        <div className='min_full_screen mx-auto'>
            <h1 className='py-5 text-2xl font-semibold text-white'>User Dashboard</h1>
            <div className='w-11/12 md:w-full grid grid-cols-2 md:grid-cols-3 gap-5 mx-auto text-white mb-5'>
                {/* Stats One */}
                <div className='topRef w-full md:w-56 rounded-lg bg-secondary p-8'>
                    <div className='flex gap-2 items-center text-white'>
                        <IoLogoGameControllerA className='w-10 h-10' />
                        | <h2 className='text-2xl font-bold'>Games</h2>
                    </div>
                    <h3>Playing Time</h3>
                    <p>350+ Hours</p>
                </div>
                {/* Stats two */}
                <div className='topRef w-full md:w-56 rounded-lg bg-secondary p-8'>
                    <div className='flex gap-2 items-center text-white'>
                        <FaCopy className='w-6 h-6' />
                        | <h2 className='text-2xl font-bold'>Games</h2>
                    </div>
                    <h3>Cloned Game</h3>
                    <p>12 Games</p>
                </div>
                {/* Stats three */}
                <div className='topRef w-full md:w-56 rounded-lg bg-secondary p-8'>
                    <div className='flex gap-2 items-center text-white'>
                        <MdRebaseEdit className='w-6 h-6' />
                        | <h2 className='text-2xl font-bold'>Games</h2>
                    </div>
                    <h3>Customized Games</h3>
                    <p>9 Games</p>
                </div>
                {/* Stats four */}
                <div className='bottomRef w-full md:w-56 rounded-lg bg-secondary p-8'>
                    <div className='flex gap-2 items-center text-white'>
                        <AiFillHeart className='w-6 h-6' />
                        | <h2 className='text-2xl font-bold'>Games</h2>
                    </div>
                    <h3>Liked Game</h3>
                    <p>12 Games</p>
                </div>
                {/* Stats five */}
                <div className='bottomRef w-full md:w-56 rounded-lg bg-secondary p-8'>
                    <div className='flex gap-2 items-center text-white'>
                        <FaShare className='w-6 h-6' />
                        | <h2 className='text-2xl font-bold'>Games</h2>
                    </div>
                    <h3>Shared Count</h3>
                    <p> 1.7k Shares</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;