export type AuthUser = {
  id: string
  email: string
  name?: string | null
  phone?: string | null
  avatar?: string | null
}

export type UpdateProfileDto = {
  name?: string
  email?: string
  phone?: string
}