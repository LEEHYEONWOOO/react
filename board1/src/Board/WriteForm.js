import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

function WriteForm() {
    return (
        <div className="App">
          <h1>글 내용을 확인합니다</h1>
          <button>게시판보기</button>
  
  
        </div>
    );
  }
  
  export default WriteForm;