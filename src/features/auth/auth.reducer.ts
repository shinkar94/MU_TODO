import { createSlice } from '@reduxjs/toolkit';
import { appActions } from 'app/app.reducer';
import { authAPI, LoginParamsType } from 'features/auth/auth.api';
import { clearTasksAndTodolists } from 'common/actions';
import { createAppAsyncThunk } from 'common/utils';
import { ResultCode } from 'common/enums';


const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>
('auth/login', async (arg, thunkAPI) => {
	const {dispatch, rejectWithValue} = thunkAPI
	const res = await authAPI.login(arg)
	if (res.data.resultCode === ResultCode.Success) {
		return {isLoggedIn: true}
	} else {
		return rejectWithValue({data: res.data, showGlobalError: false})
	}
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>
('auth/logout', async (_, thunkAPI) => {
	const {dispatch, rejectWithValue} = thunkAPI
	const res = await authAPI.logout()
	if (res.data.resultCode === ResultCode.Success) {
		dispatch(clearTasksAndTodolists())
		return {isLoggedIn: false}
	} else {
		return rejectWithValue({data: res.data, showGlobalError: false})
	}
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>
('app/initializeApp', async (_, thunkAPI) => {
	const {dispatch, rejectWithValue} = thunkAPI
	try {
		const res = await authAPI.me()
		if (res.data.resultCode === ResultCode.Success) {
			return {isLoggedIn: true}
		} else {
			return rejectWithValue({data: res.data, showGlobalError: false})
		}
	} catch (e) {
		return rejectWithValue(null)
	} finally {
		dispatch(appActions.setAppInitialized({isInitialized: true}));
	}
})


const slice = createSlice({
	name: 'auth',
	initialState: {
		isLoggedIn: false
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn
			})
			.addCase(initializeApp.fulfilled, (state, action) => {
				state.isLoggedIn = action.payload.isLoggedIn
			})
	}
})

export const authReducer = slice.reducer
export const authThunks = {login, logout, initializeApp}



