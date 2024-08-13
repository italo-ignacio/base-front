import { Button } from '@mui/material';
import { useCallback, useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';

interface LoadMoreButtonProps {
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isFetching: boolean;
}

export const LoadMoreButton: FC<LoadMoreButtonProps> = ({
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage
}) => {
  const buttonRef = useRef(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (
        entry.isIntersecting &&
        fetchNextPage &&
        hasNextPage &&
        !isFetching &&
        !isFetchingNextPage
      )
        fetchNextPage();
    },
    [fetchNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-200px',
      threshold: 0.1
    });

    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => {
      if (buttonRef.current) observer.unobserve(buttonRef.current);
    };
  }, [buttonRef, handleIntersection]);

  if (isFetchingNextPage)
    return (
      <div className={'flex justify-center'}>
        <Button sx={{ textTransform: 'none' }}>
          <span>Buscando</span>
          <span className={'ml-1'} />

          <span
            className={'animate-bounce max-h-[16px] -mt-[10px]'}
            style={{ animationDelay: '0s' }}
          >
            .
          </span>

          <span
            className={'animate-bounce max-h-[16px] -mt-[10px]'}
            style={{ animationDelay: '0.1s' }}
          >
            .
          </span>

          <span
            className={'animate-bounce max-h-[16px] -mt-[10px]'}
            style={{ animationDelay: '0.2s' }}
          >
            .
          </span>
        </Button>
      </div>
    );

  if (hasNextPage)
    return (
      <div className={'flex justify-center'}>
        <Button
          onClick={(): void => {
            if (fetchNextPage && hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          ref={buttonRef}
          sx={{ textTransform: 'none' }}
        >
          Buscar mais
        </Button>
      </div>
    );

  return null;
};
