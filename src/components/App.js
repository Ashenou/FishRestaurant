import React from 'react';

import Header from './Header';
import Order from './Order';                                                            //Main component
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component{
constructor(){                                          //intialize states for app component 
    super();

    this.addFish = this.addFish.bind(this);              // binding the fishes state to app state for using this inside addfish function
    this.updateFish = this.updateFish.bind(this);     
    this.removeFish = this.removeFish.bind(this);   
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);
    this.state={                                         //intialize states for app component 
        fishes:{},
        order:{}
    };
}
componentWillMount(){
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`,     //syncing state with firebase
    {
        context : this,
        state : `fishes`
    }); //rebase syncing

    //check if there any order in local storage

     const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

     if(localStorageRef)
     {
         this.setState({
             order : JSON.parse(localStorageRef)
        }) 
     }
}

componentWillUnmount(){
    base.removeBinding(this.ref);       //stop syncing with firebase and remove component from dom
}

componentWillUpdate(nextProps, nextState){

    console.log(`Something changed`);
    localStorage.setItem(`order-${this.props.params.storeId}`,JSON.stringify(nextState.order));  //next state returns state as object so you have to parse it to json
}
addFish(fish){
    //update our state
    const fishes = {...this.state.fishes}  //spread(...) all the props from object to this object so it is object of objects  
    // add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;   //to add id using timesstap to each fish being saved
    //set state
    this.setState({fishes});     //setting the fishes to state
}
updateFish(key,updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
}

removeFish(key){
    const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({fishes});
}
loadSamples(){
    this.setState({fishes:sampleFishes});
}

addToOrder(key){
    //take a copy of our store
    const order = {...this.state.order};
    //update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1 ;
    //update our store
    this.setState({order})
}
removeFromOrder(key){
    const order = { ...this.state.order};
    delete order[key];
    this.setState({order});
}
render(){
    return(
        <div className="catch-of-the-day">
           <div className="menu">
            <Header tagline="Fresh Seafood Market"/>
            <ul className="list-of-fishes">
                 {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>) }            {/*object.key is js function returns arry of (allkeys/first property value) and map here applies each key in the array to the fishes in state --key=key is to use unique key to get each element--details is to select details for each fish by key*/}
            
            </ul>
            </div>
            <Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} removeFromOrder={this.removeFromOrder}/> {/* passing down all params to order */}
            <Inventory addFish={this.addFish} loadSamples={this.loadSamples} fishes={this.state.fishes} updateFish={this.updateFish} removeFish={this.removeFish}/>
        </div>
    )
}
}

App.propTypes = {
    params: React.PropTypes.object.isRequired
}

export default App;