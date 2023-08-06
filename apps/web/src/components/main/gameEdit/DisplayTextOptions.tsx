import { useEffect, useState } from 'react';
import Loading from '../../Loader/Loading';
import TextEditingBox from './TextEditingBox';

const DisplayTextOptions = () => {
    //Declare a loading state
    const [loading, setLoading] = useState(false);
    const [textOptions, setTextOptions] = useState([]);
    const [textInput, setTextInput] = useState(' ')
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch('../../../../textstyles.json');
                const data = await res.json();
                setTextOptions(data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    if (loading) {
        return <Loading />
    }
    return (
        <div className='text-gray-200'>
            <h4 className='text-xl mt-2'>Default Text Styles</h4>
            {/* Text Styles */}
            <div className='my-5'>
                <h2
                    onClick={()=> setTextInput('Add a Heading')}
                    className='text-4xl font-bold hover:bg-secondary p-2 rounded cursor-pointer duration-300 ease-in-out'>Add a Heading</h2>
                <h4
                onClick={()=> setTextInput('Add a Sub Heading')}
                className='text-2xl font-bold hover:bg-secondary p-2 rounded cursor-pointer duration-300 ease-in-out'
                >Add a Sub Heading</h4>
                <p 
                onClick={()=> setTextInput('Add Body Text/Description')}
                className=' hover:bg-secondary p-2 rounded cursor-pointer duration-300 ease-in-out'>Add Body Text/Description</p>
            </div>
            <h4 className='text-xl mt-2'>Predefined Styles</h4>
            <div className='grid grid-cols-4 gap-3 py-3'>
                {
                    textOptions.map((text, i) =>
                        <img src={text} key={i} className='cursor-pointer' />
                    )
                }
            </div>
            <TextEditingBox textInput={textInput}/>
        </div>
    );
};

export default DisplayTextOptions;