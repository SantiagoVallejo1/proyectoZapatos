import React, { useState } from 'react'
import FireBaseAuth from '@mui/icons-material/GitHub';
import GoogleOAuth from './googleOAuth/GoogleOAuth';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie'
import Footer from './footer/Footer';
import { AlternateEmail } from '@mui/icons-material';
import PasswordIcon from '@mui/icons-material/Password';
import GroupIcon from '@mui/icons-material/Group';

const Login = () => {
    const cookies = new Cookies()
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [showPassword, setShowPassword] = useState(true)

    const [values, setValues] = useState({
        rol: "",
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        const newValues = {
            ...values,
            [name]: value,
        }
        setValues(newValues)
    }

    const handleClickPassword = (e) => {
        setErrorPassword(false)
    }

    const handleClickEmail = (e) => {
        setErrorEmail(false)
    }

    const handleShowPassword = (e) => {
        setShowPassword(!showPassword)
    }

    const iniciarSesion = (e) => {
        e.preventDefault()
        let select = document.getElementById("exampleFormControlSelect1");
        values.rol = select.value

        if (values.password.length === 0 && values.email.length === 0) {
            setErrorEmail(true)
            setErrorPassword(true)
            return
        }

        if (values.password.length === 0) {
            setErrorPassword(true)
            return
        }

        if (values.email.length === 0) {
            setErrorEmail(true)
            return
        }

        fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: { "Content-Type": "Application/json", 'Accept': 'application/json' },
            body: JSON.stringify(values)
        })
            .then(Response => Response.json())
            .then(res => {
                console.log("res--> ", res)
                if (res.title === "error") {
                    Swal.fire({
                        title: "Las credenciales son incorrectas",
                        icon: "Error"
                    })
                    window.location.hash = '/login'
                    return
                }
                else {
                    cookies.set('email', res.email, {
                        secure: true,
                        sameSite: 'None',
                        path: "/"
                    })
                    cookies.set('nombres', res.nombres, {
                        secure: true,
                        sameSite: 'None',
                        path: "/"
                    })
                    cookies.set('apellidos', res.apellidos, {
                        secure: true,
                        sameSite: 'None',
                        path: "/"
                    })
                    if (values.rol === "Usuario") {
                        window.location.hash = '/sesion'
                    }
                     else{
                      window.location.hash = './usuariosReistrados.json'
                    }
                }
            })

        // fetch('http://localhost:3001/login', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
        //     body: JSON.stringify(values)
        // })

        //     .then(response => {
        //         if (response.status === 200 && values.rol === "Usuario") {
        //             cookies.set('email', values.email, {
        //                 secure: true,
        //                 sameSite: 'None',
        //                 path: '/'
        //             })
        //             window.location.hash = '/sesion'
        //         }
        //         else if (response.status === 200 && values.rol === "Administrador") {
        //             cookies.set('email', values.email, {
        //                 secure: true,
        //                 sameSite: 'None',
        //                 path: '/'
        //             })
        //             window.location.hash = '/usuarios-registrados'
        //         }

        //         else {
        //             console.log("sdfd", response.status)
        //             Swal.fire({
        //                 title: "Las credenciales ingresadas no son correctas",
        //                 icon: "error"
        //             })
        //             window.location.hash = '/login'
        //         }
        //     })

        //     .catch(() => Swal.fire({
        //         title: "No se puede iniciar sesion por un problema en el servidor",
        //         icon: "error"
        //     }),
        //         window.location.hash = '/login'
        //     )
    }


    return (
        <div>
            {/* <Header/> */}
            <form onSubmit={iniciarSesion}>
                <section className='vh-100 bg-primary'>
                    <div className='container py-5 h-100'>
                        <div className='row d-flex justify-content-center aling-items-center h-100'>
                            <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                                <div className='card shadow-2-strong rounded'>
                                    <div className='card-body p-5 text-center'>

                                        <he className='mb-5'></he>

                                        <div className=' form-group mb-4'>
                                            <div className='text-start'><label for='exampleFormControlSelect1'>Rol</label>
                                            </div>
                                            <div className='input-group mb-3'>
                                                <select className='form-control' id='exampleFormControlSelect1' name='rol'>
                                                    <option>Administrador</option>
                                                    <option>Usuario</option>
                                                </select>
                                                <div className='input-group-append'>
                                                    <span className='input-group-text' id='basic-addon2'><GroupIcon /></span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='form-outline mb-4'>
                                            <div className='text-start'>
                                                <label className='form-label' for='typeEmailX-2'>Email</label>
                                            </div>
                                            <div className='input-group mb-3'>
                                                <input type='text' class='form-control' aria-label="Recipient's username" arial-descibedby='basic-addon2' name='email' onChange={handleChange} onClick={handleClickEmail} />
                                                <div className='input-group-append'>
                                                    <span className='input-group-text' id='basic-addon2'><AlternateEmail /></span>
                                                </div>
                                            </div>
                                            <span className='text-start'>{errorEmail ? <p>Debe Ingresar un Email</p> : ""}</span>
                                        </div>
                                        <div className='form-outline mb-4'>
                                            <div className='text-start'>
                                                <label className='form-label' for='typeEmailX-2'>Password</label>
                                            </div>
                                            <div className='input-group mb-3'>
                                                <input type='text' class='form-control' aria-label="Recipient's username" arial-descibedby='basic-addon2' name='password' onChange={handleChange} onClick={handleClickPassword} />
                                                <div className='input-group-append'>
                                                    <span className='input-group-text' id='basic-addon2'><PasswordIcon onClick={handleShowPassword} /></span>
                                                </div>
                                            </div>
                                            <span className='text-start'>{errorPassword ? <p>Debe Ingresar un Password</p> : ""}</span>
                                        </div>
                                        <div className='d-grid gap-2 col-15 mx-auto'>
                                            <button className='btn btn-primary btn-lg btn-block' type='submit'>Login</button>
                                        </div>

                                        <hr className='my-20'></hr>

                                        <div className='row'>
                                            <div className='col-6'>
                                                <GoogleOAuth />
                                            </div>
                                            <div className='col-6'>
                                                <FireBaseAuth />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
            <Footer />
        </div>
    );
}

export default Login;