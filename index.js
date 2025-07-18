const express = require("express");
const cors = require("cors");
const graphlib = require("graphlib");
const rateLimit = require('express-rate-limit')
const { Graph } = graphlib;

const app = express();
const port = process.env.PORT || 8000;

const allowedOrigins = [
  "https://pipeline-c5c0d.web.app",
  "https://pipeline-c5c0d.firebaseapp.com",
  "https://flow.sajidahamed.com",
];

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
// Apply the rate limiting middleware to all requests.

app.use(limiter);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: false, // or true only if needed
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ Ping: "Pong" });
});

app.post("/pipelines/parse", (req, res) => {
  const { nodes, edges } = req.body;

  const g = new Graph({ directed: true });

  nodes.forEach((node) => g.setNode(node.id, node));
  edges.forEach((edge) => g.setEdge(edge.source, edge.target, edge));

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
