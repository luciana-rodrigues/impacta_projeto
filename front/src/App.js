// import "./App.css";

import React, { useState } from "react";

import { New } from './client'
import { Toaster } from './toaster'

function App() {
  const [toast, setToast] = useState(false)
  
  return (
    <div>
      { toast && <Toaster text={toast.text} color={toast.color} onClose={() => setToast(false)} /> }
      <div style={{ padding: '20px' }}>
        <New onSuccess={response => setToast(response)} /> 
      </div>
    </div>
  );
}

export default App;
