import * as d3 from 'd3';
import {GraphArea} from './graph-area';
import {GraphText} from './graph-text';
import {SSMContainer} from './impl/ssm-container';
import {FocusModule} from './impl/focus-module';

export class MainGraph {

    public static svg;
    public static x;
    public static y;
    public static logPen;
    private domainX = [1, 5000];
    private domainY = [Math.pow(10, -4), Math.pow(10, 1)];
    private container: SSMContainer;

    // example:
    // {
    //     x: 110,
    //     y: 80,
    //     width: 45,
    //     height: 45,
    //     href: 'http://svgshare.com/i/3p9.svg'
    // }
    public static renderSvg(conf): any {
        return MainGraph.svg.append("svg:image")
            .attr('x', conf.x)
            .attr('y', conf.y)
            .attr('width', conf.width)
            .attr('height', conf.height)
            .attr("xlink:href", conf.href);
    }

    constructor(private selector: string) {
        // create promise chain and end set .then(init)
    }

    public init(dataRef) {
        let margin = {top: 20, right: 30, bottom: 60, left: 60},
            width = 760 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;
        MainGraph.x = d3.scale.linear()
            .domain(this.domainX)
            .range([0, width]);
        
        MainGraph.y = d3.scale.log()
            .domain(this.domainY)
            .range([height, 0]);

        MainGraph.logPen = d3.svg.line()
            .interpolate("monotone")
            .x(function(d) { return MainGraph.x(d[0]); })
            .y(function(d) { return MainGraph.y(d[1]); });
        
        let xAxis = d3.svg.axis()
            .scale(MainGraph.x)
            .orient("bottom");
        
        let yAxis = d3.svg.axis()
            .scale(MainGraph.y)
            .orient("left")
            .ticks(0, "e")
            .tickFormat(function (d) {
                let log = Math.log(d) / Math.LN10;
                return Math.abs(Math.round(log) - log) < 1e-6 ? 10 : '';
            });
        let yAxisSub = d3.svg.axis()
            .scale(MainGraph.y)
            .orient('left')
            .ticks(0, "e")
            .tickFormat(function (d) {
                let log = Math.log(d) / Math.LN10;
                return Math.abs(Math.round(log) - log) < 1e-6 ? Math.round(log) : '';
            });

        MainGraph.svg = d3.select(this.selector).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        MainGraph.svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
        
        MainGraph.svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
        MainGraph.svg.append('g')
            .attr("class", "y axis-y-sub")
            .attr("transform", "translate(5, -8)")
            .style("font-size", "8px")
            .call(yAxisSub);

        // x sign
        MainGraph.svg.append("text")
            .attr("class", 'axis-sign')
            .attr("x", width/2 - 50)         
            .attr("y", height + 40)     
            .text("Mz(GeV)");
        // y sign 
        MainGraph.svg.append("text")
            .attr("class", 'axis-sign')
            .attr("text-anchor", "middle")
            .attr("transform", "translate(-" + margin.right + "," + height/2 + ") rotate(270)")
            .text("...(pb)"); 

        this.renderRef(dataRef);


        // render main legend
        MainGraph.renderSvg({
            x: 300,
            y: -150,
            width: 400,
            height: 400,
            href: 'https://cdn1.savepice.ru/uploads/2017/11/9/23a327011c5f481a636de5fefb242ca0-full.png'
        });

        

        this.container = new SSMContainer();

        new FocusModule(width, height, this.domainX, this.domainY);
        // disable loading
        
    }

    public addLineToContainer(lineConfig) {
        this.container.addLine(lineConfig)
    }

    private renderObserved(data) {
        new GraphArea({
            data,
            class: 'yellow-area',
            offset: 25
        });
        new GraphArea({
            data,
            class: 'green-area',
            offset: 15
        });
    }

    private renderExpected(data) {
        // rend line
        // rend areas
    }

    private renderRef(data) {
        new GraphText({
            text: 'Reference model',
            class: 'ref-text',
            x: 70,
            y: 40
        });

        let temp = MainGraph.svg.selectAll(".rectangles");

        MainGraph.svg.append("path")
		    .datum(data)
            .attr("class", "line-ref")
            .attr("d", MainGraph.logPen);
        // elements with class .rectangles isn't exist
        MainGraph.svg.selectAll(".rectangles")
            .data(data)
            .enter().append("rect")
            .attr("x", MainGraph.logPen.x())
            .attr("y", function(d) { return MainGraph.y(d[1]) - 2; })
            .style("fill", "blue")
            .attr("width", 5)
            .attr("height", 7);
    }
}