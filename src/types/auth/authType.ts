/* eslint-disable @typescript-eslint/no-explicit-any */
// Authentication-related types

// Login request payload
export interface LoginPayload {
  email: string;
  password: string;
}

// Register request payload
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Login response
export interface LoginResponse {
  accessToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
    roles?: string[];
  };
}

// Register response
export interface RegisterResponse {
  message: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}

// Auth state interface
export interface AuthState {
  user: import("../user/userType").User | null;
  userFullInfo?: any;
}

// API user interface (as received from API)
export interface ApiUser {
  _id: string;
  name: string;
  email: string;
}
