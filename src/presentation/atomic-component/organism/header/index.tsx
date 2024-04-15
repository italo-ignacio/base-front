import { Collapse, Divider, IconButton, List, ListItemButton } from '@mui/material';
import { ExpandMore, Logout, People, Person, SignalCellularAlt } from '@mui/icons-material';
import { type FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { colors } from 'presentation/style';
import { paths } from 'main/config';
import Avatar from '@mui/material/Avatar';

interface HeaderProps {
  headerIsBig: boolean;
}

export const Header: FC<HeaderProps> = ({ headerIsBig }) => {
  const [showUser, setShowUser] = useState(false);
  const { pathname } = useLocation();

  useEffect((): void => {
    if (showUser) setShowUser(false);
  }, [pathname]);

  return (
    <header
      className={
        'fixed top-0 z-20 bg-white flex justify-between px-8 pt-4 shadow-[0px_0px_3px_2px_#0000001d] w-screen'
      }
      style={{
        height: headerIsBig ? '94px' : '80px',
        transition: 'all  200ms'
      }}
    >
      <div>
        <Link to={paths.home}>
          <img
            alt={'logo'}
            className={'rounded-full w-[48px] cursor-pointer'}
            onClick={(): void => {
              window.scrollTo({
                behavior: 'smooth',
                top: 0
              });
            }}
            src={'/logo.jpg'}
            style={{
              marginTop: headerIsBig ? '8px' : '2px',
              transition: 'all 200ms'
            }}
          />
        </Link>
      </div>

      <Collapse
        className={'bg-white max-w-[235px]'}
        collapsedSize={'48px'}
        in={showUser}
        sx={{
          marginTop: headerIsBig ? '8px' : '0',
          transition: 'all  150ms'
        }}
      >
        <div
          className={'flex flex-col'}
          style={{
            gap: headerIsBig ? '22px' : '16px',
            transition: 'all  150ms'
          }}
        >
          <div
            className={
              'flex bg-white justify-between gap-2 items-center ml-auto h-[48px] rounded-3xl'
            }
          >
            <Avatar>U</Avatar>

            <div
              className={'flex flex-col gap-1'}
              style={{
                opacity: showUser ? 'initial' : '0',
                transition: 'all  200ms',
                width: showUser ? '125px' : '0px'
              }}
            >
              <span className={'font-semibold text-xs'}>Usuário</span>
              <span className={'text-gray-550 text-xs'}>Trabalhador</span>
            </div>

            <IconButton
              onClick={(): void => {
                setShowUser(!showUser);
              }}
            >
              <ExpandMore
                color={'inherit'}
                sx={{
                  rotate: showUser ? '180deg' : '0deg',
                  transition: 'all  200ms'
                }}
              />
            </IconButton>
          </div>

          <List
            className={'flex bg-white flex-col gap-1 border-2 border-t-0 text-sm text-gray-700'}
            sx={{
              padding: '4px 0px'
            }}
          >
            <ListItemButton
              className={'gap-2'}
              sx={{
                fontSize: '14px'
              }}
            >
              <Person
                sx={{
                  color: colors.gray[550],
                  fontSize: '16px'
                }}
              />
              Cadastrar Usuário
            </ListItemButton>

            <Link to={paths.home}>
              <ListItemButton className={'gap-2'}>
                <Person
                  sx={{
                    color: colors.gray[550],
                    fontSize: '16px'
                  }}
                />

                <span>Cadastrar Palavra-Chave</span>
              </ListItemButton>
            </Link>

            <Link to={paths.home}>
              <ListItemButton className={'gap-2'}>
                <People
                  sx={{
                    color: colors.gray[550],
                    fontSize: '16px'
                  }}
                />
                Parlamentares
              </ListItemButton>
            </Link>

            <Link to={paths.home}>
              <ListItemButton className={'gap-2'}>
                <Person
                  sx={{
                    color: colors.gray[550],
                    fontSize: '16px'
                  }}
                />

                <span>Autoridade de Agências</span>
              </ListItemButton>
            </Link>

            <Divider
              sx={{
                border: `1px solid ${colors.gray[200]}`
              }}
            />

            <ListItemButton className={'border-t-2 gap-2'}>
              <SignalCellularAlt
                sx={{
                  color: colors.gray[550],
                  fontSize: '16px'
                }}
              />
              Analytics Termos mais pesquisados
            </ListItemButton>

            <Divider
              sx={{
                border: `1px solid ${colors.gray[200]}`
              }}
            />

            <Link to={paths.login}>
              <ListItemButton className={'border-t-2 gap-2'}>
                <Logout
                  sx={{
                    color: colors.gray[550],
                    fontSize: '16px'
                  }}
                />
                Sair
              </ListItemButton>
            </Link>
          </List>
        </div>
      </Collapse>
    </header>
  );
};
