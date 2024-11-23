// import React, {createContext, useState, useContext, useEffect} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {setValueAsyncStorage} from '../utilities/set-variable-async-storage.utility';
// import {getAsyncStorageValue} from '../utilities/get-async-storage-contents.utility';

// interface AuthContextProps {
//   isAuthenticated: boolean | null;
//   isLoadingAuth: boolean | null;
//   login: (token: string) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextProps>({
//   isAuthenticated: false,
//   isLoadingAuth: null,
//   login: async () => {},
//   logout: async () => {},
// });

// export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
//   children,
// }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
//   const [isLoadingAuth, setIsLoadingAuth] = useState<boolean | null>(null);

//   //   useEffect(() => {
//   //     const checkToken = async () => {
//   //       const token = await getAsyncStorageValue('token');
//   //       if(token) setIsAuthenticated(true);
//   //       setIsLoadingAuth(false);
//   //     };
//   //     console.log('isAuthenticated: ', isAuthenticated);
//   //     checkToken();
//   //   }, []);

//   const checkToken = async () => {
//     const token = await getAsyncStorageValue('token');
//     if (token) setIsAuthenticated(true);
//     setIsLoadingAuth(false);
//   };
//   checkToken();

//   const login = async (token: string) => {
//     setIsLoadingAuth(true);
//     await setValueAsyncStorage('token', token);
//     setIsAuthenticated(true);
//     setIsLoadingAuth(false);
//   };

//   const logout = async () => {
//     setIsLoadingAuth(true);
//     await AsyncStorage.removeItem('token');
//     setIsAuthenticated(false);
//     setIsLoadingAuth(false);
//   };

//   return (
//     <AuthContext.Provider
//       value={{isAuthenticated, isLoadingAuth, login, logout}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
