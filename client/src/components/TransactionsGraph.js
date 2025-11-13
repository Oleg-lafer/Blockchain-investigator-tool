//GraphComponent.js
import React from "react";
import { Graph } from "react-d3-graph";
import styled from "styled-components";

const GraphWrapper = styled.div`
  width: 70%;
  height: 60vh;
  background-color: #121212;
  border: 2px solid #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  /* Node glow animation */
  .node circle:hover {
    stroke: #00D1FF;
    stroke-width: 3px;
    transition: stroke 0.3s ease;
  }
`;

function GraphComponent({ data, onClickNode }) {
  const config = {
    directed: true,
    node: {
      size: 300,
      color: "#EAEAEA",
      highlightStrokeColor: "#FFD700",
      fontColor: "#EAEAEA",
      highlightFontWeight: "bold",
    },
    link: {
      renderLabel: true,
      labelProperty: "label",
      color: "#00D1FF",
      highlightColor: "#00D1FF",
    },
    height: 500,
    width: 800,
    d3: {
      alphaTarget: 0.05,
      gravity: -300,
    },
    staticGraph: false,
  };

  if (!data || !data.nodes || data.nodes.length === 0) {
    return <p style={{ color: "#61DAFB" }}>Loading graph...</p>;
  }

  return (
    <GraphWrapper>
      <Graph
        id="graph-id"
        data={data}
        config={config}
        onClickNode={onClickNode}
      />
    </GraphWrapper>
  );
}

export default GraphComponent;
