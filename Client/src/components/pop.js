import React, { useState } from 'react';
import axios from 'axios';

function Popup({ onClose,item }) {

  const [showPopup, setShowPopup] = useState(true);

  const[amount, setAmount] = useState('');
  const[remark, setRemark] = useState('');

  async function handleClaim(event) {
    event.preventDefault();
    try {
      await axios.put('buy/bid', {itemID:item._id, amount: amount, remark: remark });
      alert('Thank you! Your bid has been submitted!');
     
    } catch (error) {
      console.log(error);
      alert(error.response);
    }
  }

  const handlePopupClose = () => {
    if (onClose) {
      onClose();
    }
    setShowPopup(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1
    }}>
      <div style={{ display: showPopup ? 'block' : 'none', backgroundColor: 'white', padding: '20px' }}>
        <form onSubmit={handleClaim}>
          <label htmlFor="offer">Your Offer</label>
          <input type="number" 
            name="offer" 
            plcaeholder="Enter amount"
            style={{ marginBottom: '10px', padding: '5px', width: '100%' }} 
            onChange={(e) => setAmount(e.target.value)}
          />
          <br/>
          <label htmlFor="reamrk ">Remark:</label>
          <textarea name="remark" 
            rows={5} cols={10} 
            style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
            onChange={(e) => setRemark(e.target.value)}>
          </textarea>
          <br/>
          <button 
            onClick={handlePopupClose} 
            style={{ marginRight: '10px' }}>
            Cancel
          </button>
          <button onClick={handleClaim}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Popup;