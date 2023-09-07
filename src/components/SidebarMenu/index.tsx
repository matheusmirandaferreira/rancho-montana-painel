import { paths } from '../../routes';

import * as S from './styles';

export function SidebarMenu() {
  return (
    <S.Container open={true}>
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
            <a href={paths.user}>
              {/* <PeopleOutline /> */}
              <span>Usuários</span>
            </a>
          </li>
        </ul>
      </nav>
    </S.Container>
  );
}
