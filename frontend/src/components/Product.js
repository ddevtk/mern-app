import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import 'antd/dist/antd.css';
import { formatPrice } from '../utils/formatPrice';

const Product = ({ product }) => {
  const { image, name, _id, rating, price, numReviews } = product;
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${_id}`}>
        <Card.Img src={image} alt={name} variant='top' />
      </Link>
      <div className='card-body'>
        <Link to={`/product/${_id}`} className='product-title'>
          <div className='card-title'>
            <strong>{name}</strong>
          </div>
        </Link>
        <div className='card-title'>
          <Rate
            disabled
            allowHalf
            defaultValue={rating}
            style={{ fontSize: '1.2em' }}
          />
          <span
            style={{
              margin: '0px 0 0 4px',
            }}
          >
            {numReviews} reviews
          </span>
        </div>
        <h3 className='card-title'>{formatPrice(price)}</h3>
      </div>
    </Card>
  );
};

export default Product;
