interface ProcessingProps {
    title: string;
    height: string;
}
const Processing = ({ title, height }: ProcessingProps) => {
    return (
        <div className={`flex flex-col gap-2 justify-center items-center h-[${height}]`}>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            <div className='text-center'>
                <h3 className='text-xl text-white font-semibold'>{title}</h3>
                <h2 className='text-lg text-white'>Please wait a moment...</h2>
            </div>
        </div>
    );
};

export default Processing;