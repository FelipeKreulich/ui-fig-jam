import ReactFlow, { Background, Controls, ConnectionMode, useEdgesState, useNodesState, addEdge, Connection, BackgroundVariant } from 'reactflow'
import * as Toolbar from '@radix-ui/react-toolbar'
import 'reactflow/dist/style.css'

import { Square } from './components/nodes/Square'
import { Circle } from './components/nodes/Circle'
import { useCallback } from 'react'
import { DefaultEdge } from './components/edges/DefaultEdge'

const NODE_TYPES = {
  square: Square,
  circle: Circle,
}

const EDGE_TYPES = {
  default: DefaultEdge,
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: {
      x: 200,
      y: 200
    },
    data: {},
  },
  {
    id: crypto.randomUUID(),
    type: 'circle',
    position: {
      x: 600,
      y: 200
    },
    data: {},
  },
]

function App() {

  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [setEdges])

  function addSquareNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'square',
        position: {
          x: 200,
          y: 200
        },
        data: {},
      },
    ])
  }

  function addCircleNode() {
    setNodes(nodes => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: 'circle',
        position: {
          x: 200,
          y: 200
        },
        data: {},
      }
    ])
  }

  return (
    <div className='w-screen h-screen'>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default',
        }}
      >
        <Background 
          gap={12}
          size={2}
          color='#ccc'
          variant={BackgroundVariant.Cross}
        />
        <Controls />
      </ReactFlow>
      <Toolbar.Root className='fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border-zinc-300 px-8 h-20 w-96 overflow-hidden'>
        <Toolbar.Button 
          onClick={addSquareNode}
          className='w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:-translate-y-4' />
          <Toolbar.Button 
          onClick={addCircleNode}
          className='w-32 h-32 bg-violet-500 mt-6 ml-4 rounded-full transition-transform hover:-translate-y-4' />
        </Toolbar.Root>
    </div>
  )
}

export default App
