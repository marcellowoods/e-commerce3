import Navbar from './components/partials/Navbar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <div>
            <Router>
                <Navbar />
            </Router>
        </div>
    );
}

export default App;
