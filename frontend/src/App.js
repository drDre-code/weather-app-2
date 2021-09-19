import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import InfoScreen from "./Screens/InfoScreen";
import logo from './cloud-sun-rain-solid.svg';


function App() {

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header>
          <div className="title">
            <div>
              Weather App
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          </div>
        </header>
        <main>
          <div>
            <Route path="/info" component={InfoScreen} />
            <Route path='/' component={HomeScreen} exact />

          </div>
        </main>
        <footer><i className="fa fa-copyright"></i>All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
