import * as d3 from 'd3';
import {MainGraph} from './main-graph';

export class GraphLine {
    
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

    public setData(data) {
        this.data = data;
        this.lienView.datum(this.data);
        this.lienView.attr("d", this.line);
    }
}
