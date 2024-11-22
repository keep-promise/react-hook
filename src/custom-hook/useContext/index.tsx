import useUpdate from '@/hooks/useUpdate';
import { createContext, useContext, useMemo, useRef } from 'react';


const DataContext = createContext<IDataContext>({
  data1: [],
  data2: [],
});

export function useDataContext() {
  return useContext(DataContext);
}

export function DataContextProvider({ children }) {
  const contextRef = useRef<IPermissionContext>({});
  const [, update] = useUpdate();

  const value = useMemo(() => {
    const setContext = (context) => {
      const currentContext = contextRef.current;
      Object.assign(currentContext, context);
      update();
    };

    const currentContext = contextRef.current;
    currentContext.setContext = setContext;
    return currentContext;
  }, []);

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}
