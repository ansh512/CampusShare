import React from 'react';
import styles from '../nav.module.css';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const isLoggedIn = props.isLoggedIn;
  const handleLogout = props.handleLogout;
  console.log(isLoggedIn);
  
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li>
          <Link to="/" className={styles.a}>Buy/Borrow</Link>
        </li>
        <li>
          <Link to="/SellShare">Sell/Share</Link>
        </li>
        <li>
          <Link to="/MyListing">My Listing</Link>
        </li>
        <li>
          <Link to="/History">History</Link>
        </li>
        {isLoggedIn ? (
          <li>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
