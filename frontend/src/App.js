import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Property from "./components/Property";
import dataContext from "./context/dataContext";
function App() {
  const [datastate, setdatastate] = useState("");
  const updateData = (newData) => {
    setdatastate(newData);
  };
  return (
    <div className="App">
      <dataContext.Provider value={{datastate,updateData}}>
        <Navbar/>
        <Header/>
        <Property/>
      </dataContext.Provider>
        
      
      
    </div>
  );
}

export default App;
