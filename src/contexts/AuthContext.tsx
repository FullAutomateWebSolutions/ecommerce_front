import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { loginStore } from '@/store/useStore';

interface AuthContextProps {
  use: any;
  loading: boolean;
  role: string[] | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  use: null,
  loading: true,
  role: null,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { userSing, fech, user } = loginStore();
  const [use, setUse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string[] | null>([]);

  useEffect(() => {
    if (user?.token && userSing?.emailVerified === true) {
      // já tem dados persistidos, só seta
      setUse(user);
      setRole([...userSing?.customClaims?.role || []]);
      setLoading(false);
      // opcional: atualiza dados do firebase
      fech(); 
    } else {
      setUse(null);
      setRole(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userSing?.uid && userSing?.emailVerified === true) {
      setUse(userSing);
      setRole([...userSing?.customClaims?.role || []]);
      setLoading(false);
    }
  }, [userSing]);

  return (
    <AuthContext.Provider value={{ use, loading, role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


///////////////////////////////////////////////////////////////
// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { loginStore } from "@/store/useStore";

// interface AuthContextProps {
//   user: any;
//   loading: boolean;
//   role: string[] | null;
// }

// const AuthContext = createContext<AuthContextProps>({
//   user: null,
//   loading: true,
//   role: null,
// });

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const { userSing, fech, user } = loginStore();
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [role, setRole] = useState<string[] | null>(null);

//   useEffect(() => {
//     if (user?.token && userSing?.emailVerified === true) {
//       setCurrentUser(user);
//       setRole(userSing?.customClaims?.role ?? []);
//       setLoading(false);
//       fech();
//     } else {
//       setCurrentUser(null);
//       setRole(null);
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (userSing?.uid && userSing?.emailVerified === true) {
//       setCurrentUser(userSing);
//       setRole(userSing?.customClaims?.role ?? []);
//       setLoading(false);
//     }
//   }, [userSing]);

//   return (
//     <AuthContext.Provider value={{ user: currentUser, loading, role }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
