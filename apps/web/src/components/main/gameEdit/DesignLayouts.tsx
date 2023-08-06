import suggested1 from '../../../assets/suggested/suggested1.png';
import suggested2 from '../../../assets/suggested/suggested2.png';
import suggested3 from '../../../assets/suggested/suggested3.png';
import suggested4 from '../../../assets/suggested/suggested4.webp';

const DesignLayouts = () => {
    return (
        <div className='flex flex-col gap-4 py-5'>
            <img src={suggested1} alt="Suggested layouts" className='rounded-md cursor-pointer' loading='lazy' />
            <img src={suggested2} alt="Suggested layouts" className='rounded-md cursor-pointer' loading='lazy' />
            <img src={suggested3} alt="Suggested layouts" className='rounded-md cursor-pointer' loading='lazy' />
            <img src={suggested4} alt="Suggested layouts" className='rounded-md cursor-pointer' loading='lazy' />
        </div>
    );
};

export default DesignLayouts;