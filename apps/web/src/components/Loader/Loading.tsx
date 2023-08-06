import './loading.css';
const Loading = () => {
    return (
        <div className='flex gap-1 justify-center items-center min-h-screen'>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default Loading;