import { baseApi } from '@/shared/api/baseApi'
import { apiRoutes } from '@/shared/config/routes/apiRoutes'
import type { AuthUser } from "../types/auth.types"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      { data: { user: AuthUser; accessToken: string } },
      { identifier: string; password: string }
    >({
      query: (credentials) => ({
        url: apiRoutes.auth.login,
        method: 'POST',
        body: credentials,
      }),
    }),
    register: build.mutation<
      { data: { user: AuthUser; accessToken: string } },
      {
        name: string;
        phone: string;
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: apiRoutes.auth.register,
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: apiRoutes.auth.logout,
        method: 'POST',
      }),
    }),
    refresh: build.mutation<{ data: { user: AuthUser; accessToken: string } }, void>({
      query: () => ({
        url: apiRoutes.auth.refresh,
        method: 'POST',
      }),
    }),
    profile: build.query({
      query: () => ({
        url: apiRoutes.auth.profile,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
  useProfileQuery,
} = authApi
