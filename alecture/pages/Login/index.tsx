import useInput from '@hooks/useInput';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom'
import { Header, Label, Input, LinkContainer, Button, Success, Form, Error } from '../SignUp/style'

const LogIn = () => {
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitHandler = useCallback( () => {

  }, []);

  return (
    <div id="container">
      <Header>Sleact</Header>
      <Form onSubmit={onSubmitHandler}>
        <Label id="email-label">
            <span>Email</span>
            <p>
                <Input type="email" id="email" name="email" value={email} onChange={onChangeEmail}></Input>
            </p>
        </Label>
        <Label id="password-label">
            <span>Password</span>
            <p>
                <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
            </p>
        </Label>
      </Form>
    </div>
  )
}

export default LogIn