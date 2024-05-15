import React from 'react'
import {Routes, Route, HashRouter} from "react-router-dom";
import Registro from './header/Registro';
import Login from './Login';
import App from '../App';
import Inicio2 from './Inicio2';

function Router() {
  return (
    <HashRouter>
        <Routes>
            <Route exact path='/' element={<App/>}/>
            <Route exact path='/registro' element={<Registro/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/sesion' element={<Inicio2/>}/>

        </Routes>
    </HashRouter>
  )
}

export default Router
