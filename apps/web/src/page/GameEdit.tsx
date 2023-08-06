// import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';
// import { Workspace } from 'polotno/canvas/workspace';
// import { SidePanel } from 'polotno/side-panel';
// import { Toolbar } from 'polotno/toolbar/toolbar';
// import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';

// import '@blueprintjs/core/lib/css/blueprint.css';
// import '@blueprintjs/icons/lib/css/blueprint-icons.css';
// import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';

// import { setUploadFunc } from 'polotno/config';
// import { createStore } from 'polotno/model/store';

// // create store
// const store = createStore({
//   key: 'jpxn3bDi6l3QRf1n0HDE',
//   showCredit: false,
// });

// console.log('before store.addPage()')
// const page = store.addPage();

// page.set({
//   background: 'https://firebasestorage.googleapis.com/v0/b/khelo-42049.appspot.com/o/game-imgs%2Fastray.png?alt=media&token=28bb4921-05e0-49e0-9a2b-0d23e9951d7d',
// });
// console.log('After page.set()')

import { InputGroup } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/popover2/lib/css/blueprint-popover2.css';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { PolotnoContainer, SidePanelWrap, WorkspaceWrap } from 'polotno';

import { Workspace } from 'polotno/canvas/workspace';
import { createStore } from 'polotno/model/store';
import { SidePanel } from 'polotno/side-panel';
import { Toolbar } from 'polotno/toolbar/toolbar';
import { ZoomButtons } from 'polotno/toolbar/zoom-buttons';
import { getImageSize } from 'polotno/utils/image';

import {
  BackgroundSection,
  ElementsSection,
  SizeSection,
  TextSection,
  UploadSection,
} from 'polotno/side-panel';
//
import { SectionTab } from 'polotno/side-panel';
import { ImagesGrid } from 'polotno/side-panel/images-grid';
// import our own icon

import '../index.css';

const store = createStore({
  key: 'jpxn3bDi6l3QRf1n0HDE',
  showCredit: false,
});

const page = store.addPage();
// store.activePage.addElement({
//   type: 'text',
//   text: 'hello',
// });


page.set({
  background: 'https://firebasestorage.googleapis.com/v0/b/khelo-42049.appspot.com/o/game-imgs%2Fastray.png?alt=media&token=28bb4921-05e0-49e0-9a2b-0d23e9951d7d',
});

store.setScale(2);

export const PhotosPanel = observer(({ store }: any) => {
  const [images, setImages] = React.useState<any>([]);

  async function loadImages() {
    setImages([]);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setImages([
      { url: 'https://i.ibb.co/3Cq01Zz/game-image-neon.jpg' },
      { url: 'https://i.ibb.co/QQyLRcX/green-apple.png' },
    ]);
  }

  React.useEffect(() => {
    loadImages();
  }, []);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <InputGroup
        leftIcon="search"
        placeholder="Search..."
        onChange={(e) => {
          loadImages();
        }}
        style={{
          marginBottom: '20px',
        }}
      />
      <p>Custom Images: </p>
      <ImagesGrid
        images={images}
        getPreview={(image) => image.url}
        onSelect={async (image, pos) => {
          const { width, height } = await getImageSize(image.url);
          store.activePage.addElement({
            type: 'image',
            src: image.url,
            width,
            height,
            x: pos ? pos.x : store.width / 2 - width / 2,
            y: pos ? pos.y : store.height / 2 - height / 2,
          });
        }}
        rowsNumber={2}
        isLoading={!images.length}
        loadMore={false}
      />
    </div>
  );
});

// define the new custom section
const CustomPhotos = {
  name: 'photos',
  Tab: (props: any) => (
    <SectionTab name="Photos" {...props}>
      Photos
    </SectionTab>
  ),
  Panel: PhotosPanel,
};
const sections = [
  TextSection,
  CustomPhotos,
  ElementsSection,
  UploadSection,
  BackgroundSection,
  SizeSection,
];
//Upload Image to the server
// const imgbbApi = '460277a64e943a5b0c6a7c361e13ac36'
// const uploadImage = async (localFile: any) => {
//   console.log(localFile)
//   const formData = new FormData();
//   formData.append('image', localFile);
//   const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApi}`, {
//     method: 'POST',
//     body: formData,
//   });
//   const data = await res.json();
//   console.log(data.data.url)
//   const ImageUrl = data.data.url;
//   // return simple and short url
//   return ImageUrl;
// }
// setUploadFunc(uploadImage);

const GameEdit = ({ store }: any) => {
  return (
    <PolotnoContainer className="bp4-dark polotno-app-container">
      <SidePanelWrap>
        <SidePanel store={store}
        // sections={sections} defaultSection="photos"
        />
      </SidePanelWrap>
      <WorkspaceWrap>
        <Toolbar store={store} />
        <Workspace
          store={store}
          backgroundColor={'#090B28'}
        />
        <ZoomButtons store={store} />
      </WorkspaceWrap>
    </PolotnoContainer>
  );
};

export default GameEdit;