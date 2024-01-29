import { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./App.css";

function App() {
  const [data, setData] = useState([
    [90, 20],
    [20, 100],
    [66, 44],
    [53, 80],
    [24, 182],
    [80, 72],
    [10, 76],
    [33, 150],
    [100, 15],
  ]);

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      // Set up container
      const width = 400;
      const height = 300;
      const svg = d3
        .select(svgRef.current)
        .attr("width", width)
        .attr("height", height)
        .style("overflow", "visible")
        .style("margin-top", "100px");

      // Set up scaling
      const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
      const yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

      // Set up axis
      const xAxis = d3.axisBottom(xScale).ticks(data.length);
      const yAxis = d3.axisLeft(yScale).ticks(10);
      svg.append("g").call(xAxis).attr("transform", `translate(0, ${height})`);
      svg.append("g").call(yAxis);

      // Set up axis labelling
      svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", height + 50)
        .style("fill", "red")
        .text("X");
      svg
        .append("text")
        .attr("y", height / 2)
        .attr("x", -50)
        .style("fill", "red")
        .text("Y");

      // Set up data to scatter plot
      svg
        .selectAll()
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d[0]))
        .attr("cy", (d) => yScale(d[1]))
        .style("fill", "green")
        .attr("r", 2);
    }
  }, [data]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Scatter Plot D3</p>
        <svg ref={svgRef}></svg>
      </header>
    </div>
  );
}

export default App;
