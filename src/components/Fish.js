import React from 'react';
import { formatPrice } from './../helpers';

class fish extends React.Component{
    render(){ 
      const {details} = this.props;        //destuctring
      const isAvailable = details.status === 'available';                //assigns details.status to is Available when it equals 'available'
      const buttonText = isAvailable ? 'Add To Order' : 'Sold Out';      //check for button text
      return(  
      <li className="menu-fish">
      <img src={details.image} alt={details.name}/>
      <h3 className="fish-name">
        {details.name}
        <span className="price">{formatPrice(details.price)}  </span>
      </h3>
      <p>{details.desc}</p>
      <button onClick={()=>this.props.addToOrder(this.props.index)} disabled={!isAvailable} >{buttonText}</button>             {/* disable button if not available*/}
      
      </li>
      )
    }
}

fish.propTypes = {
 details :      React.PropTypes.object.isRequired,
 index :React.PropTypes.string.isRequired,
 addToOrder: React.PropTypes.func.isRequired
  
}
export default fish;