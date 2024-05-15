import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2'
import "./registro.css"


export default function Registro() {

  const [identificacionError, setIdentificacionError] = useState(false)
  const [nomError, setNomError] = useState(false)
  const [apellidoError, setApellidoError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [emailErrorVacio, setErrorEmailVacio] = useState(false)
  const [direccionError, setDireccionError] = useState(false)
  const [telefonoError, setTelefonoError] = useState(false)
  const [fechaNacimientoError, setFechaNacimientoError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorRepeat, setPasswordErrorRepeat] = useState(false)
  const [passComparacion, setPassComparacion] = useState(false)

  const form = useRef()

  function idError() { 
    setIdentificacionError(false)
  }
  function nombreError() {
    setNomError(false)
  }
  function apelliError() {
    setApellidoError(false)
  }
  function errorEmail() {
    setEmailError(false)
    setErrorEmailVacio(false)
  }
  function dirError() {
    setDireccionError(false)
  }
  function telError() {
    setTelefonoError(false)
  }
  function fechaNacimientoErrorFuncion() {
    setFechaNacimientoError(false)
  }
  function passError() {
    setPasswordError(false)
  }
  function passRepeat() {
    setPassComparacion(false)
    setPasswordErrorRepeat(false)
  }

  const [values, setValues] = useState({
    identificacion: "",
    nombres: "",
    apellidos: "",
    email: "",
    direccion: "",
    telefono: "",
    fechaNacimiento: "",
    password: "",
    passRepeat: ""
  })
  const handleChange = (e) => {

    const { name, value } = e.target
    const newValues = {
      ...values,
      [name]: value,
    }
    setValues(newValues)
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    let validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    let validEmail = /^\w+([.-_+]?\w+)@\w+([.-]?\w+)(\.\w{2,10})+$/;

    if (values.identificacion.length < 5 || values.identificacion.length > 10 || values.identificacion.length === 0) {
      setIdentificacionError(true)
      return
    }
    else if (values.nombres.length < 3 || values.nombres.length === 0) {       
      setNomError(true)
      return
    }
    else if (values.apellidos.length < 3 || values.apellidos.length === 0) {
      setApellidoError(true)
      return
    }
    else if (values.email.length === 0) {
      setErrorEmailVacio(true)
      return
    }

    else if (!validEmail.test(values.email)) {
      setEmailError(true)
      return
    }
    else if (values.direccion.length < 15) {
      setDireccionError(true)
      return
    }
    else if (values.telefono.length < 10 || values.telefono.length > 10) {
      setTelefonoError(true)
      return
    }
    else if (values.fechaNacimiento === "") {
      setFechaNacimientoError(true)
      return
    }
    else if (!validPassword.test(values.password)) {
      setPasswordError(true)
      return
    }
    else if (values.passRepeat.length === 0) {
      setPasswordErrorRepeat(true)
      return
    }
    else if (values.password !== values.passRepeat) {
      setPassComparacion(true)
      return
    }


    fetch('http://localhost:3001/registro-usuario', {
      method: 'POST',
      headers: { "Content-Type": "application/json", 'Accept': 'application/json' },
      body: JSON.stringify(values)
    })
    .then(response => {
      if (response.status === 200) {
        // alert("Usuario creado con éxito")
        Swal.fire({
          title: "Usuario creado con éxito",
          icon: "success"
        })
        form.current.reset()
        window.location.hash = '/login'

      }
      if (response.status === 400) {
        //alert(" + response.status)
        Swal.fire({
          title: "No fue posible crear el usuario porque ya existe el correo ingresado " + values.email,
          icon: "warning"
        })

      }
    })
    .catch((error) => {
      //alert("No fue posible finalizar el proceso de registro por un error " + error)
      Swal.fire({
        title: "No fue posible finalizar el proceso de registro por un error interno del servidor ",
        icon: "error"
      })
    })
  }


  return (
    <div className='formulario'>
      <h1> Registro </h1>
      <form onSubmit={handleSubmit} ref={form}>
        <div class="form-group">
          <label for="identificacion">Identificacion</label>
          <input type="number" className="form-control" id="inputIdentificacion" name='identificacion' onChange={handleChange} placeholder="Debe estar entre 5 y 10 digitos" onClick={idError} />
          {identificacionError ? <p>La identificación debe estar entre 5 y diez números</p> : ""}

        </div>
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input type="text" class="form-control" id="inputNombre" name='nombres' onChange={handleChange} placeholder="Debe ser de minimo tres caracteres" onClick={nombreError} />
          {nomError ? <p>El nombre debe contener mínimo 3 caracteres</p> : ""}
        </div>
        <div class="form-group">
          <label for="nombre">Apellido</label>
          <input type="text" class="form-control" id="inputApellido" name='apellidos' onChange={handleChange} placeholder="Debe ser de minimo tres caracteres" onClick={apelliError} />
          {apellidoError ? <p>El apellido debe contener mínimo 3 caracteres</p> : ""}
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="InputEmail" name='email' onChange={handleChange} aria-describedby="emailHelp" placeholder="Debe ser un formato valido. Ejemplo: alguien@gmail.com" onClick={errorEmail} />
          {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
          {emailError ? <p>El email debe tener la estructura de una dirección de correo electrónico. Verbigracia: alguien@gmail.com</p> : ""}
          {emailErrorVacio ? <p>Debe introducir una dirección de correo electrónico.</p> : ""}
        </div>
        <div class="form-group">
          <label for="direccion">Direccion</label>
          <input type="text" class="form-control" id="inputDireccion" name='direccion' onChange={handleChange} placeholder="Debe ser de minimo quince caracteres" onClick={dirError} />
          {direccionError ? <p>La dirección debe contener mínimo 15 caracteres</p> : ""}
        </div>
        <div class="form-group">
          <label for="telefono">Telefono</label>
          <input type="number" class="form-control" id="inputTelefono" name='telefono' onChange={handleChange} placeholder="Debe ser de diez numeros" onClick={telError} />
          {telefonoError ? <p>El teléfono debe ser de 10 números</p> : ""}
        </div>
        <div class="form-group">
          <label for="fecha">Fecha</label>
          <input type="date" class="form-control" id="inputFecha" name='fechaNacimiento' onChange={handleChange} placeholder="MM/DD/YYYY" onClick={fechaNacimientoErrorFuncion} />
          {fechaNacimientoError ? <p>Debe introducir una fecha de nacimiento</p> : ""}
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" name='password' onChange={handleChange} placeholder="Password" onClick={passError} />
          {passwordError ? <p>La contraseña no cumple con los requisitos mínimos solicitados(Mínimo 8 caracteres de longitud. Almenos una letra mayúscula. Almenos una letra minúscula. Almenos un número. Almenos un caracter especial).</p> : ""}
        </div>
        <div class="form-group">
          <label for="password2">Repeat your password</label>
          <input type="password" class="form-control" id="inputPassword2" name='passRepeat' onChange={handleChange} placeholder="Password" onClick={passRepeat} />
          {passComparacion ? <p>Las contraseñas ingresadas no coinciden</p> : ""}
          {passwordErrorRepeat ? <p>Este campo no puede quedar vacío.</p> : ""}
        </div>
        {/* <div class="form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div> */}
        <div className='boton'>
          <button type="submit" class="btn btn-primary">Register</button>
        </div>
      </form>
    </div>
  )
}