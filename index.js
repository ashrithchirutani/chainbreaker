import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

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
const map = {
  "Vedha" : ["Farhad", "Disha", "Vaishal", "Pranav"],
  "Vaishal": ["Shubham", "Ayush", "Himanshu"],
  "Pranav":["Prashant", "Ritesh"],
  "Shubham": ["Tushar", "Yogesh", "Piyush"],
  "Piyush": ["Amit", "Abhishek Sahu", "Disha"],
  "Tushar":["Gautam", "Yash", "Anjali"],
  "Farhad":["Surendhar", "Bhavik", "Unknown"],
  "Prashant":[],
  "Ritesh":["Harshini", "Gnanadeep", "Narayana"],
  "Abhishek Sahu":["Himanshu", "Nikunj", "Suman"],
  "Gnanadeep":["Naveen V", "Hemanth", "Ashrith"],
  "Harshini":["Abhishek Verma", "Saurabh Khoria", "Disha"]
}
var root = "Vedha";
function removeDuplicates(heirarchyMap){
  let originalValues = new Set();
  for(let key in heirarchyMap) {
    let children = heirarchyMap[key];
    let nonDuplicateChildren = [];
    for(let childIndex in children){
      if(!originalValues.has(children[childIndex])){
          nonDuplicateChildren.push(children[childIndex]);
      }
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
   let children = map[root.name]
   root.children = [];
   for(let key in children){
     let child = children[key];
     let childNode = buildTree(buildTreeNode(child));
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
    let nodeStyle = {
  stroke: 'blue',
  strokeWidth: 3,
};
let leafNodeStyle = {
  stroke: 'blue',
  strokeWidth: 3,
};
    return (
      <div id="treeWrapper" style={{width: '100%', height: '50em',}} ref={tc => (this.treeContainer = tc)}>
    
        <Tree data={dynamicTreeData} orientation="vertical" style={{
  links: nodeStyle,
  nodes: {
    node: {
      circle: nodeStyle,
      name: nodeStyle,
      attributes: nodeStyle,
    },
    leafNode: {
      circle: leafNodeStyle,
      name: leafNodeStyle,
      attributes: leafNodeStyle,
    },
  }}
}
translate={this.state.translate} 
/> 
      </div>
     
    );
  }
}

/*
 * Render the above component into the div#app
 */
render(<MyComponent />, document.getElementById('root'));
