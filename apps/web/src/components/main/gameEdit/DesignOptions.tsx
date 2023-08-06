import DesignElements from './DesignElements';
import GameEditSearch from './GameEditSearch';

const DesignOptions = () => {
    return (
        <div className='min-h-screen text-white'>
            <div className='sticky top-0 bg-primary pt-10 pb-1'>
                {/* Search field */}
                <GameEditSearch />
            </div>
            {/* Suggested layouts */}
            <DesignElements />
        </div>
    );
};

export default DesignOptions;