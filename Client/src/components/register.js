import {useState} from "react";
import axios from 'axios';
import './../index.css';

export default function Register(){

    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [cpwd, setcPwd] = useState('');
    const [pho, setPho] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:5000/register', { username: user,email: email, password:pwd, cpassword:cpwd, phone: pho});
          console.log(response.data);
          window.location.href = 'http://localhost:3000/login'; // Redirect to BuyBorrow page
        } catch (error) {
          setErrorMessage(error.response.data.message);
        }
      }

    return(
        <section className="sectionRegister">
        <form className="form" onSubmit={handleSubmit}>
             <p className="form-title">Register</p>
              <div className="input-container">
                <input 
                    placeholder="Enter email" 
                    type="email" 
                    name = "email" 
                    required=""
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
            </div>
            <div className="input-container">
                <input 
                    placeholder="Enter name" 
                    type="string" 
                    name = "user" 
                    required=""
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                  />
            </div>
            <div className="input-container">
                <input 
                    placeholder="Enter phone Number" 
                    type="Number" 
                    name = "phone" 
                    required=""
                    autoComplete="off"
                    onChange={(e) => setPho(e.target.value)}
                    value={pho}
                  />
            </div>
            <div className="input-container">
                <input 
                    placeholder="Enter password" 
                    type="password" 
                    name = "password" 
                    required=""
                    autoComplete="off"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                  />
            </div>
            <div className="input-container">
                <input 
                    placeholder="Confirm Password" 
                    type="password" 
                    name = "confirmPassword" 
                    required=""
                    autoComplete="off"
                    onChange={(e) => setcPwd(e.target.value)}
                    value={cpwd}
                  />
            </div>
               <button className="submit">Submit</button>
            {errorMessage && <p className="error-msg">{errorMessage}</p>}
         </form>
        </section>
    )
}