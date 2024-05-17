import ReactFlow, { Position } from 'reactflow';
import 'reactflow/dist/style.css';
import React, {useCallback, useState} from 'react';
import {  Background,
          Controls, 
          BackgroundVariant,
          MarkerType,
          useNodesState,
          useEdgesState,
          addEdge,          
          Panel,
          Handle,
          getConnectedEdges,
         } from 'reactflow';
import CrossEdge from '../components/CrossEdge';
import { FaCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";



const getNodeId = () => `randomnode_${+new Date()}`;

const initialNodes = [
  { id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
  { id: '2', data: { label: 'Node 2' }, position: { x: 200, y: 200 } },
]

const initialEdges = [
  { id: 'e1-2',
    source: '1',
    sourceHandle: 'a',
    target: '2',
    type: 'button',
    markerEnd:{type:MarkerType.Arrow} },
];

const edgeTypes = {
  button: CrossEdge
}

function Home() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [ispopupVisible, setIspopupVisible] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState(null);


  const onConnect = useCallback(
    (params) => {
     
      const newEdge = { ...params, type: 'button' };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const [editValue, setEditValue] = useState(nodes.data)

  //edit function
  const onNodeClick = (e, val) => {
    setEditValue(val.data.label)
    setSelectedNodeId(val.id)
    setIspopupVisible(true)
  }
  //handle Change
  const handleChange=(e)=>{
      e.preventDefault();
    setEditValue( e.target.value);
  }
  //handle Function
  const handleEdit =()=>{
    const res=nodes.map((item)=>{
      if(item.id=== selectedNodeId){
        item.data={
          ...item.data,
          label:editValue
        }
      }
      return item
    })
    setNodes(res)
    setEditValue('')
    setIspopupVisible(false)
  }

     // Handle Delete
  const handleDelete = () => {
    const newNodes = nodes.filter((node) => node.id !== selectedNodeId);
    const connectedEdges = getConnectedEdges([{ id: selectedNodeId }], edges);
    const newEdges = edges.filter((edge) => !connectedEdges.includes(edge));

    setNodes(newNodes);
    setEdges(newEdges);
    setIspopupVisible(false);
  };
  
  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

 
  return (

  <>
  {
    ispopupVisible && (
      <div 
    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-20">
  <div className="bg-white rounded-lg shadow-lg p-7 w-[300px]">
    <div className='flex justify-between items-center'>
    <label className="block text-gray-700 mb-2 text-xl font-semibold">Single Choice</label>
    <div className='flex gap-2'>
      <button><FaCopy /></button>
      <button onClick={handleDelete}><MdDelete color='red'/></button>
      <button onClick={()=> setIspopupVisible(false)}><RxCross2 /></button>
      
    </div>
    </div>
    <div className='h-[1.5px] bg-gray-400 my-2'/>
    <div className='flex gap-4 my-2 justify-end'>
    <button 
      onClick={()=>setIspopupVisible(false)} 
      className=" border-2 rounded-md  text-black py-1 px-3 ">
      Cancle
    </button>
    <button 
      onClick={handleEdit} 
      className=" bg-black text-white py-1 px-4 rounded-md">
      Save
    </button>
    </div>
    <textarea 
      className="border-2 border-gray-600 w-full px-2 py-2 mb-4 rounded-lg" 
      type="text" 
      value={editValue} 
      onChange={handleChange} 
    />
    
  </div>
</div>

  
    )
  }
   
    <div className='w-[100%] h-[100vh] z-0'>
      <ReactFlow
       nodes={nodes}
       edges={edges}
       onNodeClick={(e, val) => onNodeClick(e, val)}
       onNodesChange={onNodesChange}
       onEdgesChange={onEdgesChange}
       onConnect={onConnect}
       edgeTypes={edgeTypes}
       handleDelete={handleDelete}
      >

    

      <Panel position="top-Left">
        <button className='px-4 py-2 bg-blue-950 text-white rounded-md'
        onClick={onAdd}>Add Node</button>
      </Panel>

      <Handle type='target' position={Position.Left}/>
      <Controls/>
      <Background variant={BackgroundVariant.Cross} />
      </ReactFlow>
    </div>

    </>

  )
}

export default Home