import { Outlet } from 'react-router-dom';
import { paths } from '../../routes';
import * as S from './styles';
import {
  EqualizerOutlined,
  FormatPaintOutlined,
  PeopleOutline,
  PetsOutlined,
  Menu,
} from '@mui/icons-material';
import { useState } from 'react';

export function SidebarMenu() {
  const [open, setOpen] = useState(false);

  return (
    <S.Container open={open}>
      <nav>
        <div className='title'>
          <ul>
            <li onClick={() => setOpen(!open)}>
              <a href='#'>
                <Menu />
                <span>Menu</span>
              </a>
            </li>
          </ul>
        </div>
        <ul>
          <li>
            <a href='#'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_809_275)'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M5.6741 14.7877C6.40999 15.0547 7.50032 14.4555 9.17079 12.4449C9.80337 12.6785 10.2993 13.1967 10.5154 14.3077C10.9255 16.4232 10.2738 17.7774 9.36787 19.6385C9.19939 19.9835 9.03092 20.3252 8.86721 20.6685H21.7875L21.7477 20.6367C22.6299 14.3999 16.6648 11.3371 21.023 13.2619C19.1507 8.72888 13.3795 7.25391 17.4516 7.72438C15.3567 5.80915 12.7152 4.7506 8.95939 5.41974C8.16151 4.25471 6.25264 1.77047 6.83754 4.74583L5.88072 3.89232L5.82827 6.89471C4.69026 7.76252 4.0688 10.6536 3.18827 12.5339C2.43489 13.2809 2.14562 14.1742 2.38562 15.5633C3.5586 17.0748 5.41026 16.6997 5.6741 14.7877Z'
                    fill='white'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_809_275'>
                    <rect
                      width='19.5306'
                      height='17.3293'
                      fill='white'
                      transform='translate(2.30469 3.33765)'
                    />
                  </clipPath>
                </defs>
              </svg>
              <span>Cavalos</span>
            </a>
          </li>
          <li>
            <a href={paths.color}>
              <FormatPaintOutlined />
              <span>Cor</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <PetsOutlined />
              <span>Raça</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <EqualizerOutlined />
              <span>Andamento</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <PeopleOutline />
              <span>Usuários</span>
            </a>
          </li>
        </ul>
      </nav>
      <Outlet />
    </S.Container>
  );
}
