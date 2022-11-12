import LogIn from '@pages/Login';
import SignUp from '@pages/SignUp';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn/>}></Route>
      <Route path="/login" element={<LogIn/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
    </Routes>
  )


};

export default App;

//pages - 서비스 페이지
//components - 페이지 안의 컴포넌트
//layouts - 공통 레이아웃
