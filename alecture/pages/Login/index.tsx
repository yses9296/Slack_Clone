import useInput from '@hooks/useInput';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom'
import useSWR from 'swr';
import fetcher from '@utils/fetcher'
import { Header, Label, Input, LinkContainer, Button, Success, Form, Error } from '../SignUp/style'

const LogIn = () => {
  const {data, error} = useSWR('http://localhost:3095/api/users', fetcher)
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [logInError, setlogInError] = useState(false);

  const onSubmitHandler = useCallback( 
    (e: any) => {
      e.preventDefault();
      setlogInError(false);

      axios.post('/api/users/login', { email, password })
      .then( (response) => {
        console.log(response);
      } )
      .catch( (err) => {
        setlogInError(err.response?.data?.statusCode === 401)
      } )
      .finally( () => {} )

    }
  , [email, password]);

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
        {logInError && <Error>이메일과 비밀번호 조합이 일치하지 않습니다.</Error>}
        <Button type="submit">Sign In</Button>
      </Form>
      <LinkContainer>
        아직 회원이 아니신가요?&nbsp;
        <Link to="/signup">회원가입 하러가기</Link>
      </LinkContainer>
    </div>
  )
}

export default LogIn