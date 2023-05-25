import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')
	const navigate = useNavigate()

	const Auth = async (e) => {
		e.preventDefault()
		try {
			await axios.post(`http://localhost:5000/users/login`, {
				email: email,
				password: password,
			})
			navigate('/profile')
			window.location.reload()
		} catch (error) {
			if (error.response) {
				setMsg(error.response.data.msg)
			}
		}
	}

	return (
		<Container className="mt-1">
			<h2 className="text-center mt-3">Login form</h2>
			<Row className="d-flex justify-content-center align-items-center">
				<Col md={8} lg={6} xs={12}>
					<Card className="shadow">
							<Card.Body>
								<Form onSubmit={Auth}>
									<p className="has-text-centered">{msg}</p>
									<Form.Group className="mb-3">
										<Form.Label className="text-center">Email address</Form.Label>
										<Form.Control type="text" placeholder="Enter username" value={email} onChange={(e) => setEmail(e.target.value)} />
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Password</Form.Label>
										<Form.Control type="password" placeholder="Enter username" value={password} onChange={(e) => setPassword(e.target.value)} />
									</Form.Group>
									<div className="d-flex justify-content-center">
										<Button variant="primary" type="submit" className="w-50">Login</Button>
									</div>
								</Form>
							</Card.Body>
						</Card>
				</Col>
			</Row>
		</Container>
	)
}