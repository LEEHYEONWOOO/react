import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App'
import List from './Board/List'
import Detail from './Board/Detail'
import Write from './Board/Write'
import Update from './Board/Update';





function Routing() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}></Route>
        <Route path="/List" element={<List/>}></Route>
        <Route path="/Detail/:Bnum" element={<Detail/>}></Route>
        <Route path="/Write" element={<Write/>}></Route>
        <Route path="/Update/:Bnum" element={<Update/>}></Route>
        

      </Routes>
    </BrowserRouter>
  );
}

export default Routing;