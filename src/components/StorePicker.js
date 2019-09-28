import React from 'react';

import {getFunName} from '../helpers';
class StorePicker extends React.Component{


    goToStore(event){
        event.preventDefault();
        console.log(this.storeInput.value);
        this.context.router.transitionTo(`/store/${this.storeInput.value}`);            //assigns store name to router  
    }
    render(){
        return (
            <form className='store-selector' onSubmit={(e)=>{this.goToStore(e)}}>                {/*calls event function */}
            {/* Comment has to be here */}
                <h2>Please enter a store</h2>
                 <input type='text' placeholder='Store Name' defaultValue={getFunName()} ref={(input)=>{this.storeInput=input}}/>        {/*callfunction from helpers.js */}  {/*passing input to the other function*/}
                <button type='submit'>Visit Store</button>
            </form>
        )
    }
}

StorePicker.contextTypes = {            //gets value from parent components to child(index page to secondry pages)
    router: React.PropTypes.object          //gets react prop to router 
}

export default StorePicker;
