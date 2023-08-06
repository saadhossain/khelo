import { useContext } from 'react';
import { DataContext, GameContextType } from '../../../Context/DataProvider';

const ToolsOptions = () => {
    const { toolsOptions } = useContext(DataContext) as GameContextType
    return (
        <div>
            {toolsOptions}
        </div>
    );
};

export default ToolsOptions;