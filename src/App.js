import React from "react";
import Home from './pages/Home.jsx'
import './App.css';
import { ReactFlowProvider } from "reactflow";

function App() {
  return (
    <div className="">
      <ReactFlowProvider>
        <Home />
       
      </ReactFlowProvider>
    </div>
  );
}

export default App;
