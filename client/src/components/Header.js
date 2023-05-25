import React, {createContext, useEffect, useRef, useState} from 'react'
import { Button, Container, FormControl, Nav, Navbar, Form } from 'react-bootstrap';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import logo from '../assets/logo192.png';
import Content from './Content.js';

//---acces role
import axios from 'axios';
import jwt_decode from 'jwt-decode';


export const SearchContext = createContext();

export default function Header() {
    //данные для поиска
    const [searchValue, setSearchValue] = useState('');
    //курсор в поле поиска
    const inputRef = useRef(null);

    //---- for navigate
    const [name, setName] = useState('')
    const [role, setRole] = useState('')
    let navbar_admin = []
    let navbar_user = []
    let navbar_guest = []

    useEffect(() => {
        refreshToken()
    })
    
    const refreshToken = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/token`)
            const decoded = jwt_decode(response.data.accessToken)
            setName(decoded.name)
            setRole(decoded.role)
        } catch (error) {
            if (error.response) {
            }
        }
    }

    //------------------create nav panel for role
    if (role === 'admin') {
        navbar_admin = [
            { name: 'Post List', href: '/postlist' },
            { name: 'Category List', href: '/categorylist' },
        ]

        navbar_user = [
            { name: 'Profile', href: '/profile' },
            { name: 'Logout', href: '/logout' },
        ]
    } else if (role === 'user') {
        navbar_admin = []
        navbar_user = [
            { name: 'Profile', href: '/profile' },
            { name: 'Logout', href: '/logout' },
        ]
    } else {
        navbar_guest = [
            { name: 'Login', href: '/login' },
            { name: 'Register', href: '/register' },
        ]
    }

  return (
    <div>
        <SearchContext.Provider value={{ searchValue, setSearchValue }}>
            <header>
                <Navbar sticky="top" collapseOnSelect expand="md" bg="danger" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                src={logo}
                                height={30}
                                width={30}
                                className="d-inline-block align-top"
                                alt="Logo"
                            />
                            React site
                        </Navbar.Brand>
                        <NavbarToggle aria-controls="responsive-navbar-nav"/>
                        <NavbarCollapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/blog">Blog</Nav.Link>
                                {/* <Nav.Link href="/postList">Post List</Nav.Link>
                                <Nav.Link href="/categoryList">Category List</Nav.Link> */}
                                {/* for admin */}
                                {navbar_admin.map((value, i) => (
                                    <Nav.Link href={value.href} key={i}>
                                        {value.name}
                                    </Nav.Link>
                                ))}
                               
                            </Nav>
                            <Nav className="justify-content-end flex-grow-1">
                                <Form className="d-flex">
                                    <FormControl 
                                        type="text" 
                                        placeholder="search" 
                                        className="me-sm-2"
                                        id="input"
                                        value={searchValue}
                                        ref={inputRef} //курсор
                                        onChange={(event) => setSearchValue(event.target.value)}
                                    />
                                    <Button 
                                        variant="outline-info"
                                        onClick={() => {
                                            setSearchValue(''); //очистить поле search
                                            inputRef.current.focus();// курсор в поле search
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </Form>
                            </Nav>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                 {/* for all */}
                                 {navbar_guest.map((value, i) => (
                                    <Nav.Link href={value.href} key={i}>
                                        {value.name}
                                    </Nav.Link>
                                ))}
                                {/* for user */}
                                <Navbar.Text>{name}</Navbar.Text>
                                {navbar_user.map((value, i) => (
                                    <Nav.Link href={value.href} key={i}>
                                        {value.nameUser} {value.name} |
                                    </Nav.Link>
                                ))}
                                 {/*<Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                                <Nav.Link href="/profile">Profile</Nav.Link>
                                <Nav.Link href="/logout">Logout</Nav.Link>*/}
                            </Nav> 
                            
                        </NavbarCollapse>
                    </Container>
                </Navbar>
            </header>
            <Content />
        </SearchContext.Provider>
    </div>
  )
}

