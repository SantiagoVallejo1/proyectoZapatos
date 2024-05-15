import React from 'react'
import data from './data';
import Cards from './Cards';
import "./card.css";

function CardList() {
    const cards = data.map(items => {
        return(
            <Cards key = {items.id} items = {items}/>
        )
    });
  return (
    <div className='divCards'>
      {cards}
    </div>
  )
}

export default CardList
