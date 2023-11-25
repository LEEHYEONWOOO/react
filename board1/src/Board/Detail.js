import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';

function Content() {
  const [Content, setContent] = useState('글내용');
  const [Pass_comment, setPass_comment] = useState('');
  const { Bnum } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    pass_field: '',
    num: Bnum
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

  useEffect(() => {
    const get_detail = (Bnum) => {
      axios.get('http://127.0.0.1:8000/blog/get_BoardDetail?Bnum=' + Bnum).then((response) => {
        const detail = response.data;
        console.log('get_detail 호출')
        setContent(detail[0]);
      });
    }
    get_detail(Bnum);
  }, [Bnum]);

  const Pass_chk_Submit = async (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission, e.g., make an API request
    console.log('Form submitted 1 :', formData);
    const post = formData;
    try {
      // Make a POST request to the Django endpoint
      const response = await axios.post('http://127.0.0.1:8000/blog/Pass_chk_Submit', post, {
        headers: {
          // 'X-CSRFToken': csrfToken,
        },
      });
      // Handle the response as needed
      console.log('Form submitted 2 :', post);
      console.log('Form submitted 3 :', formData);
      console.log("Bnum ==위== " + Bnum)
      if (response.data.success == true) {
        console.log("Bnum ==아래== " + Bnum)
        navigate("/Update/" + Bnum);//이게이상한듯
        console.log('글 수정으로 이동')
      } else (
        setPass_comment('비밀번호가 다릅니다.')

      )

    } catch (error) {
      // Handle errors
      setPass_comment('서버 문제있음.')
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
              <td>{Content.title}</td>
            </tr>
            <tr>
              <th>작성자</th>
              <td>{Content.writer}</td>
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

        <div className="post-body" dangerouslySetInnerHTML={{ __html: Content.content }} />
      </div>
    </div>

  );
}

export default Content;