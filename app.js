var line, endCoords, divDimension_sr, divDimension_des, x2, y2, option = false, lineDrawn = false;
var elem_sr = document.getElementById('left_D3line1');
divDimension_sr = elem_sr.getBoundingClientRect();
var elem_des = document.getElementById('right_D3line1');
divDimension_des = elem_des.getBoundingClientRect();

var vis = d3.select("body").append("svg")
    .attr("width", 600)
    .attr("height", 400)
    .on("mousedown", mousedown)
    .on("mouseup", mouseup);

function mousedown() {

    var m = d3.mouse(this);
    console.log(m);
    // if (m[0] < 26 && m[1] < 31) {
    if ((m[1] < divDimension_sr.top + divDimension_sr.height && m[1] > divDimension_sr.top) &&
        (m[0] < divDimension_sr.left + divDimension_sr.width && m[0] > divDimension_sr.left) && !lineDrawn) {
        option = true;
        line = vis.append("line")
            .attr("x1", m[0])
            .attr("y1", m[1])
            .attr("x2", m[0])
            .attr("y2", m[1]);
        vis.on("mousemove", mousemove);
    }
    else {
        console.log('Out of range:', m[0], m[1]);
    }

}

function mousemove() {
    var m = d3.mouse(this);
    line.attr("x2", m[0])
        .attr("y2", m[1]);
}

function mouseup() {
    vis.on("mousemove", null);
    if (option) {
        console.log('Line!!!', line._groups[0][0].attributes);
        endCoords = line._groups[0][0].attributes;
        x2 = Number(endCoords[2].nodeValue);
        y2 = Number(endCoords[3].nodeValue);
        console.log('X2,Y2:', x2, y2);
        // if (Number(endCoords[2].nodeValue) < 576 && Number(endCoords[3].nodeValue) < 380) {
        if ((x2 > divDimension_des.left + divDimension_des.width || x2 < divDimension_des.left) ||
            y2 > divDimension_des.top + divDimension_des.height || y2 < divDimension_des.top) {
            line.remove();
        }
        else {
            console.log(endCoords[2].nodeValue, endCoords[3].nodeValue);
            line.style('stroke', 'green')
            lineDrawn = true;
        }
    }
}
