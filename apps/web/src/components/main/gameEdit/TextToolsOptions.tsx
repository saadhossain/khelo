import {useContext} from 'react'
import { DataContext, GameContextType } from '../../../Context/DataProvider';
import DisplayTextOptions from './DisplayTextOptions';
import GameEditSearch from './GameEditSearch';
import { useDispatch } from 'react-redux';

const TextToolsOptions = () =>{
    return (
        <div className='min-h-screen text-white'>
            <div className='sticky top-0 z-50 bg-primary pt-10'>
                {/* Search field */}
                <GameEditSearch/>
            </div>
            <DisplayTextOptions/>
        </div>
    );
};

export default TextToolsOptions;