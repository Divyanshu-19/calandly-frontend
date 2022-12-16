import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./features/main/Main";

const Confirmation = React.lazy(() =>
  import("./features/confirmation/Confirmation")
);

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/:time"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Confirmation />
              </Suspense>
            }
          />
          <Route path="*" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
