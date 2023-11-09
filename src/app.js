import { Route, Routes } from "react-router-dom";

import Solve  from "./components/Solve";
import Home from "./components/Home";
// import Solve from './components/1';


function App() {
return (
  <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Solve" element={<Solve />} />
      </Routes>
    </div>
);
}

export default App;
