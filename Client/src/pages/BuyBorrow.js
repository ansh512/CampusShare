import Item from "../components/item";
import React, { useEffect, useState } from 'react';
import { TextInput,Button } from "flowbite-react";

export default function BuyBorrow({isLoggedIn}) {

  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = () =>{
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    setItems(filteredItems);
  };

  return (
    <div>
      <div className="flex flex-row gap-x-3 justify-center items-center m-2">

        <TextInput
          placeholder="Search"
          required
          type="text"
          value={searchQuery}
          className="w-full md:w-64 lg:w-96" 
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button 
          onClick={handleSearch}
          size="sm"
          color="dark"
        >
          <p>
            Search
          </p>
        </Button>

      </div>

      {items.length === 0 ? (
        <p className="text-center text-red-500">No product found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-16">
          {items.map(item => (
            <div key={item._id}>
              <Item {...item} images={item.images} isLoggedIn={isLoggedIn} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
