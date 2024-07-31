import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserSchema } from "../Types";

const initialUser: User = {
    alamat_lengkap: "",
    password: "",
    nama_lengkap: '',
    email: '',
    role: 'siswa',
    photoURL: '',
    usia: '',
    kelas: '',
    asal_sekolah: '',
    gender: 'male',
    no_ortu: ''
};

interface UserContextProps {
    user: User | undefined;
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(initialUser);

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
