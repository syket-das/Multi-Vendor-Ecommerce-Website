import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import {toast} from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import { getError } from '../utils';
const SigninScreen = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/signin', {
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (state.userInfo) {
      navigate(redirect || '/');
    }
  }, [state.userInfo, navigate, redirect]);
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="mb-3">
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </div>

        <div className="mb-3">
          New to us? <Link to={`/signup?redirect=${redirect}`}>Sign Up</Link>
        </div>
      </Form>
    </Container>
  );
};

export default SigninScreen;
