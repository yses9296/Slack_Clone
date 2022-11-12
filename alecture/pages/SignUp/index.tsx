import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom'
import { Header, Form, Label, Input, Button, Error, Success, LinkContainer } from './style'

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [mismatchError, setMismatchError] = useState(false);
    const [signUpError, setSignUpError] = useState('');
    const [signUpSuccess, setSignUpSuccess] = useState(false);
    
    // const onChangeEmail = (e) => {setEmail(e.target.value)}
    // const onChangeNickname = (e) => {setNickname(e.target.value)}
    // const onChangePassword = useCallback(
    //     (e) => {
    //       setPassword(e.target.value);
    //       setMismatchError(e.target.value !== passwordCheck);
    //     },
    //     [passwordCheck],
    // );

    //임시
    const onChangeEmail = () => {}
    const onChangeNickname = () => {}
    const onChangePassword = () => {}
    const onChangePasswordCheck = useCallback(
        () => {

        },
        []
    )
    const onSubmitHandler = useCallback(
        () => {

        },
        []
    );


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
                <Label id="nickname-label">
                    <span>Nickname</span>
                    <p>
                        <Input type="nickname" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname}></Input>
                    </p>
                </Label>
                <Label id="password-label">
                    <span>비밀번호</span>
                    <p>
                        <Input type="password" id="password" name="password" value={password} onChange={onChangePassword} />
                    </p>
                </Label>
                <Label id="password-check-label">
                    <span>Confirm Password</span>
                    <div>
                        <Input type="password" id="password-check" name="password-check" value={passwordCheck} onChange={onChangePasswordCheck}
                        />
                    </div>

                    {mismatchError && <Error>비밀번호가 일치하지 않습니다.</Error>}
                    {!nickname && <Error>닉네임을 입력해주세요.</Error>}
                    {signUpError && <Error>{signUpError}</Error>}
                    {signUpSuccess && <Success>회원가입되었습니다! 로그인해주세요.</Success>}
                </Label>
                <Button type="submit">Sign Up</Button>
            </Form>
            <LinkContainer>
                이미 회원이신가요?&nbsp;
                <Link to="/login">로그인 하러가기</Link>
            </LinkContainer>
        </div>
    )
}

export default SignUp