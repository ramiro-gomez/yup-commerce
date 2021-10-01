import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { YupUser } from '../../interfaces';

type CurrentUser = null|YupUser;
const initialState = null as CurrentUser;

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (_user, action: PayloadAction<CurrentUser>) => action.payload,
	},
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
