import React, { useState} from 'react';
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
    <>
    <h1>Sell/Share</h1>
      <hr/>
      <div className="sell-share-container">
      <form  onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            required
            name="title"
            type="text"
            className="input-field"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            name="description"
            type="text"
            className="input-field"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            name="price"
            type="number"
            className="input-field"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="img">Upload image: </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            className="input-field"
            onChange={handleimageChange}
            multiple
          />
        </div>
        <input type="submit" value="Upload" className="submit-button" />
      </form>
      </div>
   </>
  );
}
