import {useState} from "react";
import axios from 'axios';
import './../index.css';

export default function ForgotPassword(props){

    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
      
        try {
          const response = await axios.post('http://localhost:5000/forgotPassword', { email: email});
          console.log(response.data);
          setEmail('');
          alert("Check your email for password reset link.");
          window.location.href = 'http://localhost:3000/login'; // Redirect to BuyBorrow page
        } catch (error) {
          setErrorMessage(error.response.data.message);
        }
      }

    return(
        <section className="section">
        <form className="form" onSubmit={handleSubmit}>
             <p className="form-title">Change Password</p>
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
               <button className="submit">Reset Password</button>
            {errorMessage && <p className="error-msg">{errorMessage}</p>}
         </form>
        </section>
    )
}