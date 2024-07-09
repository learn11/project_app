import React, { useState } from 'react';
import styles from '../label/label.module.css';

function DynamicInputComponent() {
  // Define state variables
  const [inputCount, setInputCount] = useState(0);
  const [products, setProducts] = useState([]);

  // Function to handle adding inputs
  const handleAddInputs = () => {
    setInputCount(inputCount + 1);
    setProducts([...products, { id: '', name: '', provider: '' }]);
  };

  // Function to handle input change
  const handleInputChange = (e, index, field) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = e.target.value;
    setProducts(updatedProducts);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/input_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(products.map(product => ({
          id: product.id,
          name: product.name,
          provider: product.provider // Assuming provider field in React corresponds to phone field in FastAPI
        })))
      });

      if (!response.ok) {
        throw new Error('Failed to add products');
      }

      // Clear form fields after successful submission
      setProducts([]);
      setInputCount(0);

      console.log('Products added successfully');
    } catch (error) {
      console.error('Error adding products:', error);
    }
  };

  // JSX rendering
  return (
    <div className={styles.row}>
      <button className={`${styles.btn} ${styles.third}`} onClick={handleAddInputs}>Add product</button>
      <form onSubmit={handleSubmit}>
        {[...Array(inputCount)].map((_, index) => (
          <div key={index} className={styles.inputContainer}>
            <span>
              <input
                className={styles.balloon}
                type="text"
                placeholder={`ID ${index + 1}`}
                value={products[index]?.id || ''}
                onChange={(e) => handleInputChange(e, index, 'id')}
              />
              <label> ID:</label>
            </span>
            <span>
              <input
                className={styles.balloon}
                type="text"
                placeholder={`Name ${index + 1}`}
                value={products[index]?.name || ''}
                onChange={(e) => handleInputChange(e, index, 'name')}
              />
              <label>Name:</label>
            </span>
            <span>
              <input
                className={styles.balloon}
                type="text"
                placeholder={`Product ${index + 1}`}
                value={products[index]?.provider || ''}
                onChange={(e) => handleInputChange(e, index, 'provider')}
              />
              <label>Provider:</label>
            </span>
          </div>
        ))}
        <button className={`${styles.btn} ${styles.third}`} type="submit">submit</button>
      </form>
    </div>
  );
}

export default DynamicInputComponent;
