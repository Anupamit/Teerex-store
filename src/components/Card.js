import React from 'react';
import './styles/Card.css';

const Card = ({ filterProducts, handleAddtocart }) => {
  return (
    <div className='products'>
      <div className='row'>
        {filterProducts.length ? (
          filterProducts.map((eachProduct) => (
            <div className='card' key={eachProduct.id}>
              <div className='card-header'>
                <span className='card-title'>{eachProduct.name}</span>
                <img src={eachProduct.imageURL} className='product-image' alt='product' />
              </div>
              <div className='card-body'>
                <p>Rs {eachProduct.price}</p>
                <button className='btn' onClick={handleAddtocart}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3>No products found. Please do something.</h3>
        )}
      </div>
    </div>
  );
};

export default Card;
