import React from 'react';
import './Grid.css';
const GridView = (props)=>{

    return (<section className="main-sec" id="firstpage">
    <header><h1>Water flow Simulator</h1></header>
    <h3>Grid Creation</h3>
    {inputElement("Number of rows","rows",props.inputValues.rows, props.onInputchangeHandler)}
    {inputElement("Number of columns","columns",props.inputValues.columns, props.onInputchangeHandler)}
    {inputElement("Number of Obstruction","obs",props.inputValues.obs, props.onInputchangeHandler)}
    <button type="submit" id="tonext" className="btn" onClick={props.onClickHandler}>Next</button>
    </section>);

}

const inputElement = (title, id, initialValue,callback)=>{
    return(<div>
    <div className="input-label">
    <label htmlFor={id}>{title}</label></div>
    <input type="range" id={id} min="1" max="10" value={initialValue} onChange={callback}/> 
   </div>
    );
}

export default GridView;