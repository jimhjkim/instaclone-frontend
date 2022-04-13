import styled from 'styled-components';
import { BaseBox } from '../shared';

interface FormBoxProps {
  children: React.ReactNode;
}
const Container = styled(BaseBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 0px 10px 0px;
  form {
    width: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const FormBox = ({ children }: FormBoxProps) => {
  return <Container>{children}</Container>;
};

export default FormBox;
