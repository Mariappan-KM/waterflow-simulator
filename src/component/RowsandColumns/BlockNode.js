import React from 'react';


const BlockNode = (props)=>{
    const obs = [];
    for(let i=0;i<props.blocks;i++){
        obs.push(<div className="block-container" onDragOver={props.onDragOver} onDragStart={props.onDragStart} key={i}><div className="block" draggable="true"></div></div>);
    }
    return(
        <React.Fragment>
            {obs}
        </React.Fragment>
    );
}

export default BlockNode;


