import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import CreateBreed from './components/CreateBreed/CreateBreed';
import BreedDetail from './components/BreedDetail/BreedDetail';
import About from './components/About/About';


function App() {
  return (
    /* al usar switch y poner una ruta q no existe nos toma la ultima ruta en la q estuvimos */
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/create' component={CreateBreed} />
          <Route path='/detail/:id' component={BreedDetail} />
          <Route exact path='/about' component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
