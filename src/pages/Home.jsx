import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

import { Background, Controls, BackgroundVariant } from 'reactflow';

function Home() {
  return (
    <div className="w-[100%] h-[100vh]">
      <ReactFlow>
        <Background variant={BackgroundVariant.Cross} />
        <Controls/>
      </ReactFlow>
    </div>
  )
}

export default Home