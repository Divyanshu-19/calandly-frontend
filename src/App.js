import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./features/main/Main";
import Confirmation from "./features/confirmation/Confirmation";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:time" element={<Confirmation />} />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
