import React from "react";

const AuthContext = React.createContext({
    isAuthenticated: false,
    setAuthenticated: () => {}
});

export const AuthProvider = ({ children, authed }: { children: any, authed: boolean }) => {
    const [isAuthenticated, setAuthenticated] = React.useState(authed);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setAuthenticated
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
