"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the Shape of a User Profile
interface UserProfile {
    ventureName: string;
    stage: 'Idea' | 'Prototype' | 'Revenue';
    status: 'Student' | 'Individual' | 'Pvt Ltd' | 'Researcher';
    domain: 'DeepTech' | 'Agri' | 'Generic';
}

interface AuthContextType {
    user: any;
    profile: UserProfile;
    updateProfile: (newProfile: Partial<UserProfile>) => void;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>({ name: "Founder", email: "demo@grantmatch.ai" });

    // DEFAULT PROFILE (The "Truth" used for scoring)
    const [profile, setProfile] = useState<UserProfile>({
        ventureName: "BlueGuard-AI",
        stage: "Prototype",
        status: "Student",
        domain: "DeepTech"
    });

    const login = () => setUser({ name: "Founder", email: "demo@grantmatch.ai" });
    const logout = () => setUser(null);

    const updateProfile = (newData: Partial<UserProfile>) => {
        setProfile(prev => ({ ...prev, ...newData }));
    };

    return (
        <AuthContext.Provider value={{ user, profile, updateProfile, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
