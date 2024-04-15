import { ActionModal } from 'presentation/atomic-component/molecule/modal/action-confirmation';
import { ArrowBack } from '@mui/icons-material';
import { Button } from '@mui/material';
import { FormButton, LabelInput } from 'presentation/atomic-component/atom';
import { Link, useNavigate } from 'react-router-dom';
import { paths } from 'main/config';
import { useEffect } from 'react';
import { useModal } from 'data/hooks';
import { useSendEmail } from 'data/use-case';
import type { FC } from 'react';

export const SendEmailForm: FC = () => {
  const { closeModal, isOpen, openModal } = useModal();
  const navigate = useNavigate();

  const { handleSubmit, onSubmit, register, errors, setValue, isSubmitting } = useSendEmail({
    openModal
  });

  useEffect(() => {
    const email = localStorage.getItem('recover_email');

    if (email && email !== 'undefined' && email !== 'null')
      setValue('email', email, {
        shouldValidate: true
      });
  }, []);

  return (
    <div className={'flex flex-col gap-8'}>
      <form className={'flex flex-col gap-4'} onSubmit={handleSubmit(onSubmit)}>
        <LabelInput
          error={!!errors.email}
          label={'E-mail'}
          placeholder={'Digite seu e-mail cadastrado no sistema'}
          register={register('email')}
          type={'email'}
        />

        <FormButton isSubmitting={isSubmitting} label={'Redefinir senha'} />
      </form>

      <Button onClick={openModal}>modal</Button>

      <span>
        <Link
          className={
            'font-semibold hover:underline underline-offset-2 cursor-pointer text-center flex gap-2 items-center'
          }
          to={paths.login}
        >
          <ArrowBack />
          Voltar para login
        </Link>
      </span>

      <ActionModal
        confirmAction={(): void => {
          navigate(paths.login);
        }}
        confirmText={'Entendido!'}
        modal={{
          closeModal,
          isOpen,
          openModal
        }}
        subtitle={
          'Verifique sua caixa de entrada, spam ou lixeira. Caso seu e-mail exista em nossa base de dados um e-mail será enviado'
        }
        title={'Link de recuperação enviado'}
        type={'success'}
      />
    </div>
  );
};
