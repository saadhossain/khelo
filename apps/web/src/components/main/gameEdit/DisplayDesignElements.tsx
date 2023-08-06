import { useEffect, useState } from 'react';
import Loading from '../../Loader/Loading';

const DisplayDesignElements = () => {
    //Declare a loading state
    const [loading, setLoading] = useState(false);
    const [editElements, setEditElements] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch('../../../../designelements.json');
                const data = await res.json();
                setEditElements(data);
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
        <div className='grid grid-cols-4 gap-3 py-3'>
            {
                editElements.map((elements, i) =>
                    <img src={elements} key={i} className='cursor-pointer' />
                )
            }
        </div>
    );
};

export default DisplayDesignElements;