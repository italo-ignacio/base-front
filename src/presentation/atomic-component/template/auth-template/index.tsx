import { type FC, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export const AuthTemplate: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      className={
        'min-h-dvh grid laptop:grid-cols-[25%_75%] w-full laptop:min-h-screen bg-white overflow-auto laptop:overflow-hidden'
      }
    >
      <div className={'hidden laptop:flex w-full h-full items-center justify-center relative'}>
        <div className={'h-full w-full bg-[#ff000027] z-10 absolute top-0 left-0'} />

        <img
          alt={'logo fiesp'}
          className={'laptop:min-h-screen border-b-[10px] border-red'}
          src={'/fiesp.jpg'}
        />
      </div>

      <Outlet />
    </div>
  );
};
