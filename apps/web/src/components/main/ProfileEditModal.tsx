import { useRef,useEffect } from 'react';
import {gsap} from 'gsap'
import Avatar from 'react-avatar-edit';

interface profileEditData {
    setImage: React.Dispatch<React.SetStateAction<File | null>>;
    setOpenEditBox: React.Dispatch<React.SetStateAction<boolean>>;
    setPreview: React.Dispatch<React.SetStateAction<null>>;
    src:string | undefined
}

const ProfileEditModal = ({ setOpenEditBox,setImage, setPreview, src }: profileEditData) => {
    const onClose = () => {
        setPreview(null)
    }
    const onCrop = (view: any) => {
        setPreview(view)
    }
    //Gsap Animation
    const timeline = gsap.timeline({paused:true})
    const modalRef = useRef(null)

    useEffect(()=>{
        timeline.from(modalRef.current, {
            duration:0.2,
            opacity:0,
            y:300,
            ease:'Power3.easeOut()'
        })
        timeline.play()
        return () => {
            timeline.paused()
        }
    },[])
    return (
        <div>
            <div ref={modalRef} className="profileModal absolute top-[20%] left-[40%] flex flex-col max-w-md gap-2 p-6 rounded-md shadow-xl bg-primary text-white">
                <div className='flex justify-between items-center'>
                    <h2 className="font-semibold">
                        Edit Profile Picture
                    </h2>
                    <button onClick={() => setOpenEditBox(false)} className='font-semibold bg-accent px-3 py-1 rounded-full'>X</button>
                </div>
                <Avatar
                    width={300}
                    height={200}
                    onCrop={onCrop}
                    onClose={onClose}
                    src={src}
                    onFileLoad={(data: File | React.ChangeEvent<HTMLInputElement> | null) => {
                        if (data instanceof File) {
                            setImage(data);
                        }
                    }}
                />
                <div className="flex flex-col justify-end gap-3 mt-6 sm:flex-row">
                    <button onClick={()=> setOpenEditBox(false)} className="px-6 py-2 rounded shadow bg-accent">Set</button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEditModal;