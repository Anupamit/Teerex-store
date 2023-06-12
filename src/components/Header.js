import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles/Header.css';

const Header = ({ cartItems, totalQuantity }) => {
  const { path } = useParams();
  const navigate = useNavigate();

  const cartPage = () => {
    navigate('/cart');
  };

  const home = () => {
    navigate('/');
  };

  const cartTotal = totalQuantity(cartItems);

  return (
    <div className='nav-container'>
      <div className='nav-logo' onClick={home}>
        TeeRex Store
      </div>
      <div className='nav-elements'>
        <Link to='/' className={`nav-link ${path === '/' ? 'active' : ''}`} onClick={home}>
          Products
        </Link>
        <div className='cart-icon-btn'>
          <span className='badge'>{cartTotal}</span>
          <img src='assets/cart.svg' onClick={cartPage} alt='cart' />
        </div>
      </div>
    </div>
  );
};

export default Header;
