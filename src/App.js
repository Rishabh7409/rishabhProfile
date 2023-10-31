import React, {  Suspense } from "react";
import { Routes,Route, BrowserRouter } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import "toastr/build/toastr.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import DashBoard from './component/dashboard';
import LoginPage from './component/login/LoginPage';
import { Loader } from "./component/sofbox";
import BookList from "./component/Books/BookList";
import BookEdit from "./component/Books/BookEdit";
import BookView from "./component/Books/BookView";

function App() {

  return (
    <div className="App">
       <Suspense fallback={<Loader />}>
        <BrowserRouter> 
                <Routes>
                    <Route path="/" element={<DashBoard/>} />
                    {/* <Route path="/books" element={<TravelWebsite/>} /> */}
                    <Route path="/books" element={<BookList/>} />
                    <Route path="/book/view/:id" element={<BookView/>} />
                    <Route path="/book/edit/:id" element={<BookEdit/>} />
                    <Route path="/book/add" element={<BookEdit/>} />
                    <Route path="/login" element={<LoginPage/>} />
                </Routes>
        </BrowserRouter>
      </Suspense>      
    </div>
  );
}

export default App;
