
import React, { useEffect, useState, useReducer} from "react";
import {RowsandColumns,StarPoint} from '../RowsandColumns/RowsandColumns';
import BlockNode from "../RowsandColumns/BlockNode";
import Simulator from "../WaterFlow/Simulation";
import '../GirdView/Grid.css';

let simulator = "";
const Waterflow = (props)=>{
    const [enablebtn,setEnablebtn] = useState(true);
    const [reset,setreset] = useState(0);
    const [ishide,setIsHide] = useState({"display":"hide"});
    const [inputValues,setInputValues] = useState({
        "rows": props.inputValues.rows,
        "columns" : props.inputValues.columns,
        "obs" : props.inputValues.obs
    })
    
    useEffect(function(){   
        simulator = new Simulator(props.inputValues.rows,props.inputValues.columns,props.inputValues.obs);
    },[inputValues]);

    function dragStartHandler(evt){
        simulator.dragged = evt.target;
    } 
    function dragOverHandler(evt){
        evt.stopPropagation();
        evt.preventDefault();
    }
    function startSimulation(){
        setIsHide({"display":""});
    }
    function setStartPoint(evt){
        const selectTD = evt.target;
        simulator.r = 0;
        simulator.startPoint = selectTD.cellIndex;
        simulator.c = selectTD.cellIndex;       
        simulator.findpath();
    }
    function dropEventHandler(evt){
        simulator.dragged.classList.add('moved');
        evt.target.classList.add('blocked');
        const rowIndex = evt.target.parentElement.rowIndex+1;
        const cellIndex = evt.target.cellIndex;
        simulator.nodes[rowIndex][cellIndex].isblocked = true;
        setEnablebtn(document.querySelectorAll('.moved').length != simulator.obs);
    }
    function resetHandler(){
        simulator.reset();
        setInputValues({...inputValues});
        setEnablebtn(true);
        setIsHide({"display":"hide"});
    }
    
    return(
        <section id="simulator" className={reset} aria-label="Waterflow simulator Table">
        <header><h1>Workflow Simulator</h1></header>
        <p>Drag the Obs and place it inside the grid</p>
        <div>
        <div className="main">
        <table id="flowTable" className="">
        <tbody>
            
            <tr id="startPoint" className={ishide.display}><StarPoint columns={inputValues.columns} onclick={setStartPoint}/></tr>
            <RowsandColumns ondrop={dropEventHandler} rows={inputValues.rows} onDragOver={dragOverHandler} columns={inputValues.columns}/></tbody>
        </table>
        <div id="ObsTable" className="blocks"><BlockNode onDragStart={dragStartHandler}  blocks={inputValues.obs}/></div>
        </div>
        <div className="button-row">
        <button type="button" id="simulate" className="btn" disabled={enablebtn} onClick={startSimulation}>Start Simulation</button>
        <button type="button" id="back" className="btn" onClick={props.backHandler}>Back</button>
        <button type="button" id="reset" className="btn hide" onClick={resetHandler}>Reset</button>
        </div>
        </div>
    </section>
    );
};



export default Waterflow;