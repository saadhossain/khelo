import { setUploadFunc } from 'polotno/config';
import { useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { BiHomeAlt } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { uploadFilesToFirebase } from '../../utils/utils';

const Header = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    console.log(user)

    const [canvasImages, setCanvasImages] = useState<FileList | []>([])
    console.log(canvasImages)
    const uploadFiles = async () => {
        const imageUrls = await uploadFilesToFirebase('canvasImage', canvasImages)
        console.log(imageUrls[0])
        // set new function
        setUploadFunc(imageUrls[0]);
        console.log('after upload', imageUrls[0])
    }
    return (
        <div className='w-full py-2 bg-secondary text-white sticky top-0 z-50'>
            <div className='w-10/12 mx-auto'>
                <nav className='flex justify-between'>
                    <NavLink to='/' className='flex gap-1 items-center text-white font-semibold'>
                        <BiHomeAlt className='w-5 h-5' />
                        Home
                    </NavLink>
                    <div className='flex gap-2 items-center'>
                        <div>
                            {/* <input type="file" onChange={(e: any) => setCanvasImages(e.target.files)} multiple className='border border-accent py-1 px-2 rounded-l' />
                            <button
                                onClick={() => uploadFiles()}
                                className='bg-accent py-2 px-5 rounded-r'
                            >Upload</button> */}
                        </div>
                        {
                            user ?
                                <NavLink to='/profile'>
                                    <img src={user.picture} alt={user.name} className='w-8 h-8 rounded-full' title={user.name} />
                                </NavLink>
                                :
                                <NavLink to='/login'>
                                    <AiOutlineUserAdd className='w-6 h-6 text-white' />
                                </NavLink>
                        }
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;