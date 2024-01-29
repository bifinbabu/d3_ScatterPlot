import React, { useState, useEffect, useRef } from "react";
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
    [45, 60],
    [75, 85],
    [30, 120],
    [55, 45],
    [25, 175],
    [65, 55],
    [40, 95],
    [85, 65],
    [15, 130],
    [50, 70],
  ]);

  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const drawChart = () => {
      if (svgRef.current) {
        const containerWidth = svgRef.current.parentElement?.clientWidth;
        if (containerWidth) {
          const containerHeight = Math.min(500, containerWidth * 0.75);

          const margin = { top: 30, right: 30, bottom: 70, left: 80 };
          const width = containerWidth - margin.left - margin.right;
          const height = containerHeight - margin.top - margin.bottom;

          const svg = d3
            .select(svgRef.current)
            .attr("viewBox", `0 0 ${containerWidth} ${containerHeight}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("width", containerWidth)
            .attr("height", containerHeight);

          svg.selectAll("*").remove();

          const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

          const xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);
          const yScale = d3.scaleLinear().domain([0, 200]).range([height, 0]);

          const xAxis = d3.axisBottom(xScale).ticks(data.length / 2);
          const yAxis = d3.axisLeft(yScale).ticks(5);

          // Set up axis labelling
          svg
            .append("text")
            .attr("x", containerWidth / 1.8)
            .attr("y", height + 100)
            .style("fill", "red")
            .text("X");
          svg
            .append("text")
            .attr("y", containerHeight / 2.2)
            .attr("x", 30)
            .style("fill", "red")
            .text("Y");

          g.append("g")
            .call(xAxis)
            .attr("transform", `translate(0, ${height})`);
          g.append("g").call(yAxis);

          g.selectAll(".point")
            .data(data)
            .enter()
            .append("circle")
            .classed("point", true)
            .attr("cx", (d) => xScale(d[0]))
            .attr("cy", (d) => yScale(d[1]))
            .attr("r", 5)
            .style("fill", "green");
        }
      }
    };

    drawChart();

    const handleResize = () => {
      drawChart();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
