// AuthProvider.tsx
'use client'
import { AuthProvider } from "@/components/AuthContext";  // Or the correct path

const AuthProviderComponent = ({ children }) => {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default AuthProviderComponent;
