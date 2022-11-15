import React from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const LogIn = loadable( () => import('@pages/Login'));
const SignUp = loadable( () => import('@pages/SignUp')); 
const Channel = loadable( () => import('@pages/Channel')); 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn/>}></Route>
      <Route path="/login" element={<LogIn/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/workspace/channel" element={<Channel/>}></Route>
    </Routes>
  )
};

export default App;

//pages - 서비스 페이지
//components - 페이지 안의 컴포넌트
//layouts - 공통 레이아웃
