import { ActionModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { paths } from 'main/config';
import { useModal } from 'data/hooks';
import { useRegister } from 'data/use-case';
import { useState } from 'react';
import type { FC } from 'react';

export const RegisterForm: FC = () => {
  const successModal = useModal();
  const errorModal = useModal();

  const { handleSubmit, onSubmit, register, errors, isSubmitting } = useRegister({
    openErrorModal: errorModal.openModal,
    openSuccessModal: successModal.openModal
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <ActionModal
        confirmAction={(): void => navigate(paths.login)}
        confirmText={'Ir para Login'}
        modal={successModal}
        subtitle={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor, nibh id tincidunt lacinia, tortor elit cursus purus, vitae consequat lorem tortor vel odio. Quisque sed iaculis urna.'
        }
        title={'Dados cadastrados com sucesso'}
        type={'success'}
      />

      <ActionModal
        confirmAction={(): void => {
          document.getElementById('form-button')?.click();
          errorModal.closeModal();
        }}
        modal={errorModal}
        subtitle={'Ocorreu um problema ao salvar seus dados cadastrais, por favor tente novamente.'}
        title={'Não foi possível te cadastrar'}
        type={'error'}
      />

      <form className={'flex flex-col gap-4 w-full'} onSubmit={handleSubmit(onSubmit)}>
        <LabelInput
          error={!!errors.fullName}
          label={'Nome Completo'}
          placeholder={'Digite seu nome completo'}
          register={register('fullName')}
        />

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

        <LabelInput
          EndIcon={
            <InputAdornment position={'end'}>
              <IconButton
                onClick={(): void => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          error={!!errors.passwordConfirmation}
          label={'Digite novamente a senha'}
          placeholder={'Digite novamente sua senha'}
          register={register('passwordConfirmation')}
          type={showConfirmPassword ? 'text' : 'password'}
        />

        <LabelInput
          error={!!errors.phone}
          label={'Telefone'}
          mask={'(00) 00000-0000'}
          placeholder={'(00) 00000-0000'}
          register={register('phone')}
        />

        <LabelInput
          error={!!errors.entity}
          label={'Entidade'}
          placeholder={'Digite a entidade'}
          register={register('entity')}
        />

        <LabelInput
          error={!!errors.occupation}
          label={'Cargo'}
          placeholder={'Digite o cargo'}
          register={register('occupation')}
        />

        <div />
        <FormButton isSubmitting={isSubmitting} label={'Cadastrar'} />
      </form>

      <div className={'flex gap-1 border-t-2 border-gray-250 py-3 mt-3 w-full'}>
        <span>Já tem uma conta ?</span>

        <Link
          className={'font-semibold hover:underline underline-offset-2 cursor-pointer'}
          to={paths.login}
        >
          Fazer login
        </Link>
      </div>

      <div className={'flex flex-row gap-4 w-full justify-center items-center mt-4'}>
        <Button
          onClick={(): void => {
            successModal.openModal();
          }}
        >
          Modal Sucesso
        </Button>

        <Button
          onClick={(): void => {
            errorModal.openModal();
          }}
        >
          Modal Erro
        </Button>
      </div>
    </div>
  );
};
