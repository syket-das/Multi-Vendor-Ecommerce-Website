import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

const PaymentMethodScreen = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();

  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || 'Paypal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({
      type: 'SAVE_PAYMENT_METHOD',
      payload: paymentMethodName,
    });

    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <div className="">
      <Container className="small-container">
        <CheckoutSteps step1 step2 step3 />
      </Container>
      <Helmet>
        <title>Payment Method</title>
      </Helmet>
      <Container className="small-container">
        <h1 className="my-3">Payment Method</h1>

        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="paypal"
              label="paypal"
              value="paypal"
              checked={paymentMethodName === 'paypal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Stripe"
              label="Stripe"
              value="Stripe"
              checked={paymentMethodName === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default PaymentMethodScreen;
