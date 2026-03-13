import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { authApi } from './authApi'
import type { AuthUser } from "../types/auth.types"

export type AuthState = {
  user: AuthUser | null
  accessToken: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: true,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
    },
    logout(state) {
      state.user = null
      state.accessToken = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchPending,
          authApi.endpoints.register.matchPending,
          authApi.endpoints.logout.matchPending,
          authApi.endpoints.refresh.matchPending
        ),
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.data.user
        state.accessToken = action.payload.data.accessToken
        state.loading = false
      })
      .addMatcher(authApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload.data.user
        state.accessToken = action.payload.data.accessToken
        state.loading = false
      })
      .addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, action) => {
        state.user = action.payload.data.user
        state.accessToken = action.payload.data.accessToken
        state.loading = false
      })
      .addMatcher(
        isAnyOf(
          authApi.endpoints.login.matchRejected,
          authApi.endpoints.register.matchRejected,
          authApi.endpoints.refresh.matchRejected,
          authApi.endpoints.logout.matchRejected
        ),
        (state, action) => {
          state.user = null
          state.accessToken = null
          state.loading = false
          state.error = action.error?.message ?? null
        }
      )

      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null
        state.accessToken = null
        state.loading = false
      })
  },
})

export const { setCredentials, logout } = authSlice.actions

export const selectAuthUser = (state: { auth: AuthState }) => state.auth.user
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.loading

export default authSlice.reducer
