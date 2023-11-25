import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

function Update() {
    const [Content, setContent] = useState('글내용');
    const [Pass_comment, setPass_comment] = useState('');
    const { Bnum } = useParams();
    console.log('업데이트에서의 bnum == ' + Bnum)
    const navigate = useNavigate();

    

    // const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // Event handler for form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const get_detail = (Bnum) => {
            console.log('bnum ==== ' + Bnum)
            axios.get('http://127.0.0.1:8000/blog/get_BoardDetail?Bnum=' + Bnum).then((response) => {
                const detail = response.data;
                console.log(detail)
                console.log('Update 호출')

                setContent(detail[0]);
                setFormData(detail[0])
            });

        }
        get_detail(Bnum);
    }, [Bnum]);

    const [formData, setFormData] = useState({
        writer: '',
        pass_field: '',
        title: '',
        content: '',
        boardid: ''
    
      });

    const Pass_chk_Submit = async (e) => {
        e.preventDefault();
        // Add your logic to handle the form submission, e.g., make an API request
        console.log('Form submitted:', formData);
        try {
            // Make a POST request to the Django endpoint
            const response = await axios.post('http://127.0.0.1:8000/blog/Pass_chk_Submit?Bnum=' + Bnum, formData, {
                headers: {
                    // 'X-CSRFToken': csrfToken,
                },
            });
            // Handle the response as needed
            console.log('Response from Django:', response);
            console.log('Response from Django:', response.data);
            navigate("/Update");
            console.log('글 수정으로 이동')

        } catch (error) {
            // Handle errors
            console.error('Error submitting form:', error);
        }
    };
    


    return (
        <div className="App">
      <div className="post-container">
        <table className="post-table">
          <thead>
            <tr>
              <th className='detail_th'>제목</th>
              <input name='title' className='board_input' value={formData.title} onChange={handleInputChange}></input>
            </tr>
            <tr>
              <th>작성자</th>
              <td><input name='writer' value={formData.writer} onChange={handleInputChange}></input></td>
            </tr>

          </thead>
          <tbody>
            <tr className='detail_empty'><td></td></tr>
            <tr className='detail_right'>
            <td></td>
              <td>
                <form onSubmit={Pass_chk_Submit}  className='detail_right'>
                  <input
                    type="text"
                    name="pass_field"
                    value={formData.pass_field}
                    onChange={handleInputChange}
                    placeholder='비밀번호를 입력하세요'
                  />
                  <button type="submit" className="btn btn-success">글수정</button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
        <div className='Pass_comment'>{Pass_comment}</div>

        <hr></hr>

        <textarea
  className="post-body"
  value={Content.content}
  onChange={(e) => setContent({ ...Content, content: e.target.value })}
/>
      </div>
    </div>

    );
}

export default Update;