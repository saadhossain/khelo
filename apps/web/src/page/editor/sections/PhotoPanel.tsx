import { InputGroup } from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';
import { ImagesGrid } from 'polotno/side-panel';
import { getImageSize } from 'polotno/utils/image';
import { useEffect, useState } from 'react';
import { API } from '../../../config/config';
import { useParams } from 'react-router-dom';

const PhotosPanel = observer(({ store }: any) => {
    const param = useParams() as { id: string };
    // console.log(param.id)
    //Get game assets from the api
    const [gameAssets, setGameAssets] = useState([])
    const getAssets = async () => {
        // const res = await fetch(`${API}/game/assets/${param.id}`)
        const res = await fetch(`${API}/game/assets/78549fe9c9404ffab9fe`)
        const { data } = await res.json()
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setGameAssets(data)
    }
    useEffect(() => {
        getAssets()
    }, [])
    return (
        <div className='flex flex-col min-h-full'>
            <InputGroup
                leftIcon="search"
                placeholder="Search..."
                style={{
                    marginBottom: '20px',
                }}
            />
            <p>Game Images: </p>
            <ImagesGrid
                images={gameAssets}
                getPreview={(gameAssets) => gameAssets}
                onSelect={async (gameAssets, pos) => {
                    const { width, height } = await getImageSize(gameAssets);
                    store.activePage.addElement({
                        type: 'image',
                        src: gameAssets,
                        width,
                        height,
                        x: pos ? pos.x : store.width / 2 - width / 2,
                        y: pos ? pos.y : store.height / 2 - height / 2,
                    });
                }}
                rowsNumber={2}
                isLoading={!gameAssets.length}
                loadMore={false}
            />
        </div>
    );
});

export default PhotosPanel