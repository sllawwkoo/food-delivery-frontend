export const roles = {
  user: "user",
  guest: "guest",
} as const;

export type Role = (typeof roles)[keyof typeof roles];
