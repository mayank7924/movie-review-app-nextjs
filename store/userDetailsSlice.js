import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  email: "",
  username: ""
}

export const userDetailsSlice = createSlice({
	name: 'userDetails',
	initialState,
	reducers: {
		setDetails: (state, action) => {
			state.email = action.payload.email
			state.username =  action.payload.email.split("@")[0]
		}
	}
})

export const { setDetails } = userDetailsSlice.actions

export default userDetailsSlice.reducer