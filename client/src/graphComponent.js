//GraphComponent.js

import React from "react";
import { Graph } from "react-d3-graph";

function GraphComponent({ data, onClickNode }) {
  const config = {
    directed: true,
    node: { size: 300, highlightStrokeColor: "blue" },
    link: { renderLabel: true, labelProperty: "label", highlightColor: "lightblue" },
    height: 500,
    width: 800,
  };

  return (
    <Graph
      id="graph-id"
      data={data}
      config={config}
      onClickNode={onClickNode} // כאן אנחנו מחברים את האירוע
    />
  );
}

export default GraphComponent;
