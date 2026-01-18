import { createSlice } from '@reduxjs/toolkit';

// Load user from localStorage if available
const loadUserFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('user');
    if (serializedState === null) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return null;
  }
};

// Load user once and use it for both user and isAuthenticated
const userFromStorage = loadUserFromStorage();

const initialState = {
  user: userFromStorage,
  isAuthenticated: !!userFromStorage,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      // Save user to localStorage
      try {
        const serializedState = JSON.stringify(action.payload);
        localStorage.setItem('user', serializedState);
      } catch (err) {
        // Ignore write errors
      }
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      // Remove user and tokens from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      // Save user to localStorage
      try {
        const serializedState = JSON.stringify(action.payload);
        localStorage.setItem('user', serializedState);
      } catch (err) {
        // Ignore write errors
      }
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  signupStart,
  signupSuccess,
  signupFailure,
  clearAuthError
} = authSlice.actions;

export default authSlice.reducer;