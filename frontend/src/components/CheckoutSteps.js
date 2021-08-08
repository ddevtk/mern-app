import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Steps } from 'antd';
import { Redirect, useHistory } from 'react-router-dom';

const CheckoutSteps = () => {
  let stp;
  const pathName = window.location.pathname;
  if (pathName === '/shipping') {
    stp = 0;
  } else if (pathName === '/payment') {
    stp = 1;
  } else {
    stp = 2;
  }
  const { Step } = Steps;
  const [step, setStep] = useState(stp);
  const history = useHistory();

  const onChange = (current) => {
    setStep(current);
  };

  useEffect(() => {
    if (step === 0) {
      history.push('/shipping');
    }
    if (step === 1) {
      history.push('/payment');
    }
    if (step === 2) {
      history.push('/place-order');
    }
  }, [step]);

  return (
    <Steps current={step} className='mb-4' onChange={onChange}>
      <Step title='Shipping' />
      <Step title='Payment' disabled={step === 0} />
      <Step title='Place order' disabled={step === 0 || step === 1} />
    </Steps>
  );
};

export default CheckoutSteps;
