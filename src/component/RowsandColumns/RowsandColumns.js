import React from 'react';

const RowsandColumns = (props)=>{
    let trArray = [];
    for(let i=0;i<Number(props.rows);i++){
        let td = [];
        for(let j=0;j<props.columns;j++){
            td.push(<td className="cell" onDrop={props.ondrop} onDragOver={props.onDragOver} key={j}></td>)
        }
        trArray.push(<tr className="row" key={i}>{td}</tr>)
    }
    trArray.push(endPoint(props.columns,props.rows));
    return(
       <React.Fragment>
        {
         trArray
        }      
       </React.Fragment>);
}

const endPoint = (columns,rows)=>{
    const tdArray = [];
    for(let i=0;i<columns;i++){
        tdArray.push(<td className="cell" key={i}></td>);
    } 
return (<tr id="end-point" className="hide" key={rows}>{tdArray}</tr>);
}

const StarPoint = (props) =>{
    let tdArray = [];
    for(let i=0;i<props.columns;i++){
        tdArray.push(<td className="start-cell" onClick={props.onclick} key={i}></td>);
    } 
    return(
        <React.Fragment>
         {
          tdArray
         }      
        </React.Fragment>
        );
}

export {RowsandColumns, StarPoint} ;