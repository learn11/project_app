import cl from './table.module.css'
import React, { useState, useEffect } from 'react';

function CustomerTable1({FetchUrl}) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(FetchUrl)
      .then(response => response.json())
      .then(data => setCustomers(data.table))
      .catch(error => console.error('Error fetching customers:', error));
  }, []);

  return (
    <div>

      <table className={cl.container}>
        <thead>
          <tr>
            {customers.length > 0 && Object.keys(customers[0]).map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              {Object.values(customer).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable1;