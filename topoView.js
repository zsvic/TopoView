function TopoView(content) {

    var snodes_radius;
    var svg_width;
    var svg_height;
    var local;
    var centerpoint;
    var svg;
    var switchNodes;
    var hostNodes
    var links;
    var simulation;

    init();



    //初始化数据
    function init() {
        snodes_radius = 20;
        svg_width = 1000;
        svg_height = 500;
        local = {};
        centerpoint = {
            "x": svg_width / 2,
            "y": svg_height / 2
        }
        svg = d3.select("#" + content).select("svg")
            .style("width", svg_width + "px")
            .style("height", svg_height + "px");
    }

    //设置拓扑信息
    this.setTopoInfo = function(snodes, hnodes, lks) {
        switchNodes = snodes;
        hostNodes = hnodes;
        links = lks;

        links.forEach(function(linkele) {
            switchNodes.forEach(function(nodeele) {
                nodeele["x"] = centerpoint.x;
                nodeele["y"] = centerpoint.y;
                local[nodeele.id] = centerpoint;

                if (linkele.source == nodeele.id) {
                    linkele["source_node"] = nodeele;
                }
                if (linkele.target == nodeele.id) {
                    linkele["target_node"] = nodeele;
                }
            });

            hostNodes.forEach(function(nodeele) {
                nodeele["x"] = centerpoint.x;
                nodeele["y"] = centerpoint.y;
                local[nodeele.id] = centerpoint;

                if (linkele.source == nodeele.id) {
                    linkele["source_node"] = nodeele;
                }
                if (linkele.target == nodeele.id) {
                    linkele["target_node"] = nodeele;
                }
            });

        });
    }

    //更新拓扑视图
    this.updateTopoView = function() {
        svg.selectAll("*").remove();


        //绘制路径
        svg.selectAll("path")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", function(d) {
                var x1 = d.source_node.x;
                var y1 = d.source_node.y;
                var x2 = d.target_node.x;
                var y2 = d.target_node.y;

                return "M" + x1 + " " + y1 + "L" + x2 + " " + y2;
            });

        //绘制交换机节点
        var snodes = svg.selectAll(".switchnode")
            .data(switchNodes)
            .enter().append("g")
            .attr("class", "switchnode");

        snodes.append("svg:image")
            .attr("class", "snodeimg")
            .attr("xlink:href", function(d) {
                return "./img/switch.png";
            })
            .attr("x", function(d) {
                return d.x;
            })
            .attr("y", function(d) {
                return d.y;
            })
            .attr("width", "40px")
            .attr("height", "40px");

        snodes.append("svg:text")
            .attr("class", "snodetext")
            .attr("x", function(d) {
                return d.x;
            })
            .attr("y", function(d) {
                return d.y;
            })
            .text(function(d) { return d.id });


        //绘制主机节点
        var hnodes = svg.selectAll(".hostnode")
            .data(hostNodes)
            .enter().append("g")
            .attr("class", "hostnode");

        hnodes.append("svg:image")
            .attr("class", "hnodeimg")
            .attr("xlink:href", function(d) {
                return "./img/server.png";
            })
            .attr("x", function(d) {
                return d.x;
            })
            .attr("y", function(d) {
                return d.y;
            })
            .attr("width", "40px")
            .attr("height", "40px");

        hnodes.append("svg:text")
            .attr("class", "hnodetext")
            .attr("x", function(d) {
                return d.x;
            })
            .attr("y", function(d) {
                return d.y;
            })
            .text(function(d) { return d.id });


        conllideAction();
        dragAction();
    }

    //碰撞动作
    function conllideAction() {

        simulation = d3.forceSimulation()
            .nodes(switchNodes.concat(hostNodes))
            .force("collide", d3.forceCollide(snodes_radius + 1).iterations(4))
            .on("tick", refreshTopoView);

        function refreshTopoView() {
            svg.selectAll(".snodeimg")
                .data(switchNodes)
                .attr("x", function(d) {
                    return d.x - 20;
                })
                .attr("y", function(d) {
                    return d.y - 20;
                });
            svg.selectAll(".snodetext")
                .data(switchNodes)
                .attr("x", function(d) {
                    return d.x + 20;
                })
                .attr("y", function(d) {
                    return d.y + 20;
                });

            svg.selectAll(".hnodeimg")
                .data(hostNodes)
                .attr("x", function(d) {
                    return d.x - 20;
                })
                .attr("y", function(d) {
                    return d.y - 20;
                });
            svg.selectAll(".hnodetext")
                .data(hostNodes)
                .attr("x", function(d) {
                    return d.x + 20;
                })
                .attr("y", function(d) {
                    return d.y + 20;
                });

            svg.selectAll("path")
                .data(links)
                .attr("d", function(d) {
                    var x1 = d.source_node.x;
                    var y1 = d.source_node.y;
                    var x2 = d.target_node.x;
                    var y2 = d.target_node.y;

                    return "M" + x1 + " " + y1 + "L" + x2 + " " + y2;
                });
        }
    }

	
    //拖拽动作

    function dragAction() {
        var snodeselect = svg.selectAll("g");
        var hnodeselect = svg.selectAll("rect");

        snodeselect.call(d3.drag()
            .on("drag", dragged)
            .on("end", dragend)
        );
        hnodeselect.call(d3.drag()
            .on("drag", dragged)
            .on("end", dragend)
        );

        function dragged(d) {
            d.x = d3.event.x;
            d.y = d3.event.y;

            simulation.restart();
        }

        function dragend() {

        }

    }



}