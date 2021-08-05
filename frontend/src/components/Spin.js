import React from 'react';
import { Spinner } from 'react-bootstrap';

const Spin = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Spinner
        animation='border'
        style={{
          width: '100px',
          height: '100px',
          margin: 'auto',
          display: 'block',
        }}
      />
    </div>
  );
};

export default Spin;
