import React, { useState } from 'react';
import {Card,Button } from 'flowbite-react';
import ProductDetails from './pop.js'
import { useNavigate } from 'react-router-dom';
import { usePrice } from '../context/PriceContext';

function Item(props){
  const navigate = useNavigate(); 
  const { formatPrice } = usePrice();
  const price = props.price;
  const [openModal, setOpenModal] = useState();
  const prop = { openModal, setOpenModal };

  return (
    <div >
      <Card className='hover:bg-gray-200 hover:cursor-pointer'>
        <img 
          src={props.images[0]} 
          className='h-52 object-cover'
          alt="Your Alt Text"
        />
      
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          <p>
            {props.title}
          </p>
        </h5>

        <div className="flex items-center justify-between">
          <span className="text-3xl text-gray-900 dark:text-white">
            {formatPrice(price)}
          </span>
          <Button onClick={() => props.isLoggedIn ? setOpenModal('dismissible') : navigate('/login')}>Make an Offer</Button>
          <ProductDetails open = {prop.openModal} close= {prop.setOpenModal} item={props}/>
        </div>
      </Card>
    </div>

  );
}

export default Item;
