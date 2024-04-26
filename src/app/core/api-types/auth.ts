export interface LoginRequest {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
}

export interface RegisterRequest {
  username: string
  name: string
  surname: string
  role: string
  password: string
  email: string
}

export interface InvitationCodeRequest {
  role: string
}

export interface InvitationCodeResponse {
  code: string
  role: string
}

export interface GetRefreshToken {
  access_token: string
}
