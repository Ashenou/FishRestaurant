import React from 'react';

import AddFishForm from './AddFishForm';
import base from '../base';

// import loadSamples from './App';



class Inventory extends React.Component{
    constructor(){
        super();
        this.renderInventory= this.renderInventory.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.authHandler = this.authHandler.bind(this);
        this.authenticate = this.authenticate.bind(this);
        this.renderLogin = this.renderLogin.bind(this);
        this.state = {
            uid :null,
            owner : null   
        }
    }
    handleChange(e,key){
        const fish = this.props.fishes[key]; //take a copy of that fish and update it with the new data using spread
        // console.log(fish);
        const updatedFish = {...fish,
        [e.target.name]: e.target.value };
        console.log(e.target.name ,e.target.value);  //gives you the actual updated element which was sent from the event
        this.props.updateFish(key,updatedFish);   //passes the updated fish with it's key to app
    }
    authenticate(provider){
        console.log(`Trying to login with ${provider}`);

        base.AuthWithOAuthPopup(provider,this.authHandler);
        
    }

    authHandler(err,authData){
        console.log(authData);
    }
    renderLogin(){
        return(
            <nav className="login">
            <h2>Inventory</h2>
            <p>Sign in to manage your store's Inventory</p>
            <button className="facebook" onClick={()=>this.authenticate('facebook')}>Login with Facebook</button>
            {/* <button className="twitter" onClick={()=>this.authenticate(`google`)}>Login with twitter</button> */}
            </nav>
        )
    }
    renderInventory(key){
        const fish = this.props.fishes[key];  //gets fishes by key--- in order to use this word here you have to bind render inventory to component
        return(
            <div className="fish-edit" key={key}>

            <input type="text" name="name" placeholder="fish name"  value={fish.name} onChange={(e)=>this.handleChange(e,key)}/>
            <input type="text" name="price" placeholder="fish price" value={fish.price} onChange={(e)=>this.handleChange(e,key)}/>
            <select name="status"  value={fish.status} onChange={(e)=>this.handleChange(e,key)}>
                <option value="available">Fresh!</option>
                <option value="unavailable">Sold Out!</option>
            </select>
            <textarea type="text" name="desc" placeholder="fish desc" value={fish.desc} onChange={(e)=>this.handleChange(e,key)}/>
            <input type="text" name="image"  placeholder="fish image" value={fish.image} onChange={(e)=>this.handleChange(e,key)}/>
            <button onClick={()=> this.props.removeFish(key)}>Remove Fish</button>
            
            </div>
        )
    }

    render(){
        const logout =<button>Log Out!</button>
        //check of thery are not logged in
        // if(!this.state.uid){
        //     return <div>{this.renderLogin()}</div>
        // }
        // // check if they are the owner of the current store
        // if(this.state.uid !== this.state.owner){
        //     return(
        //         <div>
        //         <div>Sorry you aren't the owner of the store</div>
        //         {logout}
        //         </div>
        //     )
        // }
        return(
            <div>
            <h2>Inventory</h2>
            {logout}
            {Object.keys(this.props.fishes).map(this.renderInventory)}
             <AddFishForm addFish={this.props.addFish}/>    {/*we did this so pass down addfish() method to add fish form */}
             <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>
        ) 
    }
}

Inventory.propTypes = {
    fishes:     React.PropTypes.object.isRequired,
    updateFish:React.PropTypes.func.isRequired,
    removeFish:React.PropTypes.func.isRequired,
    addFish:React.PropTypes.func.isRequired,
    loadSamples:React.PropTypes.func.isRequired
}
export default Inventory;  