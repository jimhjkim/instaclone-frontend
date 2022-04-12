import styled from 'styled-components';
import { BaseBox } from '../shared';

const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 0px 10px 0px;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const FormBox = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

type Props = {
  children: React.ReactNode;
};

export default FormBox;
