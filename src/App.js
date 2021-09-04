
import React, { useState } from 'react';
import './App.css';


import GridView from './component/GirdView/Grid';
import WaterFlowView from './component/WaterFlow/WaterFlow';
function App() {
  const [stage , setstage] = useState(0);
  const [inputvalues,setInpuValues] = useState({
    "rows" : "5",
    "columns" : "5",
    "obs" : "3",
    "reset" : false,
  });
  
  function handlerNextClick(){
    setstage(1);
  }
  function inputChangeHandler(evt){
    const {id,value} = evt.target;
    setInpuValues({
        ...inputvalues,
        [id] : value
    });
    
  }
  function backHandler(){
    setstage(0);
  }
  return (
    <React.Fragment>
      {stage === 0 && <GridView onInputchangeHandler={inputChangeHandler} inputValues={inputvalues} onClickHandler={handlerNextClick} />}
      {stage === 1 && <WaterFlowView backHandler={backHandler} inputValues={inputvalues} />}     
    </React.Fragment>
  );
}

export default App;
