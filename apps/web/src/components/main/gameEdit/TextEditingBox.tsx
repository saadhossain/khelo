
const TextEditingBox = ({textInput}:any) => {
    return (
        <div>
            {
                textInput.length > 1 &&
                <input type="text" placeholder={textInput}
                    className={`w-4/12 ${textInput === 'Add a Heading' && 'text-5xl font-bold' } ${textInput === 'Add a Sub Heading' && 'text-3xl font-bold' } ${textInput === 'Add Body Text/Description' && 'text-base font-normal'} text-white text-center bg-transparent border-2 border-white rounded absolute top-1/4 left-[45%] outline-none py-1 px-2 z-10`}/>
            }
        </div>
    );
};

export default TextEditingBox;