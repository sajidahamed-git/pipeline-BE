const express = require('express');
const cors = require('cors');
const graphlib = require('graphlib')
const {Graph} = graphlib

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
  origin: [
    //'http://localhost:3000',
     //'http://127.0.0.1:3000'
     '*'
    ],
  //credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ Ping: 'Pong' });
});

app.post('/pipelines/parse', (req, res) => {
  const { nodes, edges } = req.body;

  const g = new Graph({ directed: true });

  nodes.forEach(node => g.setNode(node.id, node));
  edges.forEach(edge => g.setEdge(edge.source, edge.target, edge));

  const isDAG = graphlib.alg.isAcyclic(g); // graphlib.alg is used here

  res.json({
    num_nodes: nodes.length,
    num_edges: edges.length,
    is_dag: isDAG,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
