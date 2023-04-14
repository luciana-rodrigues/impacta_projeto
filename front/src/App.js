// import "./App.css";

import React, { useState } from "react";
import { New } from './client'
import { Toaster } from './toaster'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListClients from './components/ListClients'
import { Container } from "@mui/material";

function App() {
  const [toast, setToast] = useState(false)

  return (
    <Container>
      {toast && <Toaster text={toast.text} color={toast.color} onClose={() => setToast(false)} />}
      <div style={{ padding: '20px', alignContent: 'center', justifyContent: "center", display: "flex" }}>
        
      </div>
      <BrowserRouter>
        <Routes>
            <Route path="add" element={<New onSuccess={response => setToast(response)} />} />
            <Route path="/" element={<ListClients />}>

          </Route>
        </Routes>
      </BrowserRouter>
    </Container>

  );
}

export default App;
