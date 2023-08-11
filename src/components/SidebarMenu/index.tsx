import { useState } from 'react';

import { paths } from '../../routes';

import * as S from './styles';

export function SidebarMenu() {
  const [open, setOpen] = useState(
    localStorage.getItem('menuIsOpen') === 'open'
  );

  const togle = () => {
    const isOpen = localStorage.getItem('menuIsOpen');

    if (isOpen === 'open') {
      setOpen(false);
      localStorage.setItem('menuIsOpen', 'close');
    } else {
      setOpen(true);
      localStorage.setItem('menuIsOpen', 'open');
    }
  };

  return (
    <S.Container open={open}>
      <nav>
        <div className='title'>
          <ul>
            <li>
              <a href='#'>
                <span>Menu</span>
              </a>
            </li>
          </ul>
        </div>
        <ul>
          <li>
            <a href={paths.horse}>
              <span>Cavalos</span>
            </a>
          </li>
          <li>
            <a href={paths.color}>
              {/* <FormatPaintOutlined /> */}
              <span>Cor</span>
            </a>
          </li>
          <li>
            <a href={paths.race}>
              {/* <PetsOutlined /> */}
              <span>Raça</span>
            </a>
          </li>
          <li>
            <a href={paths.pace}>
              {/* <EqualizerOutlined /> */}
              <span>Andamento</span>
            </a>
          </li>
          <li>
            <a href='#'>
              {/* <PeopleOutline /> */}
              <span>Usuários</span>
            </a>
          </li>
        </ul>
      </nav>
    </S.Container>
  );
}
