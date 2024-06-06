import { useEffect } from 'react'
import './App.css'
import AddUserForm from './components/AddUserForm'
import AllUsers from './components/AllUsers'
import Navbar from './components/Navbar'
import { useDispatch } from 'react-redux'
import { addInitialUsersAsync } from './slice/userSlice'
import { Route, Routes } from 'react-router-dom'
import EditUser from './components/EditUser'

function App() {

	const dispatch = useDispatch()

	useEffect(()=>{
		dispatch(addInitialUsersAsync())
	},[])

	return (
		<>
			<Navbar />
			<Routes>
				<Route path='/' element={<AllUsers />}/>
				<Route path='/adduser' element={<AddUserForm />}/>
				<Route path='/edituser/:id' element={<EditUser />}/>
			</Routes>
		</>
	)
}

export default App
