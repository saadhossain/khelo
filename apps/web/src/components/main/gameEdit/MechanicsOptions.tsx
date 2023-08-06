import GameEditSearch from './GameEditSearch';

const MechanicsOptions = () =>{
    return (
        <div className='min-h-screen text-white'>
            <div className='sticky top-0 z-50 bg-primary pt-10'>
                {/* Search field */}
                <GameEditSearch/>
                <h1 className='text-2xl font-semibold mt-2'> Game Mechanics</h1>
            </div>
            {/* Suggested layouts */}
            <div>
                
            </div>
        </div>
    );
};

export default MechanicsOptions;