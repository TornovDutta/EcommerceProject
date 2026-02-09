import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(JSON.parse(sessionStorage.getItem("token")) || null);
    const [id, setId] = useState(JSON.parse(sessionStorage.getItem("cbid")) || null); // cbid = codebook id

    const navigate = useNavigate();

    function login(data) {
        setToken(data.accessToken);
        setId(data.user.id);
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    }

    function logout() {
        setToken(null);
        setId(null);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("cbid");
        navigate("/");
    }

    async function register(authDetail) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authDetail)
        }

        try {
            const response = await fetch("/register", requestOptions);
            if (!response.ok) {
                throw { message: response.statusText, status: response.status }; //eslint-disable-line
            }
            const data = await response.json();

            if (data.accessToken) {
                login(data);
                navigate("/products");
                toast.success("Account Created Successfully!");
            } else {
                toast.error(data);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    async function credentialLogin(authDetail) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authDetail)
        }
        try {
            const response = await fetch("/login", requestOptions);
            if (!response.ok) {
                throw { message: response.statusText, status: response.status }; //eslint-disable-line
            }
            const data = await response.json();

            if (data.accessToken) {
                login(data);
                navigate("/products");
                toast.success("Logged In Successfully!");
            } else {
                toast.error(data);
            }
        } catch (error) {
            toast.error("Please check your email and password");
        }
    }

    const value = {
        token,
        id,
        login,
        logout,
        register,
        credentialLogin
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
