import Item from "../components/item";
import Popup from "../components/pop";
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
        
        const updatedItemsData = itemsData.map(item => {
          if (item.images && item.images.length > 0) {
            const images = item.images.map(image => `http://localhost:5000/uploads/${image}`);
            return { ...item, images };
          }
          return item;
        });
        
        setItems(updatedItemsData);
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

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {items.map(item => (
        <div key={item._id}>
          <Item {...item} onClick={() => handleClick(item)} buttonText={"Make an Offer"} images={item.images} />
          {showPopup && selectedItem && selectedItem._id === item._id && (
            <Popup
              item={selectedItem}
              onClose={handlePopupClose}
            />
          )}
        </div>
      ))}
      </div>
    </div>
  );
}
