import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { getAllProduct } from '../redux/actions/product.action';
import Spin from '../components/Spin';

const HomePage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, products } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      <h1>Latest product</h1>
      <Row>
        {isLoading && <Spin />}
        {!isLoading && error !== null && <h2>{error}</h2>}
        {!isLoading &&
          error === null &&
          products.map((product, idx) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={idx}>
                <Product product={product} />
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default HomePage;
