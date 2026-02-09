import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    token: JSON.parse(sessionStorage.getItem("token")) || null,
    id: JSON.parse(sessionStorage.getItem("cbid")) || null,
    loading: false,
    error: null
}

export const registerUser = createAsyncThunk(
    "auth/register",
    async (authDetail, { rejectWithValue }) => {
        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(authDetail)
            }
            const response = await fetch("http://localhost:8000/register", requestOptions);
            if (!response.ok) {
                throw { message: response.statusText, status: response.status }; //eslint-disable-line
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Registration failed");
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (authDetail, { rejectWithValue }) => {
        try {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(authDetail)
            }
            const response = await fetch("http://localhost:8000/login", requestOptions);
            if (!response.ok) {
                throw { message: response.statusText, status: response.status }; //eslint-disable-line
            }
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Login failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.token = null;
            state.id = null;
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("cbid");
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.accessToken) {
                    state.token = action.payload.accessToken;
                    state.id = action.payload.user.id;
                    sessionStorage.setItem("token", JSON.stringify(action.payload.accessToken));
                    sessionStorage.setItem("cbid", JSON.stringify(action.payload.user.id));
                    toast.success("Account Created Successfully!");
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            // Login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.accessToken) {
                    state.token = action.payload.accessToken;
                    state.id = action.payload.user.id;
                    sessionStorage.setItem("token", JSON.stringify(action.payload.accessToken));
                    sessionStorage.setItem("cbid", JSON.stringify(action.payload.user.id));
                    toast.success("Logged In Successfully!");
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                toast.error(action.payload);
            });
    }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
