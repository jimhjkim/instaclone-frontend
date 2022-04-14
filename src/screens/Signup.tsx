import { gql, useMutation } from '@apollo/client';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
import Input from '../components/auth/Input';
import PageTitle from '../components/PageTitle';
import { FatLink } from '../components/shared';
import routes from '../routes';

interface FormInputs {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  createAccountResult?: string;
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  width: 65%;
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted: ({ createAccount: { ok, error } }) => {
      if (!ok) {
        return setError('createAccountResult', {
          message: error,
        });
      }
      navigate(routes.home);
    },
  });
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid, isDirty },
  } = useForm<FormInputs>({ mode: 'onChange' });
  const onSubmitValid = () => {
    if (loading) {
      return;
    }
    const data = getValues();
    createAccount({
      variables: { ...data },
    });
  };
  const clearCreateAccountError = () => clearErrors('createAccountResult');

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('firstName', {
              required: 'First name is required.',
              onChange: clearCreateAccountError,
            })}
            name="firstName"
            type="text"
            placeholder="First Name"
            hasError={Boolean(errors?.firstName?.message)}
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            {...(register('lastName'), { onChange: clearCreateAccountError })}
            name="lastName"
            type="text"
            placeholder="Last Name"
            hasError={Boolean(errors?.lastName?.message)}
          />
          <FormError message={errors?.lastName?.message} />
          <Input
            {...register('email', {
              required: 'Email is required.',
              onChange: clearCreateAccountError,
            })}
            name="email"
            type="text"
            placeholder="Email"
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register('username', {
              required: 'Username is required.',
              onChange: clearCreateAccountError,
            })}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register('password', {
              required: 'Password is required.',
              onChange: clearCreateAccountError,
            })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? 'Loading...' : 'Sign up'}
            disabled={!isValid || loading || !isDirty}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
};
export default SignUp;
