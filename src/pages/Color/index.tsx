import { AddOutlined } from '@mui/icons-material';
import { Button } from '../../components/Button';
import { PageHeader } from '../../components/PageHeader';
import * as S from './styles';

export function Color() {
  return (
    <S.Container>
      <PageHeader
        title='Cores'
        description='Gerencie as cores que serão vinculadas aos cavalos.'
      >
        <Button>
          <AddOutlined />
          <span>Adicionar</span>
        </Button>
      </PageHeader>
    </S.Container>
  );
}
