import { LoginForm } from 'presentation/atomic-component/molecule/form';
import type { FC } from 'react';

export const AuthContent: FC = () => {
  return (
    <div
      className={
        'flex flex-col gap-8 overflow-auto justify-center tablet:w-[400px] mx-6 tablet:mx-auto'
      }
    >
      <div className={'flex flex-col gap-2'}>
        <h2 className={'font-bold text-lg'}>Entrar</h2>
        <p>Insira seu e-mail e sua senha e acesse sua conta</p>
      </div>

      <LoginForm />
    </div>
  );
};
