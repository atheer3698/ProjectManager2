import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@reach/router';
import AllRestautants from './Components/AllRestautants';
import NewRestaurant from './Components/NewRestaurant';


function App() {
  return (
    <div className="container">
      <h1><span className="text-info">Project</span>Maneger</h1>
      <Router>
        <AllRestautants path="/" />
        <NewRestaurant path="/new" />
      </Router>
    </div>
  );
}

export default App;
