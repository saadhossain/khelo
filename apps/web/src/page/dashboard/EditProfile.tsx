import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loader/Loading';
import Processing from '../../components/Loader/Processing';
import ProfileEditModal from '../../components/main/ProfileEditModal';
import { API } from '../../config/config';
import { auth } from '../../config/firebase.config';
import { setUpdatedUser } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import { headerType } from '../../types/headerType';
import { uploadFiletoFirebase } from '../../utils/utils';

const EditProfile = () => {
    const { user, loading } = useSelector((state: RootState) => state.auth)
    const [updating, setUpdating] = useState(false)
    const dispatch = useDispatch()
    //Image change states
    const [src, setSrc] = useState<string | undefined>(undefined)
    const [preview, setPreview] = useState(null)
    const [openEditBox, setOpenEditBox] = useState(false)
    const [userName, setUserName] = useState(user?.name)
    const [image, setImage] = useState<File | null>(null);

    const userToken = localStorage.getItem("gamifyToken");
    const handleUpdateUser = async () => {
        setUpdating(true)
        //Set Image to firestore
        const profilePic = await uploadFiletoFirebase('profileImg', image)
        const res = await fetch(`${API}/user/update/${user?.user_id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                authorization: userToken
            } as headerType,
            body: JSON.stringify({ name: userName, picture: profilePic })
        })
        const { data } = await res.json()
        setUpdating(false)
        toast.success('Profile Info updated...')
        if (data) {
            const updatedData = {
                email: data.email,
                email_verified: data.email_verified,
                name: data.name,
                picture: data.picture,
                user_id: data.user_id
            }
            dispatch(setUpdatedUser(updatedData))
            //Update info on authentication also
            const currentUser = auth.currentUser;
            if (currentUser) {
                await updateProfile(currentUser, { displayName: userName, photoURL: profilePic })
            }
        }
    }
    if (loading) {
        return <Loading />
    }
    return (
        <div>
            <div className="my-10 min_full_screen">
                <h1 className="ml-5 md:ml-0 text-xl md:text-3xl font-semibold text-white ">
                    Edit Profile
                </h1>
                <div className='w-3/5 mx-auto bg-secondary px-10 py-20 rounded-xl mt-10'>
                    {
                        updating ?
                            <Processing
                                title={"Updating Info"}
                                height={"20px"}
                            />
                            : <div className='flex flex-col gap-2'>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="name" className="text-sm text-white">Name</label>
                                    <input onChange={(e) => setUserName(e.target.value)} id="name" type="text" name='fullName' defaultValue={user?.name} className="w-full rounded-md p-2" />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="email" className="text-sm text-white">Email Address</label>
                                    <input id="email" type="email" defaultValue={user?.email} readOnly className="w-full rounded-md p-2 outline-none" />
                                </div>
                                <p className='text-white'>Profile Picture</p>
                                <div className='flex gap-2 items-center'>
                                    <img src={preview ? preview : user?.picture} alt="Preview" className='w-16 h-16 rounded-full' />
                                    <button onClick={() => setOpenEditBox(true)} className='w-full border border-accent p-2 rounded-md text-white font-semibold text-left'>Choose File...</button>
                                </div>
                                {/* <img src={img} /> */}
                                <button onClick={handleUpdateUser} className='bg-accent py-2 px-5 rounded-md text-white font-semibold'>Update</button>
                            </div>
                    }
                </div>
            </div>
            {
                openEditBox && <ProfileEditModal
                    setImage={setImage}
                    setPreview={setPreview}
                    src={src}
                    setOpenEditBox={setOpenEditBox}
                />
            }
        </div>
    );
};

export default EditProfile;