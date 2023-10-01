import React, { useEffect, useState } from 'react';
import styles from './Form.module.scss';
import FileUploader from '../fileUploader/FileUploader';

const Form = ({submitHandler,submitting}) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discountedPrice: '',
    description: '',
    addOns: [],
    image1: '',
    image2: '',
    image3: '',
    soldAs: '', //person/plate
    category: '', //food/bakery
    ratings: '',
    reviews: '',
    tag: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler(formData)
  };

  useEffect(()=>{
    if(!submitting){
      setFormData({
        name: '',
        price: '',
        discountedPrice: '',
        description: '',
        addOns: [],
        image1: '',
        image2: '',
        image3: '',
        soldAs: '', //person/plate
        category: '', //food/bakery
        ratings: '',
        reviews: '',
        tag: []
      })
    }
  },[submitting])

  return (
    <div className={styles.formContainer}>
      <h2>Product Form</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="price">Price *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="discountedPrice">Discounted Price</label>
          <input
            type="number"
            id="discountedPrice"
            name="discountedPrice"
            value={formData.discountedPrice}
            onChange={handleChange}
            // required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="discountedPrice">Description *</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Sold as *</label>
          <label>
            <input
              type="radio"
              value="per_plate"
              name="soldAs"
              checked={formData.soldAs === 'per_plate'}
              onChange={handleChange}
              required
            />
            Per Plate
          </label>
          <label>
            <input
              type="radio"
              value="per_person"
              name="soldAs"
              checked={formData.soldAs === 'per_person'}
              onChange={handleChange}
              required
            />
            Per Person
          </label>
        </div>
        <div className={styles.formGroup}>
          <label>Category *</label>
          <label>
            <input
              type="radio"
              value="food"
              name="category"
              checked={formData.category === 'food'}
              onChange={handleChange}
              required
            />
            Food
          </label>
          <label>
            <input
              type="radio"
              value="bakery"
              name="category"
              checked={formData.category === 'bakery'}
              onChange={handleChange}
              required
            />
            Bakery
          </label>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image1">Image 1 *</label>
          <FileUploader required={true} onUpload={(value)=>{setFormData({...formData , image1: value})}}/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image2">Image 2 *</label>
          <FileUploader required={true} onUpload={(value)=>{setFormData({...formData , image2: value})}}/>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image3">Image 3</label>
          <FileUploader onUpload={(value)=>{setFormData({...formData , image3: value})}}/>
        </div>
        <button type="submit">{submitting ? "Submitting...":"Submit"}</button>
      </form>
    </div>
  );
};

export default Form;
