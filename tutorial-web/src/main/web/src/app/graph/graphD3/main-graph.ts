import * as d3 from 'd3';
import {GraphArea} from './graph-area';
import {GraphText} from './graph-text';
import {SSMContainer} from './impl/ssm-container';
import {FocusModule} from './impl/focus-module';
import {WebsoketService} from "../../service/websoket.service";

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

    constructor(private selector: string, private webSocketService: WebsoketService) {
        this.webSocketService.getConnection().then(client => {
            client.subscribe("/user/data/reply", this.receiveData.bind(this));
            client.subscribe("/user/data-all/reply", this.receiveWholeLine.bind(this));
            return client;
        });
        // create promise chain and end set .then(init)
    }

    private receiveData(response) {
        if (response.body) {
            console.log(response.body);
          }
    }

    private receiveWholeLine(response) {
        if (response.body) {
            console.log(response.body);
            var dataSsm001 = [
                [8.59165449529164, 1.06178857435021],
                [99.3760798873023, 1.15128488626385],
                [222.230493024433, 1.19144730357768],
                [315.186338782478, 1.21323273909261],
                [413.033691288169, 1.21308845227264],
                [566.327398615062, 1.20063904156244],
                [662.543579300040, 1.19080980458061],
                [757.127440327453, 1.14339458712534],
                [795.178423299542, 1.12496111020824],
                [886.500992869312, 1.08675691414999],
                [1044.13964529584, 0.991876112300337],
                [1174.05555075058, 0.918239146783523],
                [1471.38986992273, 0.698270266164395],
                [2138.88550436439, 0.294353459014719],
                [2841.70227878329, 0.0949642731795702],
                [3536.36453324161, 0.0302675143064834],
                [4327.23866399672, 0.00873436711509305],
                [4986.57853498789, 0.00354294832982600]
              ];

              var test = [
                  [99, 1.15128488626385],
                  [1044, 0.991876112300337],
                  [1174, 0.918239146783523],
                  [1471, 0.698270266164395],
                  [222, 1.19144730357768],
                  [662, 1.19080980458061],
                  [3536, 0.0302675143064834],
                  [795, 1.12496111020824],
                  [2138, 0.294353459014719],
                  [2841, 0.0949642731795702],
                  [566, 1.20063904156244],
                  [413, 1.21308845227264],
                  [886, 1.08675691414999],
                  [315, 1.21323273909261],
                  [92, 1.06178857435021],
                  [757, 1.14339458712534],
                  [4986, 0.00354294832982600],
                  [4327, 0.00873436711509305]
                ];
            test.sort((a, b) => {
                if (a[0] === b[0]) {
                    return 0;
                }
                else {
                    return (a[0] < b[0]) ? -1 : 1;
                }
            });
            // before render the data should be sort
            // this.container.setData(JSON.parse(response.body).result);
            this.container.setData(test);
          }
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
