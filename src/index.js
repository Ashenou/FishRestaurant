// let's go!
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter,Match,Miss} from 'react-router';
                                                                                            //Index page which you call the main component in and routing for page
import './css/style.css';
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root =()=>{
return(
    <BrowserRouter>
    <div>
            <Match exactly pattern="/" component={StorePicker}/>
            <Match pattern="/store/:storeId" component={App}/>
            <Miss component={NotFound}/>
    </div>
        </BrowserRouter>
)
}
render(<Root/>,document.getElementById(`main`));      //will render stateless root component which has the routes