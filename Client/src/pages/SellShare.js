import React, { useState} from 'react';
import { Button, Label, TextInput,FileInput} from 'flowbite-react';
import '../css/SellShare.css';
import axios from 'axios';

export default function SellShare() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);


  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleimageChange = (event) => {
    const selectedFile = Array.from(event.target.files);
    setSelectedImages(selectedFile);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
  
    // Append each image file individually
    selectedImages.forEach((image, index) => {
      formData.append('images', image);
    });

    console.log(FormData);
  
    axios
      .post('/sell', formData)
      .then((response) => {
        alert('Item successfully listed');
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  
    setTitle('');
    setDescription('');
    setPrice('');
    setSelectedImages([]);
  };
  
  return (
      <div class="flex items-center justify-center h-screen">
      <form className="flex max-w-md flex-col gap-4 bg-slate-300 p-8 -mt-8" onSubmit={handleSubmit}>
      <h1 className='italic'>Fill in your product details:</h1>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="title"
            value="Product Title"
          />
        </div>
        <TextInput
          id="title"
          placeholder="name@gmail.com"
          required
          type="string"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="description"
            value="Product description"
          />
        </div>
        <TextInput
          id="description"
          required
          type="string"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="price"
            value="Expected Price"
          />
        </div>
        <TextInput
          id="price"
          required
          type="string"
          value={price}
          onChange={handlePriceChange}
        />
      </div>
      <div
        className="max-w-md"
        id="fileUpload"
      >
        <div className="mb-2 block">
          <Label
            htmlFor="file"
            value="Upload file"
          />
        </div>
        <FileInput
          helperText="A picture of your product increases your product sale chance by 90%."
          id="file"
          onChange={handleimageChange}
          multiple
          accept="image/*"
        />
    </div>
      <Button type="submit">
        Post
      </Button>
    </form>
   </div>
  );
}
