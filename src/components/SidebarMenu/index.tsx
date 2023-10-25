import { Link } from 'react-router-dom';
import { paths } from '../../routes';

import * as S from './styles';
import { useState } from 'react';
import { Menu } from '@mui/icons-material';

export function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 500);

  const handleOpen = () => setIsOpen((prev) => !prev);

  return (
    <S.Container open={isOpen}>
      <nav>
        <div className='title'>
          <Link to='#' onClick={handleOpen}>
            <Menu />
            <span>Menu</span>
          </Link>
        </div>
        <ul onClick={handleOpen}>
          <li>
            <Link to={paths.horse}>
              <span>Cavalos</span>
            </Link>
          </li>
          <li>
            <Link to={paths.color}>
              {/* <FormatPaintOutlined /> */}
              <span>Cor</span>
            </Link>
          </li>
          <li>
            <Link to={paths.race}>
              {/* <PetsOutlined /> */}
              <span>Raça</span>
            </Link>
          </li>
          <li>
            <Link to={paths.pace}>
              {/* <EqualizerOutlined /> */}
              <span>Andamento</span>
            </Link>
          </li>
          <li>
            <Link to={paths.user}>
              {/* <PeopleOutline /> */}
              <span>Usuários</span>
            </Link>
          </li>
        </ul>
      </nav>
    </S.Container>
  );
}
