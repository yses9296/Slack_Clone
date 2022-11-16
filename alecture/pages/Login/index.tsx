import useInput from '@hooks/useInput';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Link, Navigate  } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher'
import { Header, Label, Input, LinkContainer, Button, Success, Form, Error } from '../SignUp/style'

const LogIn = () => {

  const {data, error, mutate} = useSWR('http://localhost:3095/api/users', fetcher, {dedupingInterval: 2000}) // 2초동안 데이터 캐시
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [logInError, setlogInError] = useState(false);

  const onSubmitHandler = useCallback( 
    (e: any) => {
      e.preventDefault();
      setlogInError(false);

      axios.post('/api/users/login', { email, password }, {withCredentials: true})
      .then( (response) => {
        console.log(response);
        mutate(false, false);
      } )
      .catch( (err) => {
        setlogInError(err.response?.data?.statusCode === 401)
      } )
      .finally( () => {} )

    }
  , [email, password]);

  console.log(data)

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (data) {
    return <Navigate to="/workspace/" />;
  }

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