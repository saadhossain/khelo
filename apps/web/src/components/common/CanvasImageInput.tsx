import React from 'react';

interface CanvasInputProps {
    inputRef: React.MutableRefObject<HTMLInputElement | undefined>;
    canvasImage: any;
    imageIndex: number;
    setCanvasImage: React.Dispatch<React.SetStateAction<File | null>[]>;
}

const CanvasImageInput = ({ inputRef, canvasImage, setCanvasImage, imageIndex }: CanvasInputProps) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        setCanvasImage([selectedFile]);
    };

    const handleRemoveImage = (inputRef:React.MutableRefObject<HTMLInputElement | undefined>) => {
        setCanvasImage([]);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="relative flex gap-2 justify-center items-center px-3 py-5 text-white font-semibold rounded-md">
            <div className={`${canvasImage && 'hidden'} w-64 h-40`}>
                <input
                    type="file"
                    onChange={(e) => handleInputChange(e)}
                    hidden
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                />
                <button
                    onClick={() => inputRef.current && inputRef.current.click()}
                    className="w-full h-full p-2 text-sm rounded bg-secondary mt-2 text-night"
                >
                    {imageIndex + 1} <br />
                    Select Image
                </button>
            </div>
            {canvasImage && (
                <div className="relative">
                    <button
                        onClick={()=>handleRemoveImage(inputRef)}
                        className="absolute -right-2 -top-2 text-red-600 bg-white rounded-full px-2"
                    >
                        X
                    </button>
                    <img
                        src={URL.createObjectURL(canvasImage)}
                        className="w-full h-full rounded border-2 border-accent"
                        alt="Preview"
                    />
                </div>
            )}
        </div>
    );
};

export default CanvasImageInput;
