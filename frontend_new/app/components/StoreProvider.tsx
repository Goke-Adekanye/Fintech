"use client";

import { FC, createContext, useReducer } from "react";
import { UserType } from "./hocs/withAuth";

interface storeProps {
  activeUser: UserType | null;
}

const initialState: storeProps = {
  activeUser: null,
};

export enum ActionTypes {
  UpdateUser = "UpdateUser",
}

type ActionTYpe = {
  type: ActionTypes.UpdateUser;
  payload: UserType | null;
};

const reducer = (state: storeProps, action: ActionTYpe): storeProps => {
  if (action.type === ActionTypes.UpdateUser) {
    return {
      ...state,
      activeUser: action.payload,
    };
  }

  return state;
};

export const store = createContext<{
  state: storeProps;
  dispatch: (t: ActionTYpe) => void;
}>({ state: initialState, dispatch: () => null });

const StoreProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { Provider } = store;

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export default StoreProvider;
