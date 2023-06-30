import React, { useState,useEffect } from 'react';
import '../css/SellShare.css';
import Item from "../components/item";
import '../css/Modal.css';
import List from "../components/list";

export default function MyListing() {

  const[items,setItems] = useState([]);
  const[offers,setOffers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sell/myListing');
        const responseData = await response.json();
        const itemsData = responseData.items;
        
        const updatedItemsData = itemsData.map(item => {
          if (item.images && item.images.length > 0) {
            const images = item.images.map(image => `http://localhost:5000/uploads/${image}`);
            return { ...item, images };
          }
          return item;
        });
        console.log(updatedItemsData);
        setItems(updatedItemsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [modal, setModal] = useState(false);

  const toggleModal = async (item) => {
    try {
    console.log(item);
      const response = await fetch(`/sell/offers/${item._id}`);
      const responseData = await response.json();
      const bidData = responseData.offer;
      setOffers(bidData);
      setModal(!modal);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }
  

  return (
    <>
      <h1>My Listing</h1>
      <hr/>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {items.map(item => (
        <div key={item._id} >
        <Item {...item} buttonText={"See Offers"} onClick={() => toggleModal(item)}/>
        {modal && item &&(
        <div className="modal">
            <div onClick={() => toggleModal(item)}  className="overlay"></div>
            <div className="modal-content">
            {offers.length > 0 ? (
                offers.map(offer => (
                <div key={offer._id} className="list">
                    <List {...offer}/>
                </div>
                ))
            ) : (
                <p>No Offers made yet.</p>
            )}
            <button className="close-modal" onClick={toggleModal}>
                &times;
            </button>
            </div>
        </div>
        )}
        </div>
     ))}
    </div>
   </>
  );
}
