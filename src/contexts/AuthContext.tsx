
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'artist' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users for demonstration - initial users
const initialMockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@artistly.com', password: 'admin123', role: 'admin' as const },
  { id: '2', name: 'Manager', email: 'manager@artistly.com', password: 'manager123', role: 'manager' as const },
  { id: '3', name: 'Artist', email: 'artist@artistly.com', password: 'artist123', role: 'artist' as const },
  { id: '4', name: 'User', email: 'user@artistly.com', password: 'user123', role: 'user' as const }
];

// Get users from localStorage or use initial users
const getMockUsers = () => {
  const storedUsers = localStorage.getItem('artistly_users');
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  localStorage.setItem('artistly_users', JSON.stringify(initialMockUsers));
  return initialMockUsers;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('artistly_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUsers = getMockUsers();
    const foundUser = mockUsers.find((u: any) => 
      u.email === email && u.password === password && u.role === role
    );
    
    if (foundUser) {
      const userWithoutPassword = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role
      };
      setUser(userWithoutPassword);
      localStorage.setItem('artistly_user', JSON.stringify(userWithoutPassword));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string, role: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUsers = getMockUsers();
    
    // Check if email already exists
    const existingUser = mockUsers.find((u: any) => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: role as 'admin' | 'manager' | 'artist' | 'user'
    };
    
    // Add to users array and save to localStorage
    const updatedUsers = [...mockUsers, newUser];
    localStorage.setItem('artistly_users', JSON.stringify(updatedUsers));
    
    // Log in the new user
    const userWithoutPassword = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    
    setUser(userWithoutPassword);
    localStorage.setItem('artistly_user', JSON.stringify(userWithoutPassword));
    
    console.log('New user registered:', userWithoutPassword);
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('artistly_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
