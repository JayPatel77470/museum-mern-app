//import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { NavDropdown } from 'react-bootstrap'
import Link from 'next/link'
import { searchHistoryAtom } from '../store'
import { useAtom } from 'jotai'
import { addToHistory } from '../lib/userData'
import { removeToken, readToken } from '../lib/authenticate'

export default function MainNav() {
    const [search, setSearch] = useState('');
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    const [isExpanded, setExpanded] = useState(false);
    const router = useRouter()
    let token = readToken()

    async function submitForm(e) {
        e.preventDefault(); // prevent the browser from automatically submitting the form
        if (search) {
            setExpanded(false);
            setSearchHistory(await addToHistory(`title=true&q=${search}`))
            router.push(`/artwork?title=true&q=${search}`)
        }
    }

    function logout() {
        setExpanded(false)
        removeToken()
        router.push('/login')
    }

    return (
        <>
            <Navbar className="fixed-top" bg="primary" variant="dark" expand='lg' expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Jay Girishkumar Patel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={e => setExpanded(!isExpanded)} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto" >
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link onClick={e => setExpanded(false)} active={router.pathname === "/"}>Home</Nav.Link>
                            </Link>
                            {token &&
                                <Link href="/search" passHref legacyBehavior>
                                    <Nav.Link onClick={e => setExpanded(false)} active={router.pathname === "/search"}>Advanced Search</Nav.Link>
                                </Link>
                            }
                        </Nav>
                        &nbsp;
                        {token &&
                            <Form className="d-flex" onSubmit={submitForm}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <Button type="submit" className="btn btn-success">Search</Button>
                            </Form>}
                        &nbsp;
                        {token &&
                            <Nav>
                                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                                    <Link href="/favourites" passHref legacyBehavior>
                                        <NavDropdown.Item onClick={e => setExpanded(false)} active={router.pathname === "/favorites"} > Favourites</NavDropdown.Item>
                                    </Link>
                                    <Link href="/history" passHref legacyBehavior>
                                        <NavDropdown.Item onClick={e => setExpanded(false)} active={router.pathname === "/history"} > Search History</NavDropdown.Item>
                                    </Link>
                                    <NavDropdown.Item onClick={logout}> Logout</NavDropdown.Item>
                                     
                                </NavDropdown>
                            </Nav>}
                        {!token && <Nav>
                            <Link href="/register" passHref legacyBehavior>
                                <Nav.Link onClick={e => setExpanded(false)} active={router.pathname === "/register"}>Register</Nav.Link>
                            </Link>
                            <Link href="/login" passHref legacyBehavior>
                                <Nav.Link onClick={e => setExpanded(false)} active={router.pathname === "/login"}>Login</Nav.Link>
                            </Link>
                        </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <br />
            <br />
            <br />
        </>
    )
}
