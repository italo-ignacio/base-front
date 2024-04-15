import { type FC, useEffect, useState } from 'react';
import { Footer, Header } from 'presentation/atomic-component/organism';
import { Outlet, useLocation } from 'react-router-dom';

export const MainTemplate: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [headerIsBig, setHeaderIsBig] = useState(true);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > 100) setHeaderIsBig(false);
      else setHeaderIsBig(true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerIsBig]);

  return (
    <div className={'flex flex-col w-full h-full min-h-dvh'} id={'main'}>
      <Header headerIsBig={headerIsBig} />

      <main
        className={'flex flex-col p-2 h-full min-h-[calc(100dvh-140px)]'}
        style={{
          marginBottom: '46px',
          marginTop: headerIsBig ? '94px' : '80px',
          transition: 'all 200ms'
        }}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
