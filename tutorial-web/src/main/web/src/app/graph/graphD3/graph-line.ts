import * as d3 from 'd3';
import {MainGraph} from './main-graph';

export class GraphLine {
    
    private line;
    private lienView;

    protected data: any[] = [];

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
            // add data
            this.lienView.datum(this.data);
            // start render
            this.lienView.attr("d", this.line);

        }
        // css class necessary
        this.lienView.attr("class", lineConfig.class);
    }

    public setData(data) {
        this.data = data;
        this.lienView.datum(this.data);
        this.lienView.attr("d", this.line);
    }

    public setPoint(point) {
        let insertIndex = -1;
        for(let i = 0; i < this.data.length; i++) {
            // if the mass of point alredy exists then update value
            if (this.data[i][0] === point[0]) {
                this.data[i][1] = point[1];
                break;
            }
            // if mass of point less current mass then insert point
            if (point[0] < this.data[i][0]) {
                insertIndex = i
                break;
            }
        }
        if (insertIndex > -1) {
            this.data.splice(insertIndex, 0, point);
        }
        this.setData(this.data);
    }
}
