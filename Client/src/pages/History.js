import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import Jumbotron from "../components/jumbotron";

export default function History() {

  const[claimedItems, setClaimedItems] = useState([])

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
      <div className="m-16">
        {claimedItems.length > 0 ? (
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Product name</Table.HeadCell>
              <Table.HeadCell>Description</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Offer</Table.HeadCell>
              <Table.HeadCell>Bid Status</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">See</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {claimedItems.map((item, index) => (
                <Table.Row
                  key={index}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell>{item.price}</Table.Cell>
                  <Table.Cell>{item.offer}</Table.Cell>
                  <Table.Cell>{item.bidStatus}</Table.Cell>
                  <Table.Cell>
                    <a
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      href="/tables"
                    >
                      See
                    </a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : (
          <Jumbotron />
        )}
      </div>
    );
  }