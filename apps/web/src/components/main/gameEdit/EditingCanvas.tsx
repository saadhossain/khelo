import { useContext } from 'react';
import { DataContext, GameContextType } from '../../../Context/DataProvider';

const EditingCanvas = () => {
    const { gameEditPreview} = useContext(DataContext) as GameContextType
    return (
        <div className='text-white fixed top-10 right-64'>
            <img src={gameEditPreview} alt="Game Edit Preview" className='w-[500px] h-80 rounded relative' loading='lazy' />
            {/* Text Input Overlay */}
        </div>
    );
};

export default EditingCanvas;