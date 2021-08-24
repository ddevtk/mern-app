import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleProduct,
  updateProduct,
} from '../redux/actions/product.action';

import { message } from 'antd';
import 'antd/dist/antd.css';
import { useHistory, useParams } from 'react-router-dom';
import productActionType from '../redux/type/product.type';

const EditProduct = () => {
  const { product } = useSelector((state) => state.productDetail);
  const { isLoading, isSuccess, error } = useSelector(
    (state) => state.updateProduct
  );

  const { id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [category, setCategory] = useState();
  const [brand, setBrand] = useState();
  const [countInStock, setCountInStock] = useState();
  const [description, setDescription] = useState();

  const submitHandler = (e) => {
    console.log(countInStock, price);
    e.preventDefault();
    dispatch(
      updateProduct({
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
        id,
      })
    );
  };

  useEffect(() => {
    dispatch(getSingleProduct(id));
    return () => {
      dispatch({ type: productActionType.UPDATE_PRODUCT_RESET });
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (product.name) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setBrand(product.brand);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
    if (isSuccess) {
      setTimeout(() => {
        history.push('/admin/product-list');
      }, 1000);
    }
    if (error) {
      dispatch({ type: productActionType.UPDATE_PRODUCT_RESET });
    }
  }, [
    isSuccess,
    dispatch,
    error,
    history,
    product.name,
    product.price,
    product.image,
    product.category,
    product.brand,
    product.countInStock,
    product.description,
  ]);

  const key = 'updatable';
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          <h1>Edit Product</h1>
          {isLoading && message.loading({ content: 'Loading...', key })}
          {error && message.error({ content: error, key, duration: 3 })}
          {isSuccess &&
            message.success({
              content: 'Update successfully',
              key,
              duration: 1,
            })}
          <Row>
            <Form onSubmit={(e) => submitHandler(e)}>
              <Form.Group className='mb-3' controlId='formBasicName'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='text'
                  value={price}
                  onChange={(e) => setPrice(+e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type='text'
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type='text'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type='text'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type='text'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Count in stock</Form.Label>
                <Form.Control
                  type='text'
                  value={countInStock}
                  onChange={(e) => setCountInStock(+e.target.value)}
                />
              </Form.Group>

              <Button variant='primary' type='submit'>
                Update
              </Button>
            </Form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;
