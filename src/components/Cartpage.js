import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './styles/Cartpage.css';

const Cartpage = ({ cartItems, handleAdd, handleDecrease, handleDelete, totalQuantity }) => {
  const navigate = useNavigate();
console.log("cart",cartItems);
  const backHome = () => {
    navigate('/');
  };

  const getTotalCartValue = (cartItems = []) => {
    if (!cartItems.length) return 0;

    const total = cartItems
      .map((eachProduct) => eachProduct.price * eachProduct.productinCart)
      .reduce((total, n) => total + n);
    return total;
  };

  const totalPrice = getTotalCartValue(cartItems);
  const cartTotal = totalQuantity(cartItems);

  return (
    <>
      <Header cartItems={cartItems} totalQuantity={totalQuantity} />
      <div className='ItemCart'>
        <div className='heading'>Shopping Cart</div>
        <div className='cart'>
          {cartItems.length ? (
            <>
              <div className='outer-item-cart'>
                <div className='inner-item-cart'>
                  {cartItems.map((eachProduct) => (
                    <div className='item' key={eachProduct.id}>
                      <div className='product'>
                        <div className='productImage'>
                          <img src={eachProduct.imageURL} alt={eachProduct.name} />
                        </div>
                        <div className='space'></div>
                        <div className='productDetail'>
                          <div className='product-data'>
                            <p style={{ fontWeight: 'bold' }}>{eachProduct.name}</p>
                            <p style={{ fontSize: '13.5px' }}>Rs {eachProduct.price}</p>
                          </div>
                          <div className='space'></div>
                          <div className='details'>
                            <p>Quantity: {eachProduct.productinCart}</p>
                            <p>
                              {eachProduct.quantity === eachProduct.productinCart
                                ? `No Stock Left`
                                : `Stock: ${eachProduct.quantity}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='buttons'>
                        <button className='change' onClick={(e) => handleAdd(eachProduct)}>
                          +
                        </button>
                        <div className='space'></div>
                        <button className='change' onClick={(e) => handleDecrease(eachProduct)}>
                          -
                        </button>
                        <div className='space'></div>
                        <button className='delete' onClick={(e) => handleDelete(eachProduct)}>
                          Delete
                        </button>
                        <i
                          onClick={(e) => handleDelete(eachProduct)}
                          className='fa fa-trash deleteIcon'
                          style={{ fontSize: '20px', color: 'gray' }}
                          aria-hidden='true'
                        ></i>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='section'></div>
                <div className='total details'>
                  <div className='totalqty'>Total Cart Items: {cartTotal}</div>
                  <div className='totalprice'>Total Cart Price: Rs.{totalPrice}</div>
                </div>
              </div>
            </>
          ) : (
            <div>
              <h1 className='cart-empty'>You don't have any items in your cart yet</h1>
              <button className='back-btn' onClick={backHome}>
                Go back
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cartpage;
