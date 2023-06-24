import Item from "./item"
import React, { useEffect, useState } from 'react';

export default function History(props) {

  const[claimedItems, setClaimedItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('buy/history');
        const itemsData = await response.json();
        setClaimedItems(itemsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
    
    return (
      <div>
        <h1>History</h1>
        <hr/>
        {claimedItems.map((item) => (
            <Item key={item._id} {...item} showButton={false}/>
        ))}
      </div>
    );
  }