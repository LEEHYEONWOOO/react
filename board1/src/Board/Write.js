import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams, BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';


function Write() {
  const [formData, setFormData] = useState({
    writer: '',
    pass_field: '',
    title: '',
    content: '',
    boardid: ''

  });

  // const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

  // Event handler for form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission, e.g., make an API request
    console.log('Form submitted:', formData);
    try {
      // Make a POST request to the Django endpoint
      const response = await axios.post('http://127.0.0.1:8000/blog/Board_write/', formData, {
        headers: {
          // 'X-CSRFToken': csrfToken,
        },
      });
      // Handle the response as needed
      console.log('Response from Django:', response.data.success);
      navigate("/List");
      console.log('글작성 성공했으니 글목록으로 이동')

    } catch (error) {
      // Handle errors
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="App">
      <h2>글작성</h2>
      <form onSubmit={handleSubmit} className="post-container">
        <div className="post-title">
          <label>
            제목 :
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <label>
          <div className='post-writer'>
            작성자:
            <input
              type="text"
              name="writer"
              value={formData.writer}
              onChange={handleInputChange}
            />
          </div>
        </label>
        <div>
          <label>
            비밀번호:
            <input
              type="text"
              name="pass_field"
              value={formData.pass_field}
              onChange={handleInputChange}
              className='write_input'
            />
          </label>
        </div>

        <div className="post-body">

          <label>
            글내용:
            <textarea
              type="text"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button className='write_submit_button' type="submit">작성하기</button>
      </form>
    </div>
  );
};

export default Write;