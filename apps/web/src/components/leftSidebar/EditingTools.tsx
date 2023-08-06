import { useContext } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { DataContext, GameContextType } from '../../Context/DataProvider';
import design from '../../assets/icons/design.svg';
import elements from '../../assets/icons/elements.svg';
import mechanics from '../../assets/icons/mechanics.svg';
import textIcon from '../../assets/icons/text.svg';
import DesignOptions from '../main/gameEdit/DesignOptions';
import ElementsOptions from '../main/gameEdit/ElementsOptions';
import ReactDOMServer from 'react-dom/server';
import MechanicsOptions from '../main/gameEdit/MechanicsOptions';
import TextToolsOptions from '../main/gameEdit/TextToolsOptions';

const EditingTools = () => {
    const {toolsOptions ,setToolsOptions } = useContext(DataContext) as GameContextType

    //check if toolsOptions and rendered elements is same or not...
    const isMatch = (rendered:any) => {
        if(ReactDOMServer.renderToString(toolsOptions) === ReactDOMServer.renderToString(rendered())){
            return true
        }
        return false
    }
    return (
        <div>
            <div className='w-20 min-h-screen bg-secondary flex flex-col py-2 gap-8 editpanel sticky top-0'>
                <NavLink to='/' className='flex flex-col items-center text-white py-2 text-xs'>
                    <AiFillHome className='w-6 h-6' />
                    <span>Home</span>
                </NavLink>
                <div
                    onClick={() => setToolsOptions(DesignOptions)}
                    className={`flex flex-col items-center text-white py-2 text-xs cursor-pointer ${isMatch(DesignOptions) && 'bg-primary'}`}>
                    <img src={design} alt="Design" />
                    <span>Design</span>
                </div>
                <div
                    onClick={() => setToolsOptions(ElementsOptions)}
                    className={`flex flex-col items-center text-white py-2 text-xs cursor-pointer ${isMatch(ElementsOptions) && 'bg-primary'}`}
                >
                    <img src={elements} alt="elements" />
                    <span>Elements</span>
                </div>
                <div
                onClick={() => setToolsOptions(TextToolsOptions)}
                className={`flex flex-col items-center text-white py-2 text-xs cursor-pointer ${isMatch(TextToolsOptions) && 'bg-primary'}`}
                >
                    <img src={textIcon} alt="text" />
                    <span>Text</span>
                </div>
                <div
                onClick={() => setToolsOptions(MechanicsOptions)}
                className={`flex flex-col items-center text-white py-2 text-xs cursor-pointer ${isMatch(MechanicsOptions) && 'bg-primary'}`}
                >
                    <img src={mechanics} alt="mechanics" />
                    <span>Mechanics</span>
                </div>
            </div>
        </div>
    );
};

export default EditingTools;