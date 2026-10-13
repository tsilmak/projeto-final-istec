import { createContext, useContext, type ReactNode } from 'react';

export type HomeFeed = 'Amigos' | 'Ginásio';

type HomeFeedContextValue = {
  activeFeed: HomeFeed;
  setActiveFeed: (feed: HomeFeed) => void;
};

const HomeFeedContext = createContext<HomeFeedContextValue | null>(null);

export function HomeFeedProvider({
  value,
  children,
}: {
  value: HomeFeedContextValue;
  children: ReactNode;
}) {
  return <HomeFeedContext.Provider value={value}>{children}</HomeFeedContext.Provider>;
}

export function useHomeFeed() {
  const context = useContext(HomeFeedContext);

  if (!context) {
    throw new Error('useHomeFeed tem de ser usado dentro de HomeFeedProvider');
  }

  return context;
}
