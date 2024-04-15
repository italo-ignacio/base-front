import { ErrorDiv, FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { paths } from 'main/config';
import { useLogin } from 'data/use-case';
import { useState } from 'react';
import type { FC } from 'react';

export const LoginForm: FC = () => {
  const { handleSubmit, onSubmit, register, errors, getValues, errorMessage, isSubmitting } =
    useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={'flex flex-col gap-4 w-full'} onSubmit={handleSubmit(onSubmit)}>
      <LabelInput
        error={!!errors.email}
        label={'E-mail'}
        placeholder={'Digite seu e-mail'}
        register={register('email')}
        type={'email'}
      />

      <LabelInput
        EndIcon={
          <InputAdornment position={'end'}>
            <IconButton onClick={handleClickShowPassword} tabIndex={-1}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        error={!!errors.password}
        label={'Senha'}
        placeholder={'Digite sua senha'}
        register={register('password')}
        type={showPassword ? 'text' : 'password'}
      />

      <div className={'flex justify-end text-sm -mt-2'}>
        <Link
          className={'cursor-pointer hover:underline underline-offset-2 text-primary font-bold'}
          onClick={(): void => {
            localStorage.setItem('recover_email', getValues('email'));
          }}
          to={paths.recoverPassword}
        >
          Esqueceu sua senha?
        </Link>
      </div>

      <div className={'flex flex-col gap-4 mt-2'}>
        <FormButton isSubmitting={isSubmitting} label={'Entrar'} />
        {errorMessage ? <ErrorDiv text={errorMessage} /> : null}

        <div className={'flex gap-1'}>
          <span>Não possui uma conta?</span>

          <Link
            className={
              'font-semibold hover:underline underline-offset-2 cursor-pointer text-primary'
            }
            to={paths.register}
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </form>
  );
};
