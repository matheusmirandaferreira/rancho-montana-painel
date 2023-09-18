import { Link } from 'react-router-dom';
import { paths } from '../../routes';

import * as S from './styles';

export function SidebarMenu() {
  return (
    <S.Container open={true}>
      <nav>
        <div className='title'>
          <ul>
            <li>
              <Link to='#'>
                <span>Menu</span>
              </Link>
            </li>
          </ul>
        </div>
        <ul>
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
