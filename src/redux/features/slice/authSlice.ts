import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { AuthState } from '../../../types/auth/authType'
import type { User } from '../../../types'

const initialState: AuthState = {
  user: null,
  userFullInfo: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Original actions for compatibility
    setCredentials: (state, action: PayloadAction<{ user: User | null }>) => {
      state.user = action.payload.user
    },
    logOut: (state) => {
      state.user = null
    },
    // New actions for "Mirror" pattern
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    setUserFullInfo: (state, action) => {
      state.userFullInfo = action.payload
    },
    clearUser: (state) => {
      state.user = null
    },
  },
})

export const { setCredentials, logOut, setUser, setUserFullInfo, clearUser } = authSlice.actions
export default authSlice.reducer
