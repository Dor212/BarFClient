// src/services/auth.ts
import { api } from "../api/axios";
import type { TUser } from "../Types/TUser.ts";

// טיפוסי עזר
export interface LoginForm {
  email: string;
  password: string;
}

interface LoginTokenResponse {
  token: string;
}

export type UserClient = Omit<TUser, "password">;

export async function loginAndGetUser(form: LoginForm): Promise<UserClient> {
  const loginRes = await api.post<Partial<LoginTokenResponse> | { ok: true }>(
    "/users/login",
    form
  );

  const token = (loginRes.data as LoginTokenResponse | undefined)?.token;
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  const me = await api.get<UserClient>("/users/me");
  return me.data;
}

export async function getMe(): Promise<UserClient> {
  const { data } = await api.get<UserClient>("/users/me");
  return data;
}


export async function logout(): Promise<void> {
  await api.post("/users/logout");
}
