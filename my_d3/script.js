const svg = d3.select("svg");

d3.csv("https://raw.githubusercontent.com/lpenavarela1/HousingData/refs/heads/main/OwnedHousingbyCity_GA_Final.csv")
.then(data => {

    data.forEach(d => {
        d.value1 = +d["2020-01-31"];
        d.value2 = +d["2020-06-30"];
    });

    const scale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value1)])
        .range([10, 80]);

    svg.selectAll("circle")
        .data(data.slice(0, 10))
        .enter()
        .append("circle")
        .attr("cx", (d, i) => i * 100 + 50)
        .attr("cy", 250)
        .attr("r", d => scale(d.value1))
        .attr("fill", "blue")

        .transition()
        .duration(2000)
        .attr("r", d => scale(d.value2))
        .attr("cy", d => 500 - scale(d.value2))
        .attr("fill", "orange");

    svg.selectAll("text")
      .data(data.slice(0, 10))
      .enter()
      .append("text")
      .attr("x", (d, i) => i * 100 + 30)
      .attr("y", 480)
      .text(d => d.RegionName)
      .attr("font-size", "10px")

      .transition()
      .duration(2000)
      .attr("y", 450)
      .attr("fill", "blue");
  
    svg.selectAll("rect")
        .data(data.slice(0, 10))
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 100 + 30)
        .attr("y", 400)
        .attr("width", 20)
        .attr("height", d => scale(d.value1))
        .attr("fill", "purple")

        .transition()
        .duration(2000)
        .attr("height", d => scale(d.value2))
        .attr("fill", "pink");
  
  svg.selectAll("circle")
  .on("mouseover", function () {
    d3.select(this).attr("fill", "red");
  })
  .on("mouseout", function () {
    d3.select(this).attr("fill", "orange");
  });
});
