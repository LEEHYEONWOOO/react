import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useSWR from 'swr';
import Detail from './Detail'

function List() {
    const [time, setTime] = useState(1);
    const [content, setContent] = useState('');
    const [lists, setLists] = useState([]);
    const [board_name, setboard_name] = useState('전체글');
    const navigate = useNavigate();

    const getContent = (i) => {
        axios.get('http://127.0.0.1:8000/blog/get_BoardList?Bid='+i).then((response) => {
        const Json = response.data
        if(i==0){
            setboard_name('전체글')
        }else if (i==1) {
            setboard_name('공지사항')
            
        } else {
            setboard_name('정보공유')
            
        }
        for (const i in Json) {
            setLists(Json.map(post => post));
        }
        });
    }
    
    useEffect(() => {
      const get_list = () => {
        axios.get('http://127.0.0.1:8000/blog/get_BoardList/?Bid=0').then((response) => {
          const Json = response.data
          console.log('List 초기화면 get_list 호출')
          console.log(Json)
          for (const i in Json) {
            setLists(Json.map(post => post));
          }
        });
      }
      get_list(0);
    },[]);

    return (
        <div className="App">
            <h1>{board_name}</h1>
            <div className='SetBoardid'>
                <button onClick={() => getContent(0)} class="btn btn-primary">전체글</button>
                <button onClick={() => getContent(1)} class="btn btn-danger">공지사항</button>
                <button onClick={() => getContent(2)} class="btn btn-warning">정보공유</button>
            </div>
            <div className='write_bttn'>
            <button onClick={() => {navigate("/Write");}} class="btn btn-success">글작성</button>
            </div>

    {lists.length>0 && (
    <table className='bulletin-board-list'>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>등록일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        {lists.map((post, i) => (
          <tr key={post.num}>
            <td>{post.num}</td>
            <td>
              <Link to={'/Detail/'+post.num}>
                {post.title}
              </Link>
              </td>
            <td>{post.writer}</td>
            <td>{post.regdate}</td>
            <td>{post.readcnt}</td>
          </tr>
        ))}
      </tbody>
    </table>
    )}

        </div>
    );
}

export default List;