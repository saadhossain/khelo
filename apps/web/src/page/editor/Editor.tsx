import { observer } from 'mobx-react-lite';
import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
import { Workspace } from 'polotno/canvas/workspace';
import createStore from 'polotno/model/store';
import { BackgroundSection, ElementsSection, SectionTab, SidePanel, SizeSection, TemplatesSection, TextSection, UploadSection } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { useEffect, useState } from 'react';
import { MdPhotoLibrary } from 'react-icons/md';
import '../../index.css';
import { loadFile } from './file';
import { useProject } from './project';
import PhotosPanel from './sections/PhotoPanel';
import { AiGenaratedSection } from './sections/ai-genarated-section';
import Topbar from './topbar/topbar';

const useHeight = () => {
    const [height, setHeight] = useState(window.innerHeight);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setHeight(window.innerHeight);
        });
    }, []);
    return height;
};
const useWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
    }, []);
    return width;
};
// define the new custom section
const GamePhotos = {
    name: 'photos',
    Tab: (props: any) => (
        <SectionTab name="Photos" {...props}>
            <MdPhotoLibrary />
        </SectionTab>
    ),
    Panel: PhotosPanel,
};

const sections: any[] = [
    TemplatesSection,
    TextSection,
    GamePhotos,
    ElementsSection,
    UploadSection,
    BackgroundSection,
    SizeSection,
    AiGenaratedSection
];
//Define Store...
const store = createStore({
    key: 'jpxn3bDi6l3QRf1n0HDE',
    showCredit: false,
});
store.addPage();

const Editor = observer(() => {
    const project: any = useProject();
    const height = useHeight();

    const load = () => {
        let url = new URL(window.location.href);
        const reg = new RegExp('design/([a-zA-Z0-9_-]+)').exec(url.pathname);
        const designId = (reg && reg[1]) || 'local';
        project.loadById(designId);
    };

    const handleDrop = (ev: any) => {
        ev.preventDefault();
        if (ev.dataTransfer.files.length !== ev.dataTransfer.items.length) {
            return;
        }
        for (let i = 0; i < ev.dataTransfer.files.length; i++) {
            loadFile(ev.dataTransfer.files[i], store);
        }
    };

    const [loading, setLoading] = useState(false)
    // const saveCanvasAsImageToServer = async (canvas:any) => {
    //     const dataURL = canvas.toDataURL('image/png');
    //     const base64Image = dataURL.split(',')[1];
    //     console.log(base64Image)
    //     const formData = new FormData();
    //     formData.append('imageData', base64Image);
    //     // console.log(formData)
    //     const imgbbApi = 'ee7085d23184f77801d3c6950c563d75'
    //     try {
    //         const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApi}`, {
    //             method: 'POST',
    //             body: formData,
    //         });
    //         const data = await res.json();
    //         console.log(data.data.url);
    //         setLoading(false)
    //     } catch (error) {
    //         console.error('Failed to save image to server.', error);
    //     }
    // };
    // const saveImage = async () => {
    //     const htmlFile = await store.toHTML()
    //     const canvasPageElement = document.getElementsByTagName('canvas')[0] as Element;
    //     saveCanvasAsImageToServer(canvasPageElement);
    // }

    const saveImage = async () => {
        const htmlFile: any = await store.toDataURL()
        const formData = new FormData();
        formData.append('image', htmlFile);
        const imgbbApi = 'ee7085d23184f77801d3c6950c563d75'
        try {
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApi}`, {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            console.log(data.data.url);
            setLoading(false)
        } catch (error) {
            console.error('Failed to save image to server.', error);
        }
    }
    return (
        <div
            id='container'
            style={{
                width: '100vw',
                height: height + 'px',
                display: 'flex',
                flexDirection: 'column',
            }}
            onDrop={handleDrop}
            className='bp4-dark relative'
        >
            <Topbar store={store} />
            <div style={{ height: 'calc(100% - 50px)' }}>
                <div className='flex items-center gap-2 absolute top-3 right-72 z-50'>
                    <button
                        onClick={() => saveImage()}
                        className='py-1 px-3 rounded text-white bg-primary'
                    >{loading ? 'Saving' : 'Save Design'}</button>
                </div>
                <PolotnoContainer className="polotno-app-container">
                    <SidePanelWrap>
                        <SidePanel
                            store={store}
                            sections={sections} defaultSection="photos"
                        />
                    </SidePanelWrap>
                    <WorkspaceWrap>
                        <Toolbar store={store} />
                        <Workspace store={store} />
                        <ZoomButtons store={store} />
                    </WorkspaceWrap>
                </PolotnoContainer>
            </div>
        </div>
    );
});

export default Editor;
