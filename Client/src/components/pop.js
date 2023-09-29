import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Label, Textarea, TextInput,Button } from 'flowbite-react';
import Carousel from './carousel';

function ProductDetails({ item, open, close }) {
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');

  async function handleClaim(event) {
    event.preventDefault();
    try {
      const response = await axios.put('buy/bid', { itemID: item._id, amount: amount, remark: remark });
      alert(response.data.message); 
    } catch (error) {
      alert(error.response.data.message); 
    }
  }
  
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleRemarkChange = (event) => {
    setRemark(event.target.value);
  };

  return (
    <>
      <Modal dismissible show={open === 'dismissible'} onClose={() => close(undefined)} >
        <Modal.Header>
          {item.title}
          <p className='italic text-base font-light'>{item.description}</p>
        </Modal.Header>
        <Modal.Body className='flex flex-col gap-4 ' >
        <Carousel images={item.images} />
          <div>
            <div className="mb-2 block">
              <Label color="gray" htmlFor="input-gray" value="Your bid" />
            </div>
            <TextInput
              color="gray"
              id="input-gray"
              placeholder="Amount offered"
              required
              value={amount}
              onChange={handleAmountChange} 
            />
            <div className="max-w-md" id="textarea">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Your message" />
              </div>
              <Textarea
                id="comment"
                placeholder="Leave a comment..."
                required
                rows={4}
                value={remark} 
                onChange={handleRemarkChange} 
              />
            </div>
            <Button className="my-2" onClick={handleClaim}>
              <p>
                Place your BID
              </p>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductDetails;
