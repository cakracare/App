import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserSchema } from "../Types";

// @ts-ignore
const initialUser: User = {
    nama_lengkap: '',
    email: '',
    role: 'siswa',
    photoURL: '',
    usia: '',
    kelas: '',
    asal_sekolah: '',
    gender: 'male',
    no_ortu: '',
};

interface UserContextProps {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(initialUser);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
