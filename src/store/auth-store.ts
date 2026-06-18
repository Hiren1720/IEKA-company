import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthState } from "../types/auth-types";
import { storageKeys } from "../constants/constants";

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      setToken: (token, refreshToken) =>
        set({
          accessToken: token,
          refreshToken
        }),

      setUser: (user) =>
        set({
          user,
        }),

      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
        }),

      isAuthenticated: () => {
        return !!get().accessToken;
      },
    }),
    {
      name: storageKeys.authStorage,
    }
  )
);