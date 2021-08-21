import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from 'antd';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { getAllProduct } from '../redux/actions/product.action';
import Spin from '../components/Spin';
import 'antd/dist/antd.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { isLoading, error, products, length } = useSelector(
    (state) => state.productList
  );
  const [current, setCurrent] = useState(1);

  console.log(products);

  console.log(length);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const onChange = (current, pageSize) => {
    setCurrent(current);
    dispatch(getAllProduct(pageSize, current));
  };

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
      {!isLoading && error === null && (
        <Pagination
          current={current}
          pageSize={4}
          total={length}
          onChange={onChange}
          responsive
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}
        />
      )}
    </>
  );
};

export default HomePage;
