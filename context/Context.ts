import React, { Dispatch, SetStateAction } from 'react';
import { UsersPermissionsUser } from '../common/types';

type ContextProps = {
  user: UsersPermissionsUser | null;
  isAuthenticated: boolean;
  setUser: Dispatch<SetStateAction<null>>;
};

const Context = React.createContext<Partial<ContextProps>>({
  isAuthenticated: false,
});

export default Context;
