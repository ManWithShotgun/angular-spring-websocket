import {MainGraph} from './main-graph';

export class GraphText {
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