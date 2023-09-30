import React, { useState,useEffect } from 'react';
import { Card, Modal, Button, Accordion } from 'flowbite-react';
import { usePrice } from '../context/PriceContext';
import {BASE_URL} from "../services/helper";
import Loading from "../components/Loader";

export default function MyListing() {

  const {formatPrice} = usePrice();

  const[items,setItems] = useState([]);
  const[offers,setOffers] = useState([]);
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [openModal1, setOpenModal1] = useState();
  const props1 = { openModal1, setOpenModal1 };
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/sell/myListing');
        const responseData = await response.json();
        const itemsData = responseData.items;
        
        const updatedItemsData = itemsData.map(item => {
          if (item.images && item.images.length > 0) {
            const images = item.images.map(image => `${BASE_URL}/uploads/${image}`);
            return { ...item, images };
          }
          return item;
        });
        setItems(updatedItemsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  const getOffer = async (itemId) => {
    try {
      const response = await fetch(`/sell/offers/${itemId}`);
      const responseData = await response.json();
      setOffers(responseData.offer);
    } catch (error) {
      console.error('Error fetching offers:', error);
    }
  };
  
  const handleSell = (itemID) => {
    
    fetch(`/sell/accept/${itemID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        alert(result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };
  

  return (
    <div className='min-h-screen w-full'>
      
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 m-16">
          {items.map((item, index) => (
            <Card className="hover:bg-gray-200" key={index}>
              <img
                src={item.images[0]}
                className="h-52 object-cover"
                alt="Your Alt Text"
              />

              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <p>{item.title}</p>
              </h5>

              <div className="flex items-center justify-between">
                <span className="text-3xl text-gray-900 dark:text-white">
                  {formatPrice(item.price)}
                </span>
                <Button
                  onClick={() => {
                    getOffer(item._id);
                    props.setOpenModal('default');
                  }}
                >
                  See Offers
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
        <Modal.Header>Offers</Modal.Header>
        <Modal.Body>
          {offers.length > 0 ? (
            <Accordion collapseAll>
              {offers.map((offer, index) => (
                <Accordion.Panel key={index}>
                  <Accordion.Title className="flex flex-row justify-between">
                      <span>{offer.user} made an offer of {formatPrice(offer.amount)}.
                    <Button className="inline bg-green-500 ml-8" color="success" pill onClick={() => {props1.setOpenModal1('pop-up');props1.offerId = offer._id;}}>Accept</Button></span>
                  </Accordion.Title>
                  <Accordion.Content>
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                    {offer.remark !== "" ? <p>{offer.remark}</p> : <p>No message</p>}
                    </p>
                  </Accordion.Content>
                </Accordion.Panel>
              ))}
            </Accordion>
          ) : (
            <p>Sorry. No offers made yet.🙁</p>
          )}
        </Modal.Body>
      </Modal>


      <Modal show={props1.openModal1 === 'pop-up'} size="md" popup onClose={() => props1.setOpenModal1(undefined)}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <svg className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to accept this offer?
            </h3>
            <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => handleSell(props1.offerId)}>
              Yes, I'm sure
            </Button>
              <Button color="gray" onClick={() => props1.setOpenModal1(undefined)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      
    </div>
  )
}
