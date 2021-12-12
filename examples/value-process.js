

var emol = [
    'NC(CCC(N)=O)C(O)=O',
    'c1ccccc1',
    'O[C@H]1[C@H](O)[C@H](O[C@]1(O)CO)CO',
    'C=C(C)C=C',
    'CCO',
    'C#N',
    'CCCCC',
    'CC(C)CC',
    'CC(C)(C)C',
    'CC=CC',
    'C=CCC',
    'C/C=C\C',
    'C/C=C/C',
    'C=CC=C',
    'C=C=CC',
    'CC#CC',
    'C#CCC',
    'OCCCC',
    'CC(O)CC',
    'CC(O)(C)C',
    'C(=O)CCC',
    'CC(=O)CC',
    'OC(CCC)=O',
    'O=C(CC)OC',
    'NC(CCC)=O',
    'O=C(CCC)OO',
    'ClC(CCC)=O',
    'O=C(CC)OC(C)=O',
    'C1CCCCC1',
    'C1CCCCC1C2CCCCC2',
    'C12(CCCCC1)CCCCC2',
    'C1C=CCC=C1',
    '[C@H]1=[C@@H][C@@H]=[C@@H][C@@H]=[C@@H][C@@H]=[C@@H]1',
    'c1ccccc1',
    'OCc1ccccc1',
    'c1ccccc1-c2ccccc2',
    'C12=CC=CC=C1C3=C(C=CC=C3)C=C2',
    'C1=CC=CN1',
    'c1occc1',
    'c1sccc1',
    '[CH3+]',
    '[CH3-]',
    '[Na+].[Cl-]',
    '[NH4+].[NH4+].[O-]S(=O)(=O)[S-]',
    'C[13CH](C)C',
    'C[14CH](C)C',
    'C[C@@H](Br)Cl',
    'C[C@H](Br)Cl',
    'O[C@@]([H])(O1)[C@@](O)([H])[C@@]([H])(O)[C@]1([C@@](CO)(O)[H])[H]',
    'NC(C)C(O)=O',
    'NC(CCCNC(N)=N)C(O)=O',
    'NC(CC(N)=O)C(O)=O',
    'NC(CC(O)=O)C(O)=O',
    'NC(CS)C(O)=O',
    'NC(CCC(O)=O)C(O)=O',
    'NC(CCC(N)=O)C(O)=O',
    'NC([H])C(O)=O',
    'NC(CC1=CNC=N1)C(O)=O',
    'NC(C(CC)C)C(O)=O',
    'C((C))O',
    '(N1CCCCC1)',
    'CC(=O)C(Cl)CC(C(C)C)C=C',
    'C2C(=O)C1COCCC1CC2',
    'CC(CC(Cl)CCO)C',
    'CC1C(CC(CC1C)CCO)=O',
    'NC(C(CC)C)C(O)=O',
    'C[C+](C)C',

];
var vmol = {
    "O=C(C)CC":"Butan",
    "C=C(C)C=C":"Isopren",
    "c1ccccc1":"Benzen",
    "NC(CCC(N)=O)C(O)=O":"Glutamin"
};
//
// Global
//
var userInput = document.getElementsByTagName("input")[0].value;
var userExample = 'Ethanol';//'CC(N)CC=O';

//
// Keyboard Callback
//
var keyboardCallback = function(event) {

    //var input = document.getElementsByTagName("input")[0].value;

    // 0-9
    //if (event.keyCode >= 48 && event.keyCode <= 57) { return null; }

    // 'backspace'
    //else if (event.keyCode === 8) { return null; }

    // '-', '=', '.'
    //else if (event.keyCode === 189 || event.keyCode === 187 || event.keyCode === 190) { return null; }

    // non-alphabet
    //else if (event.keyCode < 65 || event.keyCode > 90) { return null; }

    // 'enter'
    if (event.keyCode === 13) {
        var input = document.getElementsByTagName("input")[0].value;
        parseInput(input);
    }

    else { return null; }

};

//
// Input Callback
//
// To assign event

// To trigger the event Listener

function func(){
    const event = new CustomEvent("start", {
        detail: {
          platform : "GeeksforGeeks"
        }
    });
    
    // To trigger the Event
    document.dispatchEvent(event);
}
var parseInput = function(input) {

    if (userInput === input && userInput !== userExample) { return null; }

    document.getElementsByTagName("input")[0].value = input;
    Object.prototype.getKeyByValue = function( value ) {
        for( var prop in this ) {
            if( this.hasOwnProperty( prop ) ) {
                if( this[ prop ] === value )
                    return prop;
            }
        }
    }
    if(!(moldict.hasOwnProperty(input)||emol.includes(input))){
        var pre = input;
        input = moldict.getKeyByValue(input);
        if (input === moldict["Unexpected"]) input = vmol.getKeyByValue(pre);
    }
    var molname = input;
    molname = moldict[molname];
    if (molname === moldict["WIKIPEDIA"]){molname = input;}
    document.getElementById("iupac_name").innerHTML = molname;
    document.getElementById("myFrame1").src = "https://pubchem.ncbi.nlm.nih.gov/#query="+molname;
    //document.getElementById("myFrame2").src = "https://en.wikipedia.org/w/index.php?title="+molname+"&printable=no";
    //document.getElementById("myFrame3").src = "https://vi.wikipedia.org/w/index.php?title="+molname+"&printable=no";
    //localStorage.setItem("myFrame1","https://pubchem.ncbi.nlm.nih.gov/#query="+molname);
    //localStorage.setItem("myFrame2","https://en.wikipedia.org/w/index.php?title="+molname+"&printable=no");
    //localStorage.setItem("myFrame3","https://vi.wikipedia.org/w/index.php?title="+molname+"&printable=no");
    
    if (typeof input !== 'string' || input.length === 0 || input.length > 1000 ) { return null; }
    var molecule = Molecules.load.smiles(input)

    if (typeof molecule === 'object') { update(molecule); }

    userInput = input;
};

//
// molecules.js --> d3.js
//
function convertMolecule(molecule) {

    var atoms = Object.keys(molecule.atoms);
    var bonds = Object.keys(molecule.bonds);

    var nodes = [];
    var links = [];

    for (var i = 0; i < atoms.length; i++) {

        nodes.push({
            id: molecule.atoms[atoms[i]].id,
            name: molecule.atoms[atoms[i]].name,
            protons: molecule.atoms[atoms[i]].protons,
            neutrons: molecule.atoms[atoms[i]].neutrons,
            electrons: molecule.atoms[atoms[i]].electrons,
            bonds: molecule.atoms[atoms[i]].bonds,
            properties: molecule.atoms[atoms[i]].properties
        })
    }

    for (var i = 0; i < bonds.length; i++) {

        links.push({
            id: molecule.bonds[bonds[i]].id,
            name: molecule.bonds[bonds[i]].name,
            value: molecule.bonds[bonds[i]].value,
            source: atoms.indexOf(molecule.bonds[bonds[i]].atoms[0]),
            target: atoms.indexOf(molecule.bonds[bonds[i]].atoms[1]),
            order: molecule.bonds[bonds[i]].order
        })
    }

    return {nodes: nodes, links: links};
}

//
// HTML Elements
//
var topPanel    = document.getElementById("header");
var centerPanel = document.getElementById("plot");
var sidePanel   = document.getElementById("sidebar");
var bottomPanel = document.getElementById("footer");

//
// Display Properties
//
var mainPanelHeight  = centerPanel.offsetHeight;
var mainPanelWidth   = centerPanel.offsetWidth;

var mainPanel = d3.select("#plot")
    .append("div")
    .classed("svg-container-responsive", true)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + mainPanelWidth + " " +  mainPanelHeight + "")
    .classed("svg-content-responsive", true)

var supportPanel = d3.select("#sidebar")
    .append("div")
    .classed("svg-container-responsive", true)
    .append("svg")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + sidebar.offsetWidth + " " +  mainPanelHeight + "")
    .classed("svg-content-responsive", true)

//
// Tooltip
//
var tooltip = d3.select("#plot")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//
// Initialize d3.js
//
var forceProperties = {
    size           : [mainPanelWidth, mainPanelHeight],
    charge         : -1200,
    chargeDistance : 500,
    linkStrength   : 1.5,
    linkDistance   : -40,
    gravity        : 1.3,
    friction       : 0.65,
    alpha          : 2.0

}

var force = d3.layout.force()
    .size(forceProperties.size)
    .charge(forceProperties.charge)
    .chargeDistance(forceProperties.chargeDistance)
    .linkStrength(forceProperties.linkStrength)
    .linkDistance(forceProperties.linkDistance)
    .gravity(forceProperties.gravity)
    .friction(forceProperties.friction)
    .alpha(forceProperties.alpha);

//
// Update d3.js
//
function update(molecule) {

    //
    // Molecule Properties
    //
    var graph = convertMolecule(molecule);
    var nodes = force.nodes(graph.nodes);
    var links = force.links(graph.links);

    d3.selectAll(".node").remove()
    d3.selectAll(".separator").remove()

    //
    // Bond Properties
    //
    var bondMuliplier = 3;

    var piBond = {
        stroke: '#FFFFFF',
        strokeWidth: '2px'
    };

    var aromaticBond = {
        stroke: '#696969',
        strokeWidth: '3px',
        strokeDashArray: ("3,3")
    };

    var bond = mainPanel.selectAll("line.link")
        .data(graph.links, function(d) { return d.source + "-" + d.target; } )
        .enter();

    var singleBond = bond.append("svg:line")
        .filter(function (d) { return d.order == 1 | d.order == 2 | d.order == 3 })
        .attr("class", "link")
        .style("stroke-width", function(d) { return (d.order * bondMuliplier - 1) * (bondMuliplier/2) + "px"; })

    var doubleBond = bond.append("svg:line")
        .filter(function (d) { return d.order == 2 })
        .attr("class", "separator")
        .style("stroke-width", piBond.strokeWidth)
        .style("stroke", piBond.stroke)

    var aromaticBond_1 = bond.append("svg:line")
        .filter(function (d) { return d.order == 1.5 })
        .attr("class", "separator")
        .style("stroke-width", aromaticBond.strokeWidth)
        .style("stroke", aromaticBond.stroke)

    var aromaticBond_2 = bond.append("svg:line")
        .filter(function (d) { return d.order == 1.5 })
        .attr("class", "link")
        .style("stroke-width", aromaticBond.strokeWidth)
        .style("stroke", aromaticBond.stroke)
        .style("stroke-dasharray", aromaticBond.strokeDashArray)

    var tripleBond_1 = bond.append("svg:line")
        .filter(function (d) { return d.order == 3 })
        .attr("class", "separator")
        .style("stroke-width", piBond.strokeWidth)
        .style("stroke", piBond.stroke)

    var tripleBond_2 = bond.append("svg:line")
        .filter(function (d) { return d.order == 3 })
        .attr("class", "separator")
        .style("stroke-width", piBond.strokeWidth)
        .style("stroke", piBond.stroke)

    mainPanel.selectAll("line.link")
        .data(graph.links, function(d) { return d.source + "-" + d.target; } )
        .exit().remove();

    //
    // Atom Properties
    //
    var maxProtons = 11;
    var maxRadius = 10;
    var minRadius = 2.7;
    var atomMultiplier = 2.8;

    var atom = mainPanel.selectAll("circle")
        .data(graph.nodes, function(d) { return Math.random(); });

    atom.enter()
        .append("circle")
        .attr("class", "node")
        .attr("class", function(d) { return 'atom-' + d.name; })
        .attr("r", function(d) { return (d.protons < maxProtons) ? (Math.sqrt(d.protons + minRadius) * atomMultiplier) : maxRadius; })
        .call(force.drag)
        .on("mouseover", function(d) {
            tooltip.transition()
                .delay(200)
                .style("opacity", 0.9);
            tooltip.html(getAtomText(d))
                .style("left", d.x + 13 + "px")
                .style("top", d.y - 20 +  "px"); })
        .on("mouseout", function(d) {
            tooltip.transition()
            .duration(50)
            .style("opacity", 0); });

    atom.exit()
        .remove();

    //
    // XY Coordinates
    //
    var atomRadius = 9;
    var bondOffset = 2;

    force.start();

    force.on("tick", function () {

        singleBond
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        doubleBond
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        aromaticBond_1
            .attr("x1", function(d) { return d.source.x - xOffset(bondOffset, d.source, d.target) })
            .attr("y1", function(d) { return d.source.y - yOffset(bondOffset, d.source, d.target) })
            .attr("x2", function(d) { return d.target.x - xOffset(bondOffset, d.source, d.target) })
            .attr("y2", function(d) { return d.target.y - yOffset(bondOffset, d.source, d.target) });

        aromaticBond_2
            .attr("x1", function(d) { return d.source.x - xOffset(-bondOffset, d.source, d.target) })
            .attr("y1", function(d) { return d.source.y - yOffset(-bondOffset, d.source, d.target) })
            .attr("x2", function(d) { return d.target.x - xOffset(-bondOffset, d.source, d.target) })
            .attr("y2", function(d) { return d.target.y - yOffset(-bondOffset, d.source, d.target) });

        tripleBond_1
            .attr("x1", function(d) { return d.source.x - xOffset(bondOffset, d.source, d.target) })
            .attr("y1", function(d) { return d.source.y - yOffset(bondOffset, d.source, d.target) })
            .attr("x2", function(d) { return d.target.x - xOffset(bondOffset, d.source, d.target) })
            .attr("y2", function(d) { return d.target.y - yOffset(bondOffset, d.source, d.target) });

        tripleBond_2
            .attr("x1", function(d) { return d.source.x - xOffset(-bondOffset, d.source, d.target) })
            .attr("y1", function(d) { return d.source.y - yOffset(-bondOffset, d.source, d.target) })
            .attr("x2", function(d) { return d.target.x - xOffset(-bondOffset, d.source, d.target) })
            .attr("y2", function(d) { return d.target.y - yOffset(-bondOffset, d.source, d.target) });

        atom
            .attr("cx", function(d) { return d.x = Math.max(atomRadius, Math.min(mainPanelWidth - atomRadius, d.x)); })
            .attr("cy", function(d) { return d.y = Math.max(atomRadius, Math.min(mainPanelHeight - atomRadius, d.y)); });

    });

    // Update text
    if (typeof molecule === 'object') {
        updateMolecularWeight(molecule);
        updateMolecularFormula(molecule);
    }

}

//
// Helper Functions
//
function xOffset(offset, source, target) {
    var dx = target.x - source.x;
    var dy = target.y - source.y;
    if (dy === 0 || Math.abs(dx/dy) > 1) { return offset * (dy/dx); }
    else { return offset; }
}

function yOffset(offset, source, target) {
    var dx = target.x - source.x;
    var dy = target.y - source.y;
    if (dy === 0 || Math.abs(dx/dy) > 1) { return -offset; }
    else { return offset * -(dx/dy); }
}

//
// Text Functions
//
function getAtomText(atom) {

    var str = atom.name;
    var x = atom.properties.charge;
    var n = '';

    if (x !== 0) {

        if (x === 1) { n = '+'; }
        else if ( x > 1 ) { n = x + '+' }
        else if ( x === -1 ) { n = '-' }
        else if ( x < -1 ) { n = x + '-' }

        str = str.concat('<sup>' + n + '</sup>');
    }

    return str
}

function updateMolecularWeight(molecule) {

    var decimalPoints = Math.pow(10, 2);
    var molecularWeight = (Math.round(molecule.properties.mass * decimalPoints) / decimalPoints) + ' g/mol';

    document.getElementById("molecularWeight").innerHTML = molecularWeight;
}

function updateMolecularFormula(molecule) {

    var molecularFormula = [];
    var atoms = Object.keys(molecule.properties.formula).sort();

    var charge = 0;

    Object.keys(molecule.atoms).forEach(function (key) {
        charge += molecule.atoms[key].properties.charge;
    });

    function updateFormula(atomName) {
        var atomCount = molecule.properties.formula[atomName];

        if (atomCount === 1) { molecularFormula.push(atomName); }
        else { molecularFormula.push(atomName + atomCount); }

        atoms.splice(atoms.indexOf(atomName), 1);
    }

    if (atoms.indexOf('Li') !== -1) { updateFormula('Li'); }
    if (atoms.indexOf('Na') !== -1) { updateFormula('Na'); }
    if (atoms.indexOf('Mg') !== -1) { updateFormula('Mg'); }
    if (atoms.indexOf('K') !== -1)  { updateFormula('K'); }
    if (atoms.indexOf('Ca') !== -1) { updateFormula('Ca'); }

    if (atoms.indexOf('C') !== -1) { updateFormula('C'); }
    if (atoms.indexOf('H') !== -1) { updateFormula('H'); }

    while (atoms.length > 0) { updateFormula(atoms[0]); }

    molecularFormula = molecularFormula.join('').replace(/(\d+)/g, '<sub>$1</sub>');

    // Append molecule charge
    if (charge !== 0) {
        var n = '';

        if (charge === 1) { n = '+'; }
        else if ( charge > 1 ) { n = charge + '+' }
        else if ( charge === -1 ) { n = '-' }
        else if ( charge < -1 ) { n = charge + '-' }

        molecularFormula = molecularFormula.concat('<sup>' + n + '</sup>');
    }
    document.getElementById("molecularFormula").innerHTML = molecularFormula;
}

//function updateZoom(graph) {

    //var zoom = d3.behavior.zoom();
    //console.log(zoom);
    ///main.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    //console.log(main);
    //zoom.scale(4);
    //main.call(zoom);
//}

//
// Topology Functions
//
function getTopology(molecule) {

    var adjacency = Molecules.topology.matrix.adjacency(molecule);
    var distance = Molecules.topology.matrix.distance(adjacency);

    return {
        adjacent: adjacency,
        distance: distance
    };
}

function formatMatrix(input) {

    var output = [];

    for (var i = 0; i < input.length; i++) {
        output[i] = [];

        for (var j = 0; j < input[0].length; j++) {
            output[i][j] = { x: j, y: i, z: input[i][j] };
        }
    }

    return output;
 }

function updateMatrix(input) {

    var matrix = document.getElementById("matrix");
    var height = footer.offsetTop - 10 - header.offsetHeight;
    var width = matrix.offsetWidth;
    var distance = formatMatrix(input.distance);

    support.append("rect")
        .attr("class", "background")
        .attr("width", width * 2)
        .attr("height", height)
        .attr("x", width*2);

    var x = d3.scale.ordinal().rangeBands([0, width*0.85]);
    var z = d3.scale.linear().domain([0, distance.length]).clamp(true);
    var c = d3.scale.linear().range(["red", "steelblue"]).interpolate(d3.interpolateHcl);

    c.domain(d3.range(distance.length));
    x.domain(d3.range(input.header.length));

    var row = support.selectAll(".row")
        .data(distance)
        .enter().append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) { return "translate(" + (width * 0.1) + "," + (x(i) + height * 0.1) + ")"; })
        .each(row);

    row.append("line")
        .attr("x2", -width);

    row.append("text")
        .attr("x", (x.rangeBand() / 2) - (x.rangeBand()/1.5))
        .attr("y", x.rangeBand() / 2)
        .attr("dy", ".32em")
        .attr("text-anchor", "end")
        .text(function(d, i) { return input.header[i]; });

    var column = support.selectAll(".column")
        .data(distance)
        .enter().append("g")
        .attr("class", "column")
        .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(0)"; });

    column.append("line")
        .attr("x1", -width);

    column.append("text")
        .attr("x", x.rangeBand())
        .attr("y", (x.rangeBand() / 1.5))
        .attr("dy", ".32em")
        .attr("text-anchor", "start")
        .text(function(d, i) { return input.header[i]; });

    function row(row) {

        var cell = d3.select(this).selectAll(".cell")
            .data(row.filter(function(d) { return d.z; }))
            .enter().append("rect")
            .attr("class", "cell")
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.rangeBand()*0.97)
            .attr("height", x.rangeBand()*0.97)
            .style("fill-opacity", function(d) { return z(d.z)+0.4; })
            .style("fill", function(d) { return c(d.z-1); });
    }
}

//
// Initialization
//
parseInput(userExample);

//
// SMILES Examples
//
var randomMolecule = [
    'CCCCC',
    'CC(C)CC',
    'CC(C)(C)C',
    'CC=CC',
    'C=CCC',
    'C/C=C\C',
    'C/C=C/C',
    'C=CC=C',
    'C=C=CC',
    'CC#CC',
    'C#CCC',
    'OCCCC',
    'CC(O)CC',
    'CC(O)(C)C',
    'C(=O)CCC',
    'CC(=O)CC',
    'OC(CCC)=O',
    'O=C(CC)OC',
    'NC(CCC)=O',
    'O=C(CCC)OO',
    'ClC(CCC)=O',
    'O=C(CC)OC(C)=O',
    'C1CCCCC1',
    'C1CCCCC1C2CCCCC2',
    'C12(CCCCC1)CCCCC2',
    'C1C=CCC=C1',
    '[C@H]1=[C@@H][C@@H]=[C@@H][C@@H]=[C@@H][C@@H]=[C@@H]1',
    'c1ccccc1',
    'OCc1ccccc1',
    'c1ccccc1-c2ccccc2',
    'C12=CC=CC=C1C3=C(C=CC=C3)C=C2',
    'C1=CC=CN1',
    'c1occc1',
    'c1sccc1',
    '[CH3+]',
    '[CH3-]',
    '[Na+].[Cl-]',
    '[NH4+].[NH4+].[O-]S(=O)(=O)[S-]',
    'C[13CH](C)C',
    'C[14CH](C)C',
    'C[C@@H](Br)Cl',
    'C[C@H](Br)Cl',
    'O[C@@]([H])(O1)[C@@](O)([H])[C@@]([H])(O)[C@]1([C@@](CO)(O)[H])[H]',
    'NC(C)C(O)=O',
    'NC(CCCNC(N)=N)C(O)=O',
    'NC(CC(N)=O)C(O)=O',
    'NC(CC(O)=O)C(O)=O',
    'NC(CS)C(O)=O',
    'NC(CCC(O)=O)C(O)=O',
    'NC(CCC(N)=O)C(O)=O',
    'NC([H])C(O)=O',
    'NC(CC1=CNC=N1)C(O)=O',
    'NC(C(CC)C)C(O)=O',
    'C((C))O',
    '(N1CCCCC1)',
    'CC(=O)C(Cl)CC(C(C)C)C=C',
    'C2C(=O)C1COCCC1CC2',
    'CC(CC(Cl)CCO)C',
    'CC1C(CC(CC1C)CCO)=O',
    'NC(C(CC)C)C(O)=O',
    'C[C+](C)C'
];
const autoCompleteJS = new autoComplete({
    selector: "#autoComplete",
    placeHolder: "Nhập tên hợp chất hóa học",
    data: {
      src: load,
      cache: true,
    },
    resultsList: {
      element: (list, data) => {
        if (!data.results.length) {
          // Create "No Results" message element
          const message = document.createElement("div");
          // Add class to the created element
          message.setAttribute("class", "no_result");
          // Add message text content
          message.innerHTML = `<span>Không tìm thấy kết quả cho "${data.query}"</span>`;
          // Append message element to the results list
          list.prepend(message);
        }
      },
      noResults: true,
    },
    resultItem: {
      highlight: true
    },
    events: {
      input: {
        selection: (event) => {
          const selection = event.detail.selection.value;
          autoCompleteJS.input.value = selection;
          parseInput(selection);
        }
      }
    }
  });
  window.onload = function(){
    localStorage.clear();

    for (const [key, value] of Object.entries(moldict)) {
        load.push(key,value);
    }
}
sessionStorage.setItem("switch", 1);
document.getElementById("expand_btn").onclick = function () {
  if (sessionStorage.getItem("switch") == "1") {
    sessionStorage.setItem("switch", 0);
    document.getElementById("myFrame1").style.display = "block";
    document.getElementById("expand_btn").innerHTML = "Thu gọn thông tin <i class='fas fa-angle-up'></i>";
  } else {
    sessionStorage.setItem("switch", 1);
    document.getElementById("myFrame1").style.display = "none";
    document.getElementById("expand_btn").innerHTML = "Mở rộng thông tin <i class='fas fa-angle-down'></i>";
  }
}
function info_toggle(){
    document.getElementById("text-info").style.visibility = "hidden";
}