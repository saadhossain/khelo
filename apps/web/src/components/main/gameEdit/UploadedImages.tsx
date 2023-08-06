import {useContext} from 'react'
import uploads1 from '../../../assets/uploads/nyonbg-1.jpg';
import uploads2 from '../../../assets/uploads/nyonbg-2.jpg';
import uploads3 from '../../../assets/uploads/nyonbg-3.jpg';
import uploads4 from '../../../assets/uploads/nyonbg-4.jpg';
import mainImage from '../../../assets/suggested/suggested1.png'

import { DataContext, GameContextType } from '../../../Context/DataProvider';
const UploadedImages = () => {
    const {gameEditPreview,setGameEditPreview} = useContext(DataContext) as GameContextType
    return (
        <div className='w-8/12 fixed bottom-2 flex justify-center'>
            <div className='grid grid-cols-5 gap-3 mt-2'>
                <img src={uploads1} alt='Uploads' onClick={()=> setGameEditPreview(uploads1)} className={`w-40 h-20 rounded cursor-pointer ${gameEditPreview === uploads1 && 'border-2 border-white'}`} loading='lazy'/>
                <img src={uploads2} alt='Uploads' onClick={()=> setGameEditPreview(uploads2)} className={`w-40 h-20 rounded cursor-pointer ${gameEditPreview === uploads2 && 'border-2 border-white'}`} loading='lazy'/>
                <img src={uploads3} alt='Uploads' onClick={()=> setGameEditPreview(uploads3)} className={`w-40 h-20 rounded cursor-pointer ${gameEditPreview === uploads3 && 'border-2 border-white'}`} loading='lazy'/>
                <img src={uploads4} alt='Uploads' onClick={()=> setGameEditPreview(uploads4)} className={`w-40 h-20 rounded cursor-pointer ${gameEditPreview === uploads4 && 'border-2 border-white'}`} loading='lazy'/>
                <img src={mainImage} alt='Uploads' onClick={()=> setGameEditPreview(mainImage)} className={`w-40 h-20 rounded cursor-pointer ${gameEditPreview === mainImage && 'border-2 border-white'}`} loading='lazy'/>
            </div>
        </div>
    );
};

export default UploadedImages;