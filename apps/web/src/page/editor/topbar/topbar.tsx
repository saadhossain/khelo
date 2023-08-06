import { observer } from 'mobx-react-lite';
import styled from 'polotno/utils/styled';

import { NavLink } from 'react-router-dom';
import { DownloadButton } from './download-button';
import { AiFillHome } from 'react-icons/ai';

const NavbarContainer = styled('div')`
  @media screen and (max-width: 500px) {
    overflow-x: auto;
    overflow-y: hidden;
    max-width: 100vw;
  }
`;

const NavInner = styled('div')`
  @media screen and (max-width: 500px) {
    display: flex;
  }
`;

export default observer(({ store }: any) => {

  return (
    <div className="bp4-navbar flex justify-between items-center text-white">
      <NavLink to='/' className='bg-accent flex gap-1 items-center py-1 px-3 rounded'><AiFillHome/>Home</NavLink>
      <DownloadButton store={store}/>
    </div>
  );
});
