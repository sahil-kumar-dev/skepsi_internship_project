import { useEffect } from 'react'
import './App.css'
import AddUserForm from './components/AddUserForm'
import AllUsers from './components/AllUsers'
import Navbar from './components/Navbar'
import { useDispatch } from 'react-redux'
import { addInitialUsersAsync } from './slice/userSlice'

function App() {

	const dispatch = useDispatch()

	useEffect(()=>{
		dispatch(addInitialUsersAsync())
	},[])

	return (
		<>
			<Navbar />
			<AllUsers />
			<AddUserForm />
		</>
	)
}

export default App
