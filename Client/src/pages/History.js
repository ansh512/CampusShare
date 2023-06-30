import Item from "../components/item"
import React, { useEffect, useState } from 'react';
import '../css/button.css'

export default function History(props) {

  const[claimedItems, setClaimedItems] = useState([])
  
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
  
    const togglePanel1 = () => {
      setIsOpen1(!isOpen1);
    };
  
    const togglePanel2 = () => {
      setIsOpen2(!isOpen2);
    };
  
    const togglePanel3 = () => {
      setIsOpen3(!isOpen3);
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('buy/history');
        const itemsData = await response.json();
        const updatedItemsData = itemsData.map(item => {
          if (item.images && item.images.length > 0) {
            const images = item.images.map(image => `http://localhost:5000/uploads/${image}`);
            return { ...item, images };
          }
          return item;
        });
        setClaimedItems(updatedItemsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
    
    return (
      <div>
        <h1 style={{margin:'10px'}}>History</h1>
        <hr/>
          <div className='card text' style={{color:'blue'}}   onClick={togglePanel1}>Pending Offers</div>
          {isOpen1 && (
            <div className={`panel ${isOpen1 ? 'open' : ''}`}>
            {claimedItems.map((item) => (
              <Item key={item._id} {...item} showButton={false}/>
            ))}
            </div>
          )}
          <div className='card text' style={{color:'green'}}  onClick={togglePanel2}>Accpted Offers</div>
          {isOpen2 && (
            <div className={`panel ${isOpen2 ? 'open' : ''}`}>
            {claimedItems.map((item) => (
              <Item key={item._id} {...item} showButton={false}/>
            ))}
            </div>
          )}
          <div className='card text' style={{color:'red'}} onClick={togglePanel3}>Rejected Offers</div>
          {isOpen3 && (
            <div className={`panel ${isOpen3 ? 'open' : ''}`}>
            {claimedItems.map((item) => (
              <Item key={item._id} {...item} showButton={false}/>
            ))}
            </div>
          )}
          </div>
          
    );
  }