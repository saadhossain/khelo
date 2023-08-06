import { useState } from 'react';
import DesignLayouts from './DesignLayouts';
import DesignStyles from './DesignStyles';

const DesignElements = () => {
    const [toggleElements, setToggleElements] = useState<boolean>(true)
    return (
        <div className='min-h-screen text-white'>
            <div className='sticky top-20 bg-primary'>
                {/* Options toggle */}
                <ul className='flex gap-5 mt-2 text-xl shadow'>
                    <li className={`px-2 cursor-pointer ${toggleElements && 'border-b-2 border-gray-400'}`} onClick={() => setToggleElements(true)}>Layout</li>
                    <li className={`px-2 cursor-pointer ${!toggleElements && 'border-b-2 border-gray-400'}`} onClick={() => setToggleElements(false)}>Styles</li>
                </ul>
            </div>
            {/* Suggested layouts */}
            <div>
                {
                    toggleElements ? <DesignLayouts /> : <DesignStyles />
                }
            </div>
        </div>
    );
};

export default DesignElements;