import { ActionModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { paths } from 'main/config';
import { useEffect, useState } from 'react';
import { useModal } from 'data/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoverPassword } from 'data/use-case';
import type { FC } from 'react';

export const RecoverPasswordForm: FC = () => {
  const { closeModal, isOpen, openModal } = useModal();
  const params = useParams() as { code: string };
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { handleSubmit, onSubmit, register, errors, setValue, isSubmitting } = useRecoverPassword({
    openModal
  });

  useEffect(() => {
    setValue('code', params.code, {
      shouldValidate: true
    });
  }, [setValue, params.code]);

  return (
    <div className={'flex flex-col gap-8'}>
      <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
        <LabelInput
          EndIcon={
            <InputAdornment position={'end'}>
              <IconButton onClick={(): void => setShowPassword(!showPassword)} tabIndex={-1}>
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

        <FormButton isSubmitting={isSubmitting} label={'Redefinir senha'} />
      </form>

      <Button onClick={openModal}>modal</Button>

      <ActionModal
        confirmAction={(): void => navigate(paths.login)}
        confirmText={'Ir para Login'}
        modal={{
          closeModal,
          isOpen,
          openModal
        }}
        subtitle={
          'Seus dados foram salvos com sucesso, agora você pode retornar e realizar seu login.'
        }
        title={'Senha redefinida com sucesso'}
        type={'success'}
      />
    </div>
  );
};
