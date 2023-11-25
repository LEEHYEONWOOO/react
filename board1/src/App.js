import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'



function App() {
  return (
    <React.StrictMode>
      <div className="App">
        <h1>환영합니다</h1>
        <h1>이곳은 메인페이지입니다.</h1>

      </div>
    </React.StrictMode>
  );
}

export default App;