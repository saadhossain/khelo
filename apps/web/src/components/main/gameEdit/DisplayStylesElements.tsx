import { useEffect, useState } from 'react';
import Loading from '../../Loader/Loading';

const DisplayStylesElements = () => {
    //Declare a loading state
    const [loading, setLoading] = useState(false);
    const [stylesElements, setStylesElements] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch('../../../../styleselements.json');
                const data = await res.json();
                setStylesElements(data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    if(loading){
        return <Loading/>
    }
    return (
        <div className='grid grid-cols-3 gap-5 py-3'>
            {
                stylesElements.map((elements, i) =>
                    <img src={elements} key={i} className='cursor-pointer rounded-md' />
                )
            }
        </div>
    );
};

export default DisplayStylesElements;