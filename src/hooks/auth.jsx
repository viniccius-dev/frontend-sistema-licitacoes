import { createContext, useContext, useState, useEffect } from "react";

import { api } from "../services/api";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    async function signIn({ email, password }) {
        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token } = response.data;
    
            localStorage.setItem("@biddingsnew:user", JSON.stringify(user));
            localStorage.setItem("@biddingsnew:token", token);
    
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({ user, token });
        } catch(error) {
            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possivel entrar.");
            }
        }
    }

    async function signOut() {
        localStorage.removeItem("@biddingsnew:user");
        localStorage.removeItem("@biddingsnew:token");
        
        setData({});
    }

    async function updateProfile({ user, sessionUpdated }) {
        try {
            await api.put("/users", user);

            if(sessionUpdated) {
                localStorage.setItem("@biddingsnew:user", JSON.stringify(sessionUpdated));
                setData({ user: sessionUpdated, token: data.token });
            }
            alert("Perfil atualizado!");
        } catch(error) {
            if(error.response) {
                alert(error.response.data.message);
            } else {
                alert("Não foi possível atualizar o perfil.");
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("@biddingsnew:token");
        const user = localStorage.getItem("@biddingsnew:user");

        if(token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({
                token,
                user: JSON.parse(user)
            })
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value ={{
            signIn,
            signOut,
            updateProfile,
            user: data.user,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuth() {
    const context = useContext(AuthContext);

    return context;
}

export { AuthProvider, useAuth };