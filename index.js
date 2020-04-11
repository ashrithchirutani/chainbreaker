import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import './cssfile.css';

/*
 * A simple React component
 */
import Tree from 'react-d3-tree';


 
const myTreeData = [
  {
    name: 'Top Level',
    children: [
      {
        name: 'Level 2: A',
        children: [
      {
        name: 'Level 2: A'
      }]},
      {
        name: 'Level 2: B',
        children: [
      ]
      },
    ],
  },
];

const remainingNames = new Set(
  [
    "Vedha",
    "Amit", 
    "Akash",
    "Ashrith",
    "Lakshminarayanan",
    "Piyush",
    "Pranav",
    "Ritesh",
    "Saurabh Anand",
    "Shafeeq",
    "Upendra",
    "Vijith",
    "Abhishek Sahu",
    "Abhishek Verma",
    "Gnanadeep",
    "Himanshu",
    "Nikunj",
    "Harshini",
    "Sumant",
    "Vaishal",
    "Disha",
    "Gautam",
    "Ranganathan",
    "Shambhavi",
    "Shubham",
    "Sindhura",
    "Surendhar",
    "Tushar",
    "Yash",
    "Yogesh","Anjali", "Ayush", "Chirag", "Hemanth", "GCS", "Naveen V",
    "Navneet", "Nupur", "Saksham", "Sanchit"

  ]
);

const map = {
  "Vedha" : ["Farhad", "Disha", "Vaishal", "Pranav"],
  "Vaishal": ["Shubham", "Ayush", "Himanshu"],
  "Pranav":["Prashant", "Ritesh"],
  "Shubham": ["Tushar", "Yogesh", "Piyush"],
  "Piyush": ["Amit", "Abhishek Sahu", "Disha"],
  "Tushar":["Gautam", "Yash", "Anjali"],
  "Farhad":["Surendhar", "Bhavik", "+91 90661 48817"],
  "Prashant":[],
  "Ritesh":["Harshini", "Gnanadeep", "Lakshminarayanan"],
  "Abhishek Sahu":["Himanshu", "Nikunj", "Sumant"],
  "Gnanadeep":["Naveen V", "Hemanth", "Ashrith"],
  "Harshini":["Abhishek Verma", "Saurabh Khoria", "Disha"],
  "Ashrith":["Saurabh Anand", "Vijith", "Shafeeq"]
}
var root = "Vedha";
function removeDuplicates(heirarchyMap){
  let originalValues = new Set();
  for(let key in heirarchyMap) {
    remainingNames.delete(key);
    let children = heirarchyMap[key];
    let nonDuplicateChildren = [];
    for(let childIndex in children){
      console.log()
      if(!originalValues.has(children[childIndex])){
          nonDuplicateChildren.push(children[childIndex]);
          originalValues.add(children[childIndex])
      }
      remainingNames.delete(children[childIndex]);
    }
    heirarchyMap[key] = nonDuplicateChildren;
  }
}


removeDuplicates(map);


function buildTreeNode(nodeName){
  return {
    name:nodeName
  };
}
var dynamicTreeData = [
  buildTreeNode(root, map[root])
]

function buildTree(root){
  if(map[root.name] == null){
    root.nodeSvgShape =  	{shape: 'circle', shapeProps: {r: 10, fill:'#FE7C00', strokeWidth: 0.5}}

  }
  else {
  root.nodeSvgShape =  	{shape: 'circle', shapeProps: {r: 10, fill:'#FFFFB3', strokeWidth: 0.5}}
  }

  
   let children = map[root.name]
   root.children = [];
   for(let key in children){
     let child = children[key];
     let childNode = buildTree(buildTreeNode(child));
     root.nodeSvgShape =  	{shape: 'circle', shapeProps: {r: 10, fill:'#00B4AB', strokeWidth: 0.5}};
     root.children.push(childNode);
   }
   return root;
}

buildTree(dynamicTreeData[0])
 
class MyComponent extends React.Component {
  state = {}
  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: 40
      }
    });
  }
  
  render() {
    
let textStyle = {};
    return (
      
      
      <div id="treeWrapper" style={{width: '100%', height: '50em',}} ref={tc => (this.treeContainer = tc)}>
    
        <Tree data={dynamicTreeData} orientation="vertical" 
translate={this.state.translate} 
/> 
      </div>
     
    );
  }
}

class UnNominated extends React.Component {
  render() {
    let array = [];
    console.log(remainingNames);
    
    remainingNames.forEach(x => array.push((<p class="floater">{x}</p>)));
    
    if(array.length) {
    return (
      
      <div><p class="random">In case you are looking for folks who are not nominated yet, here you go</p><div>
      {array}</div></div>
      
    );
    }
    return (<div><p>Yayy! We successfully covered everyone</p></div>);
  }
}


/*
 * Render the above component into the div#app
 */

render(<UnNominated />, document.getElementById('unnominated'));
render(<MyComponent />, document.getElementById('root'));
