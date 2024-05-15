import React, { useState } from 'react'
import Carrusel from './carrusel/Carrusel'
import Footer from './footer/Footer'
import CardList from './body/CardList'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StyleIcon from '@mui/icons-material/Style';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneIcon from '@mui/icons-material/Phone';
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2';
import SesionExpired from './sesionExpired/SesionExpired';


export default function Inicio2() {

    function out(){
        Swal.fire({
            title: "Esta seguro de cerrar la sesion",
            icon: "Error",
            showCancelButton: true,
            confirmButtonText: "Cerrar sesion",
            cancelButtonText: "Cancelar"
        }).then((result)=> {
            if(result.isConfirmed){
                window.location.hash = '/'
            }
        });
    }
    const cookie = new Cookies();
    const nombre = cookie.get("nombres");
    const apellidos = cookie.get("apellidos");
    const email = cookie.get("email");

    return (
        <div className="contenedor">
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <img src="logoZapatos.jpg" className="logo" alt="logo" />
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <HomeIcon />
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <PeopleAltIcon />
                                <a className="nav-link" href="#">Genero</a>
                            </li>

                            <li className="nav-item">
                                <StyleIcon />
                                <a className="nav-link disabled">Referencias</a>
                            </li>

                            <li className="nav-item">
                                <VerifiedIcon />
                                <a className="nav-link disabled">Recursos</a>
                            </li>

                            <li className="nav-item">
                                <PhoneIcon />
                                <a className="nav-link disabled">Contacto</a>
                            </li>

                            <li>
         
                                <p>Bienvenido {nombre} {apellidos}</p>
                                <p>{email}</p>
                                
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="button" onClick={out}>Salir</button>
                        </form>
                    </div>
                </div>
            </nav>
            <Carrusel />
            <CardList />
            <Footer />
            <SesionExpired />
        </div>

    )
}
