import { RouterOutputs, trpc } from '@web/api';
import { clearJWT, setJWT } from '@web/utility/localStorage';
import React, { useEffect, useState } from 'react';

type CurrentUser = RouterOutputs['currentUser'] | null;

export type UserContextType = {
  currentUser: CurrentUser;
  setCurrentUser: (user: CurrentUser) => void;
  login: (jwt: string) => void;
  logout: () => void;
  refetch: () => void;
};

type UserContextProviderProps = React.PropsWithChildren<{
  refreshTRPCClient: () => Promise<void>;
}>;

export const UserContext = React.createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
  login: () => {},
  logout: () => {},
  refetch: () => {}
});

export const UserContextProvider = ({
  children,
  refreshTRPCClient
}: UserContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const { data, isLoading, refetch } = trpc.currentUser.useQuery();

  useEffect(() => {
    if (!isLoading) {
      setCurrentUser(data ? data : null);
      setInitialLoading(false);
    }
  }, [data, isLoading]);

  async function login(jwt: string) {
    setJWT(jwt);
    await refreshTRPCClient();
    refetch();
  }

  const logout = async () => {
    clearJWT();
    setCurrentUser(null);
  };

  // TODO: Add a loading spinner
  if (isLoading || initialLoading) return null;

  return (
    <UserContext.Provider
      value={{
        // There is a delay between currentUser state and data frm useQuery. We should always use currentUser state if it's set
        currentUser: currentUser || null,
        login,
        logout,
        refetch,
        setCurrentUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  const userCtx = React.useContext(UserContext);

  if (!userCtx) {
    throw new Error('useUser must be used within a UserContextProvider');
  }

  return userCtx;
}

// Should be used everywhere where the session is required
export function useCurrentUser() {
  const { currentUser } = useUserContext();

  if (currentUser === null) {
    throw new Error('useCurrentUser must be used within a UserContextProvider');
  }

  return currentUser;
}
