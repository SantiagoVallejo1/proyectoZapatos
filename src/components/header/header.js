import React from "react";
import "./header.css";
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StyleIcon from '@mui/icons-material/Style';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import {Link} from 'react-router-dom';

function Header() {
    return (
        <div className="contenedor">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <img src="logoZapatos.jpg" className="logo" alt="logo"/>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <HomeIcon/>
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <PeopleAltIcon/>
                                <a className="nav-link" href="#">Genero</a>
                            </li>
                            
                            <li className="nav-item">
                                <StyleIcon/>
                                <a className="nav-link disabled">Referencias</a>
                            </li>

                            <li className="nav-item">
                                <VerifiedIcon/>
                                <a className="nav-link disabled">Recursos</a>
                            </li>

                            <li className="nav-item">
                                <PhoneIcon/>
                                <a className="nav-link disabled">Contacto</a>
                            </li>
                            <Link to="/registro">
                            <li className="nav-item">
                                <PersonAddIcon/>
                                <a className="nav-link disabled">Registrarse</a>
                            </li>
                            </Link>
                            <Link to="/login">
                            <li className="nav-item">
                                <LockPersonIcon/>
                                <a className="nav-link disabled">Iniciar sesion</a>
                            </li>
                            </Link>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header