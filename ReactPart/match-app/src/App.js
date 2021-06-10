
import './App.css';
import {Home} from './components/Home';
import {Matches} from './components/Matches';
import {Player} from './components/Player';
import {Navigation} from './components/Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     
     <h3 className="m-3 d-flex justify-content-center">Matches and Players</h3>
     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/matches' component={Matches}/>
       <Route path='/player' component={Player}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
