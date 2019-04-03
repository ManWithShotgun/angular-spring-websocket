import * as d3 from 'd3';
import { Component, ViewEncapsulation } from '@angular/core';
import { ZprimeService } from './ZprimeService';

@Component({
    selector: 'graph-comp',
    templateUrl: './graph.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./graph.component.css']
})
export class Graph {

    ngOnInit() {
        // fetch('/ws/monitors').then((response) => {return response.json();}).then((data)=> {
        //     console.log(data);
        // });
        var data = [
            [7.04724001002674, 6.61475269982607],
            [469.966494833577, 0.0564702199413471],
            [730.847237320262, 0.0215223094667359],
            [905.866531022960, 0.0144661295207866],
            [1039.02689299484, 0.00931883809850469],
            [1283.62719582864, 0.00635253741779030],
            [1381.46335692502, 0.00501137608676594],
            [1464.63016304429, 0.00465843115289524],
            [1619.54107684353, 0.00345799854937132],
            [1854.89727558436, 0.00221381244720744],
            [2028.29945846779, 0.00198801193219451],
            [2233.76875950421, 0.00160342968533543],
            [2822.45802872374, 0.000930996827220198],
            [2881.70898444618, 0.000910414017692678],
            [3051.84671932062, 0.000769350625256198],
            [3146.97465501620, 0.000746237104002209],
            [3307.87000755296, 0.000614227804738634],
            [3426.37134507942, 0.000580272568532539],
            [3747.08700528734, 0.000508480886790707],
            [4033.01469573609, 0.000466843569031935],
            [4991.91788941422, 0.000457874894929627]
          ];
          var dataRef = [
            [214, 7.74515302348704],
            [422, 2.06670819007132],
            [637, 0.759514797439999],
            [850, 0.329563765307096],
            [1061, 0.157606621702001],
            [1275, 0.0822319227166973],
            [1489, 0.0453169751352594],
            [1700, 0.0264312842459514],
            [1915, 0.0157315491239002],
            [2125, 0.00959368355537086],
            [2340, 0.00606782606658235],
            [2553, 0.00389261104625838],
            [2766, 0.00254312064642874],
            [2978, 0.00167838881005014],
            [3191, 0.00112123466115219],
            [3403, 0.000770581808809941],
            [3617, 0.000526380530382762],
            [3829, 0.000367672027921608],
            [4043, 0.000256814729469311],
            [4253, 0.000184543483047888],
            [4468, 0.000133148057754045]
          ];
          var dataObserved = [
            [7.05670966406125, 8.08379869461361],
            [7.04724001002674, 6.61475269982607],
            [99.9161371264827, 1.06814273110627],
            [207.535311718150, 0.812451011183475],
            [315.058928891832, 0.0816634920543581],
            [422.681546994057, 0.0668142736288953],
            [530.294695442248, 0.0447310072600225],
            [633.034415573223, 0.0447254215391931],
            [738.467247919771, 0.0264086600480022],
            [846.059065733116, 0.0112534740341184],
            [955.841147567494, 0.00671236131535110],
            [1058.58431120903, 0.00721929021255946],
            [1166.74717785657, 0.00550227034306237],
            [1273.83040829112, 0.00492147702120296],
            [1382.54241921959, 0.00421863529493488],
            [1489.08520980267, 0.00403422173588066],
            [1591.82052989238, 0.00367480205103872],
            [1697.81455880681, 0.00315000980080376],
            [1802.17598110446, 0.00259820969426234],
            [2016.87685568154, 0.00171127008625540],
            [2234.31082545788, 0.00155228893437709],
            [2443.58444043633, 0.00122937147873451],
            [2653.41571281903, 0.00131137382042053],
            [2868.13026578526, 0.00115394389224072],
            [3401.90185470731, 0.000493468684786436],
            [3930.26722770636, 0.000396241941684986],
            [4468.42508385474, 0.000374905054734916],
            [4995.17238950382, 0.000394129240239056]
          ];
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
          var dataSsm0002 = [
            [7.35227765362328, 0.0422911853669169],
            [92.7004520583269, 0.0455782905395418],
            [186.200850749892, 0.0473614726175304],
            [283.505276424271, 0.0480322079110225],
            [377.004718585126, 0.0489104373218941],
            [475.939168243364, 0.0488055827214477],
            [572.699614902649, 0.0490973299440967],
            [664.023141003129, 0.0484006224406146],
            [755.347049715894, 0.0481020169254173],
            [853.193541343945, 0.0472273178425408],
            [951.040032971996, 0.0463685245061274],
            [1083.67478131843, 0.0437158137398881],
            [1427.22110783206, 0.0379970464081949],
            [1992.00275281886, 0.0276261539663936],
            [2643.75283958098, 0.0173228149410967],
            [3113.94488435611, 0.0116157246209434],
            [3578.15622086348, 0.00760185361320799],
            [3945.06657520703, 0.00527665565983102],
            [4126.61916496897, 0.00439621966472274],
            [4403.84032158409, 0.00333639860164256],
            [4989.81065225887, 0.00189836394573680]
          ];

        let main: MainGraph = new MainGraph("div#svg");
        main.init(dataSsm001, dataSsm0002, dataRef);

    }
}

class MainGraph {

    public static svg;
    public static x;
    public static y;
    public static logPen;
    private domainX = [1, 5000];
    private domainY = [Math.pow(10, -4), Math.pow(10, 1)];

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

    public init(dataSsm1, dataSsm2, dataRef) {
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

        let ssmData = [{
            data: dataSsm1,
            render: true,
            legend: {
                text: 'ssm 0.01:'
            },
            text: {
                text: '001',
                x: 170,
                y: 140
            }
        },
        {
            data: dataSsm2,
            render: true,
            legend: {
                text: 'ssm 0.002:'
            },
            text: {
                text: '0002',
                x: 270,
                y: 140
            }
        }];

        new SSMContainer(ssmData);

        new FocusModule(width, height, this.domainX, this.domainY);
        // disable loading
        
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

class SSMContainer {
    private static context;
    private static INTORPOLATE = 'monotone';
    private static LINE_CLASS = 'ssm-line';
    private static TEXT_CLASS = 'ssm-text';
    private static LEGEND_CLASS = 'ssm-legend-text';

    private static LEGEND_START_X = 470;
    private static LEGEND_START_Y = 150;
    private static LEGEND_STEP_Y = 20;

    private lines: SSMLine[];

    constructor(linesConf: any[]) {
        SSMContainer.context = this;
        this.lines = linesConf.map((conf, i) => {
            conf.interpolate = SSMContainer.INTORPOLATE;
            conf.class = SSMContainer.LINE_CLASS;
            // set text config
            conf.text.class = SSMContainer.TEXT_CLASS; 
            if (i === 0) {
                conf.text.urlZ = true;
            }
            // set legend config
            conf.legend.x = SSMContainer.LEGEND_START_X;
            conf.legend.y = SSMContainer.LEGEND_START_Y + SSMContainer.LEGEND_STEP_Y * i;
            conf.legend.class = SSMContainer.LEGEND_CLASS;
            return new SSMLine(conf);
        });
    }

    public static updateX(x0) {
        SSMContainer.context.updateX(x0);
    }

    private updateX(x0) {
        this.lines.forEach((line) => {
            line.updateX(x0);
        });
    }
    
}

class GraphLine {
    
    protected line;
    protected lienView;

    protected data: any[];

    constructor(lineConfig: any) {
        this.line = d3.svg.line()
            .x(function(d) { return MainGraph.x(d[0]); })
            .y(function(d) { return MainGraph.y(d[1]); });

        if (lineConfig.interpolate) {
            this.line.interpolate(lineConfig.interpolate);
        } else {
            this.line.interpolate("monotone");
        }

        // TODO-ilia remove in css class
        this.lienView = MainGraph.svg.append("path").style("stroke-dasharray", ("7, 4, 4, 4"));
        if (lineConfig.data) {
            this.data = lineConfig.data;
            this.lienView.datum(this.data);
        }
        // css class necessary
        this.lienView.attr("class", lineConfig.class);
        if (lineConfig.render) {
            this.lienView.attr("d", this.line);
        }
    }

    protected setData(data) {
        this.data = data;
        this.lienView.datum(this.data);
        this.lienView.attr("d", this.line);
    }
}

class GraphArea {
    
    protected area;
    protected areaView;

    constructor(lineConfig: any) {
        this.area = d3.svg.area()
            .interpolate("basis")
            .x(function(d) { return MainGraph.x(d[0]); })
            .y0(function(d) { return MainGraph.y(d[1]) + lineConfig.offset;})
            .y1(function(d) { return MainGraph.y(d[1]) - lineConfig.offset;});

        this.areaView = MainGraph.svg.append("path");
        this.areaView.datum(lineConfig.data);
        this.areaView.attr("class", "area " + lineConfig.class)
            .attr("d", this.area);
    }
}

class GraphText {
    protected textSign: {text: string, x, y};
    private textView;
    constructor(textConfig: any) {
        this.textSign = {
            text: textConfig.text,
            x: textConfig.x,
            y: textConfig.y
        };
        this.textView = MainGraph.svg.append("text")
            .attr("class", textConfig.class)
            .attr("x", this.textSign.x)         
            .attr("y", this.textSign.y)         
            .text(this.textSign.text);
    }

    public updateText(text) {
        this.textSign.text = text;
        this.textView.text(this.textSign.text);
    }
}

// example:
// {
//     text: '=0.01',
//     class: 'ssm-text',
//     x: 170,
//     y: 140,
//     urlZ: true
// }
class SSMText extends GraphText {
    private static urlZ: string = 'http://svgshare.com/i/3p9.svg';
    private static urlE: string = 'http://svgshare.com/i/3sF.svg';
    constructor(textConfig: any) {
        super(textConfig);
        this.renderE();
        if (textConfig.urlZ) {
            this.renderZ();
        }
    }

    private renderZ() {
        MainGraph.renderSvg({
            x: this.textSign.x - 70,
            y: this.textSign.y - 30,
            width: 45,
            height: 45,
            href: SSMText.urlZ
        });
    }

    private renderE() {
        MainGraph.renderSvg({
            x: this.textSign.x - 18,
            y: this.textSign.y - 16,
            width: 22,
            height: 22,
            href: SSMText.urlE
        });
    }
}

class SSMLine extends GraphLine {
    private bisectDate = d3.bisector(function(d) { return d[0]; }).left;
    private formatValueY = d3.format(",.4f");
    private formatValueX = d3.format(",.0f");
    private legendView: GraphText;
    private legendText: string;
    private focusGroup;

    constructor(lineConfig: any) {
        super(lineConfig);
        // set text
        if(lineConfig.text) {
            new SSMText(lineConfig.text);
        }
        // set dinamic legend for line
        this.legendText = lineConfig.legend.text;
        this.legendView = new GraphText(lineConfig.legend);
        // set focus group
        this.focusGroup = MainGraph.svg.append("g")
            .attr("class", "focus")
            .style("display", "none");
      
        this.focusGroup.append("circle")
            .attr("r", 4.5);
        
        this.focusGroup.append("text")
            .attr("x", 9)
            .attr("dy", ".35em");
        // setTimeout(() => {
        //     this.data[3] = [this.data[3][0], 8];
        //     this.setData(this.data);
        // }, 5000);

        // ?? invoke request for each x point async ??
        //
    }

    public updateX(x): void {
        let i = this.bisectDate(this.data, x, 1);
        if (i < this.data.length) {
            let d0 = this.data[i - 1],
                d1 = this.data[i], //excaption when check line sooo right side
                d = x - d0[0] > d1[0] - x ? d1 : d0;
            this.updateText(d);
            // update focus: circle and text circle
            this.updateFocus(d);
        }
    }

    private updateText(d): void {
        // update text legend
        this.legendView.updateText(this.legendText + ' ' + this.formatValueY(d[1]));
    }

    private updateFocus(d) {
        this.focusGroup.attr("transform", "translate(" + MainGraph.x(d[0]) + "," + MainGraph.y(d[1]) + ")");
        this.focusGroup.style("display", null);
        this.focusGroup.select("text").text(this.formatValueX(d[0]));
    }
}


class FocusModule {
    private static context;
    private checkLine;

    constructor(width, height, domainX, domainY) {
        FocusModule.context = this;
        var focus = MainGraph.svg.append("g")
        .attr("class", "focus")
        .style("display", "none");

        MainGraph.svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { focus.style("display", "none"); })
            .on("mousemove", this.mousemove);
        this.initCheckLine(domainX, domainY);
    }

    private initCheckLine(domainX, domainY) {
        this.checkLine = MainGraph.svg.append("path")
            .attr("class", "ssm-line")
            .attr("d", function(d){
                return MainGraph.logPen([
                    [domainX[0], domainY[1]], 
                    [domainX[0], domainY[0]]
                ]);
        });
    }

    public mousemove() {
        let x0 = MainGraph.x.invert(d3.mouse(this)[0]);
        FocusModule.context.mouseMoveInvoke(x0);
    }

    public mouseMoveInvoke(x0) {
        this.checkLine.attr('transform', 'translate(' + MainGraph.x(x0) + ')');
        // invoke SSMContainer change X
        SSMContainer.updateX(x0);
    }

}
