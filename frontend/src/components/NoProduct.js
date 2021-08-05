import React from 'react';
import { Result, Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

const NoProduct = () => {
  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2725615_rp7dbzg71z.js',
  });
  return (
    <Result
      icon={<IconFont type='icon-iconsad' />}
      title='Oops! Your cart is empty'
      extra={
        <Link to='/'>
          <Button
            type='primary'
            style={{
              borderColor: 'black',
              backgroundColor: 'black',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            BACK TO HOME <IconFont type='icon-iconquit' />
          </Button>
        </Link>
      }
    />
  );
};

export default NoProduct;
