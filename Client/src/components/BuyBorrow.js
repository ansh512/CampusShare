import Item from "./item"
import Popup from "./pop";
import React, { useEffect, useState } from 'react';

export default function BuyBorrow(props) {

  const [items, setItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/buy');
        const itemsData = await response.json();
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = (item) => {
    console.log("Button pressed", item);
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  // const handleClaim = () => {
  //   if (selectedItem) {
  //     props.onClaim(selectedItem);
  //     setShowPopup(false);
  //   }
  // };

  return (
    <div>
      <h1>Borrow</h1>
      <hr/>
      {items.map(item => (
        <div key={item._id}>
          <Item {...item} onClick={() => handleClick(item)} showButton={true} />
          {showPopup && selectedItem && selectedItem._id === item._id && (
            <Popup
              item={selectedItem}
              onClose={handlePopupClose}
            />
          )}
        </div>
      ))}
    </div>
  );
}
