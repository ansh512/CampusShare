import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { Navbar } from 'flowbite-react';

export function Header(props) {

  const isLoggedIn = props.isLoggedIn;
  const handleLogout = props.handleLogout;
  console.log(isLoggedIn);

  return (
    <Navbar
      fluid
      rounded
    >
      <Navbar.Brand href="https://flowbite-react.com">
        <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src={logo}
        />
        <span className="italic self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          CampusShare
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
      {isLoggedIn ? (
            <Link to="/" className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800" onClick={handleLogout}>Logout</Link>
       ) : (
           <Link className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800" to="/login">Login</Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          active
        >
          <Link to="/">Buy</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to="/SellShare">Sell</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to="/MyListing">My Listing</Link>
        </Navbar.Link>
        <Navbar.Link >
          <Link to="/History">History</Link>
        </Navbar.Link>
        <Navbar.Link href="#">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


