import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {CircularProgress} from '@mui/material';
import './App.css'
import {ErrorSnackbar} from 'common/components'
import {useActions} from 'common/hooks';
import {selectIsLoggedIn} from 'features/auth/auth.selectors';
import {selectIsInitialized} from 'app/app.selectors';
import {authThunks} from 'features/auth/auth.reducer';
import {Header} from "./header/Header";
import {Routing} from "./routing/Routing";

function App() {
	const isInitialized = useSelector(selectIsInitialized)
	const isLoggedIn = useSelector(selectIsLoggedIn)

	const {initializeApp} = useActions(authThunks)

	useEffect(() => {
		initializeApp({})
	}, [])

	if (!isInitialized) {
		return <div
			style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
			<CircularProgress/>
		</div>
	}

	return (
		<BrowserRouter>
			<div className="App">
				<ErrorSnackbar/>
				<Header isLoggedIn={isLoggedIn}/>
				<Routing />
			</div>
		</BrowserRouter>
	)
}

export default App
