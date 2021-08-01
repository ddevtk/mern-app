import React from 'react';
import { Spinner } from 'react-bootstrap';

const Spin = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spinner animation='border' style={{ fontSize: '40px' }} />
    </div>
  );
};

export default Spin;
