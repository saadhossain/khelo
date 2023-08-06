import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-hot-toast";
import { storage } from '../config/firebase.config';
import { API } from "../config/config";
import { headerType } from "../types/headerType";
import { UserType } from "../types/userType";
import { v4 as uuidv4 } from "uuid";
//Get User Token
export const userToken = localStorage.getItem("gamifyToken");
export const headers = {
  "content-type": "application/json",
  authorization: userToken,
} as headerType;

//handle comment functionality
export const handleComment = async (
  e: React.FormEvent,
  gameId: string,
  user: UserType | null,
  setExpandComment: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  const comment = (e.target as HTMLFormElement).comment.value;
  //Send Data to the server
  await fetch(`${API}/game/action/${gameId}?action=comments`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ Comment: "Nice Game" }),
  });
  setExpandComment(false);
  toast.success("Comment Added...");
};
export const uploadFiletoFirebase = async (imgRef:string, image:any) => {
  const imageRef = ref(storage, `${imgRef}/${uuidv4()}-${image?.name}`);
  const snapshot = await uploadBytes(imageRef, image);
  const imgUrl = await getDownloadURL(snapshot.ref);
  return imgUrl
}

export const uploadFilesToFirebase = async (imgRef: string, images: FileList | []) => {
  const imageArray = Array.from(images);
  const uploadPromises = imageArray.map(async (image) => {
    const imageRef = ref(storage, `${imgRef}/${uuidv4()}-${image?.name}`);
    const snapshot = await uploadBytes(imageRef, image);
    const imgUrl = await getDownloadURL(snapshot.ref);
    return imgUrl;
  });
  const uploadedUrls = await Promise.all(uploadPromises);
  console.log('from function', uploadedUrls)
  return uploadedUrls;
}



