import EditingCanvas from '../components/main/gameEdit/EditingCanvas';
import ToolsOptions from '../components/main/gameEdit/ToolsOptions';
import UploadedImages from '../components/main/gameEdit/UploadedImages';

const GameEdit = () => {
    return (
        <div className='w-full flex gap-3 relative'>
            <div className='w-3/12'>
                <ToolsOptions />
            </div>
            <div className='w-9/12'>
                <EditingCanvas />
                <UploadedImages />
            </div>
        </div>
    );
};

export default GameEdit;