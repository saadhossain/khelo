import DisplayDesignElements from './DisplayDesignElements';
import GameEditSearch from './GameEditSearch';

const ElementsOptions = () => {
    return (
        <div className='min-h-screen text-white'>
            <div className='sticky top-0 z-50 bg-primary pt-10 pb-3'>
                {/* Search field */}
                <GameEditSearch />
            </div>
            {/* Suggested layouts */}
            <DisplayDesignElements/>
        </div>
    );
};

export default ElementsOptions;
