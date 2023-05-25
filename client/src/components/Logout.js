import React, { useEffect} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Logout() {
	const navigate = useNavigate()

	useEffect(() => {
		LogoutSession()
	})

	const LogoutSession = async () => {
		try {
			await axios.delete('http://localhost:5000/users/logout')
			navigate('/')
			window.location.reload()
		} catch (error) {
			console.log(error)
		}
	}

	return <></>
}