import React from "react";

const AuthContext = React.createContext<{
    isAuthenticated: boolean,
    setAuthenticated: any,
    user: any
}>({
    isAuthenticated: false,
    setAuthenticated: () => {},
    user: {}
});

export const AuthProvider = ({ children, authed, user }: { children: any, authed: boolean, user: any }) => {
    const [isAuthenticated, setAuthenticated] = React.useState(authed);
    
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setAuthenticated,
                user
            } as any}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = React.useContext(AuthContext);
    if(!ctx) throw new Error("pls use auth provider");

    return ctx;
}

export function useIsAuthenticated() {
    const ctx = useAuth();
    return ctx.isAuthenticated;
}
