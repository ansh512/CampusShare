import React, { useState,useEffect } from 'react';
import { Card, Modal, Button, Accordion } from 'flowbite-react';
import Item from "../components/item";
import List from "../components/list";
import '../css/Modal.css';
import '../css/SellShare.css';


export default function MyListing() {

  const[items,setItems] = useState([]);
  const[offers,setOffers] = useState([]);
  const [openModal, setOpenModal] = useState();
  const props = { openModal, setOpenModal };
  const [openModal1, setOpenModal1] = useState();
  const props1 = { openModal1, setOpenModal1 };

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

  const handleSell = (event) => {
    const value = event.target.value;
    fetch(`/sell/accept/${value}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        alert("result");
      })
      .catch(error => {
        console.error('Error:', error);
      });
    };
  

  return (
    <>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <Card
          className='h-100 w-80 m-8'
          imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
          imgSrc="http://mistillas.cl/wp-content/uploads/2018/04/Nike-Epic-React-Flyknit-%E2%80%9CPearl-Pink%E2%80%9D-01.jpg">
          <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              <p>
                Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
              </p>
            </h5>
          </a>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              $599
            </span>
            <Button onClick={() => props.setOpenModal('default')}>Toggle modal</Button>
          </div>
        </Card>
        <Modal show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
          <Modal.Header>Terms of Service</Modal.Header>
          <Modal.Body>
          <Accordion>
            <Accordion.Panel>
            <Accordion.Title className="flex flex-row justify-between">
              <span>What is Flowbite?</span>
              <Button   className="bg-green-500" onClick={() => props1.setOpenModal1('pop-up')}>Accept</Button>
            </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <p>
                    Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons,
                    dropdowns, modals, navbars, and more.
                  </p>
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  <p>
                    Check out this guide to learn how to 
                  </p>
                  <a
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                    href="https://flowbite.com/docs/getting-started/introduction/"
                  >
                    <p>
                      get started
                    </p>
                  </a>
                  <p>
                    and start developing websites even faster with components on top of Tailwind CSS.
                  </p>
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
            <Accordion.Title className="flex flex-row justify-between">
              <span>Is there a Figma file available?</span>
              <Button className="bg-green-500" onClick={() => props1.setOpenModal1('pop-up')}>Accept</Button>
            </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <p>
                    Flowbite is first conceptualized and designed using the Figma software so everything you see in the library
                    has a design equivalent in our Figma file.
                  </p>
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  <p>
                    Check out the
                  </p>
                  <a
                    className="text-cyan-600 hover:underline dark:text-cyan-500"
                    href="https://flowbite.com/figma/"
                  >
                    <p>
                      Figma design system
                    </p>
                  </a>
                  <p>
                    based on the utility classes from Tailwind CSS and components from Flowbite.
                  </p>
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
            <Accordion.Title className="flex flex-row justify-between">
              <span>What are the differences between Flowbite and Tailwind UI?</span>
              <Button className="bg-green-500 " onClick={() => props1.setOpenModal1('pop-up')}>Accept</Button>
            </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <p>
                    The main difference is that the core components from Flowbite are open source under the MIT license, whereas
                    Tailwind UI is a paid product. Another difference is that Flowbite relies on smaller and standalone
                    components, whereas Tailwind UI offers sections of pages.
                  </p>
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  <p>
                    However, we actually recommend using both Flowbite, Flowbite Pro, and even Tailwind UI as there is no
                    technical reason stopping you from using the best of two worlds.
                  </p>
                </p>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Learn more about these technologies:
                </p>
                <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
                  <li>
                    <a
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                      href="https://flowbite.com/pro/"
                    >
                      <p>
                        Flowbite Pro
                      </p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-cyan-600 hover:underline dark:text-cyan-500"
                      href="https://tailwindui.com/"
                      rel="nofollow"
                    >
                      <p>
                        Tailwind UI
                      </p>
                    </a>
                  </li>
                </ul>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
          </Modal.Body>
        </Modal>
        <Modal show={props1.openModal1 === 'pop-up'} size="md" popup onClose={() => props1.setOpenModal1(undefined)}>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <div className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to accept this offer?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => props.setOpenModal(undefined)}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}
