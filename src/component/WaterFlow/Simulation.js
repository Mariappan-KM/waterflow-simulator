const Simulator = function(rows=1,columns=1,obs=1){
    this.rows = Number(rows);
    this.columns = Number(columns);
    this.obs = obs;
    this.r = 0;
    this.c = 0;
    this.startPoint = 0;
    this.visitedPoint = [];
    this.rightFlowList = [];
    this.rightFlag = false;
    this.nodes = this._buildSimulator();
       
};
/**
 *  Creating object for each cells with some property
 * {isBlocked} - For check the whether cell is blocked (By default is false)
 * {isVisited} - Check node already visited and to avoid looping (By default is false) 
 * @returns nodes object
 */
Simulator.prototype._buildSimulator = function(){
    const nodes = new Array(Number(this.rows));
    for( let i=0;i<this.rows+2;i++ ) {
        nodes[i] = new Array(Number(this.columns));
        for(let j=0;j<this.columns;j++) {
            nodes[i][j] = {"isblocked": false,"isVisited":false};    
        }
    }
    return nodes;
};
/**
 * {StartPoint} - To start flow
 * attach listener for starting row
 */

/**displaying flow of the water with use of VisitedPoint */
Simulator.prototype.showFlow = function(){
    const moveEle = this.visitedPoint;
    const trList = document.querySelector(`#flowTable`).firstChild.childNodes;
    for( let i=0;i<moveEle.length;i++ ){
        trList[moveEle[i][0]].childNodes[moveEle[i][1]].classList.add('path');
    }
    document.getElementById('simulate').classList.add("hide");
    document.getElementById('reset').classList.remove("hide");
    document.querySelector('#end-point').classList.remove('hide');
    const listOfTr = document.querySelectorAll('#end-point>.cell');
    for(let i=0;i<listOfTr.length; i++){
        listOfTr[i].classList.remove('hide');
        listOfTr[i].classList.add("white-backgroud");
    }
    const startOfTr = document.querySelectorAll('#startPoint>.start-cell');
    for(let i=0;i<startOfTr.length; i++){
        startOfTr[i].classList.add("top-white-backgroud");
    }
}
/**
 * @param {Array} graphPoint - add flow nodes to display
 * 
 * @returns 
 */
Simulator.prototype.findpath = function(){
    this.nextrow = this.r+1; 
    const graphPoint = [this.r,this.c];  
    this.visitedPoint.push(graphPoint);
        if(this.rows+2<=this.nextrow){ 
            this.checkFlow(); 
            return false;
        }   
        if(!this.isFlowable()){  
            /**check the block in next node */   
            this.nodes[this.r][this.c].isVisited = true;
            this.r = this.r+1;
            this.findpath();        
        }else{
            if(!this.isNodeVisited()){
                this.checkRightFlow = true;
                this.rightFlowList.push(graphPoint);
                this.isLeftFlowable();
            }else{
                this.isRightFlowable();
            }
            
        }  
}
Simulator.prototype.isNodeVisited = function(){
    return this.nodes[this.r][this.c].isVisited;
}
/**Check the adjecent leftside node is is blocked or visited */
Simulator.prototype.isLeftFlowable = function(){
   if(this.c>0){
    this.nodes[this.r][this.c].isVisited = true;  
    const movetoLeft = this.c-1;   
    this.c = movetoLeft;
    if(!this.nodes[this.r][this.c].isblocked){
        this.findpath()
    }else{
        this.checkFlow();  
    }       
    }else{
        this.checkFlow();
    }
}
/**Check the adjecent rightside node is is blocked or visited */
Simulator.prototype.isRightFlowable = function(){
    if(this.columns>this.c){
        const moveColumn = this.c+1;
        this.c = moveColumn;  
        if(typeof this.nodes[this.r][this.c] != "undefined"){
            if(!this.nodes[this.r][this.c].isblocked){
                this.findpath();
            }else{
                this.checkFlow();
            }      
        }else{
            this.showFlow();
        }
     }else{
         this.showFlow();
     }
 }
Simulator.prototype.isFlowable = function(){
    const nextrow = this.r+1;
    return this.nodes[nextrow][this.c].isblocked;
}
Simulator.prototype.checkFlow = function(){
    if(this.rightFlowList.length){
        this.selectRightSide();
     }else{
         this.showFlow();
     }  
}
Simulator.prototype.selectRightSide = function(){
    const firstRight = this.rightFlowList.splice(0,1);
    this.r = firstRight[0][0];
    this.c = firstRight[0][1];
    this.nextrow = this.r;
    this.isRightFlowable();
}
Simulator.prototype.reset = function(){
    document.querySelector('#startPoint').classList.add('hide');
    document.querySelector('#end-point').classList.add('hide');    
    function removeClass(name){
        const elements = document.querySelectorAll(`.${name}`);
        for(let i=0;i<elements.length;i++){
            const ele = elements[i];
            ele.classList.remove(name);
        }
        
    }
    function resetAttribute(element,name){
        const elements = document.querySelectorAll(element);
        for(let i=0;i<elements.length;i++){
            const ele = elements[i];
            ele.setAttribute("class",name);
        }
        
    }
    resetAttribute('#startPoint>.start-cell','start-cell');
    resetAttribute('#end-point>.cell','cell');
    removeClass('path');
    removeClass('blocked');
    removeClass('moved');
    document.querySelector('#reset').classList.add('hide');
    document.querySelector('#simulate').classList.remove('hide');

}
// const startPointClick = function(){
//     Simulator.startPoint= this.cellIndex;
//     grid.r = 0;
//     grid.c = this.cellIndex;
//     document.querySelector('#start-point').classList.add('hide');
//     document.querySelector('#start-point').classList.add('hide');
//     const listOfTr = document.querySelectorAll('td.start-cell');
//     for(let i=0;i<listOfTr.length; i++){
//         listOfTr[i].classList.remove('start-cell');
//         listOfTr[i].classList.add("top-white-backgroud");
//     }
//     grid.findpath();
    
// }

// Simulator.prototype.addStartPoint = function(){
//     // startPoint(this.columns);
//     document.querySelector('#start-point').classList.remove('hide');
//     attachListener('.start-cell',startPointClick,'click');
// }

export default Simulator;