import { gql, useMutation } from '@apollo/client';
import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { Location, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { handleLogin } from '../apollo';
import AuthLayout from '../components/auth/AuthLayout';
import BottomBox from '../components/auth/BottomBox';
import Button from '../components/auth/Button';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
import Input from '../components/auth/Input';
import Separator from '../components/auth/Separator';
import PageTitle from '../components/PageTitle';
import routes from '../routes';

interface FormInputs {
  username: string;
  password: string;
  loginResult?: string;
}

interface LocationState {
  message?: string;
  username?: string;
  password?: string;
}

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location: Location = useLocation();
  const state = location.state as LocationState;
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid, isDirty },
  } = useForm<FormInputs>({
    mode: 'onChange',
    defaultValues: {
      username: state?.username || '',
      password: state?.password || '',
    },
  });
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: ({ login: { ok, error, token } }) => {
      if (!ok) {
        return setError('loginResult', {
          message: error,
        });
      }
      if (token) {
        handleLogin(token);
      }
    },
  });
  const onSubmitValid = () => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  const clearLoginError = () => clearErrors('loginResult');

  return (
    <AuthLayout>
      <PageTitle title=" Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register('username', {
              required: 'Username is required.',
              minLength: {
                value: 5,
                message: 'Username should be longer than 5 characters.',
              },
              onChange: clearLoginError,
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
              onChange: clearLoginError,
            })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? 'Loading... ' : 'Log in'}
            disabled={!isValid || loading || !isDirty}
          />
          <FormError message={errors?.loginResult?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
};

export default Login;
