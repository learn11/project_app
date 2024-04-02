import React, { useState } from 'react';
import styles from './label.module.css';

function InputForm() {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    phone: ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/input', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          mail: formData.mail,
          phone: formData.phone
        })
      });

      if (!response.ok) {
        throw new Error('Failed to add customer');
      }

      // Clear form fields after successful submission
      setFormData({
        name: '',
        mail: '',
        phone: ''
      });

      console.log('Customer added successfully');
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div className={styles.row}>
      <form onSubmit={handleSubmit}>
        <span>
          <input className={styles.balloon} id="name" type="text" placeholder="leonardo de vinci"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label htmlFor="name">Name:</label>
        </span>

        <span>
          <input className={styles.balloon} id="mail" type="text" placeholder="leonard@secret.co.il"
            value={formData.mail} 
            onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
          />
          <label htmlFor="mail">Mail:</label>
        </span>

        <span>
          <input className={styles.balloon} id="phone" type="text" placeholder="Enter phone"
          value={formData.phone} 
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          <label htmlFor="phone">Phone:</label>
        </span>

        <button className={`${styles.btn} ${styles.third}`} type="submit">Add product</button>
      </form>
      
    </div>
  );
}

export default InputForm;
