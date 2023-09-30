import {useRef,useState,useEffect} from "react";
import axios from 'axios';
import './../index.css';
import { useNavigate } from 'react-router-dom';

function Login({setIsLoggedIn}){

  const navigate = useNavigate();
  const userRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    userRef.current.focus();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('/login', { email: user, password: pwd });
      localStorage.setItem('refreshToken', response.data.token);
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  }

    return(
      <section className="section">
      <form className="form" onSubmit={handleSubmit}>
           <p className="form-title">Log in to your account</p>
            <div className="input-container">
              <input 
                  placeholder="Enter email" 
                  type="email" 
                  name = "username" 
                  required=""
                  autoComplete="off"
                  ref = {userRef}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                />
          </div>
          <div className="input-container">
              <input 
                    placeholder="Enter password" 
                    type="password" 
                    name = "passWord" 
                    required=""
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                  />
            </div>
             <button className="submit">Log in</button>
          <p className="forgot-link">
            <a href="http://localhost:3000/forgot-password">Forgot Password ?</a>
          </p>
          <p className="forgot-link">
            <a href="http://localhost:3000/register">Not a user ? Sign Up</a>
          </p>
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
       </form>
      </section>
    )
}

export default Login