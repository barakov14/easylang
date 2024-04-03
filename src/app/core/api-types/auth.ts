export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterRequest {
  username: string,
  name: string,
  surname: string,
  invitation_code: string,
  password: string
}

export interface InvitationCodeRequest {
  role: string
}

export interface InvitationCodeResponse {
  code: string
  role: string
}
