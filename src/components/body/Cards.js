import React from 'react'

export default function Cards(props) {
  return (
    <div className='card2'>
        <img src={props.items.image} alt='logo'/>

        <div>
            <h5>{props.items.title}</h5>
            <p>{props.items.color}</p>
            <p>{props.items.calidad}</p>
            <p>{props.items.precio}</p>
            <button type='button' class="btn btn-outline-warning">Comprar</button>
        </div>
      
    </div>
  )
}
