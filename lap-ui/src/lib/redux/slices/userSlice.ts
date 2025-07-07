import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/types/user'

interface UserState {
  currentUser: User | null
}

const initialState: UserState = {
  currentUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User>) {
      state.currentUser = action.payload
    },
    clearCurrentUser(state) {
      state.currentUser = null
    },
  },
})

export const { setCurrentUser, clearCurrentUser } = userSlice.actions
export default userSlice.reducer
