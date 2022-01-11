import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Home from './pages/Home'
import Main from './pages/Main'
import Beginner from './pages/Beginner';


function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path='/beginner/:id' component={Beginner} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
