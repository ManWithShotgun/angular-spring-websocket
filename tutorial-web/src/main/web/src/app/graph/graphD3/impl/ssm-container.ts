import {SSMLine} from './ssm-line';
import { LineConfig } from '../line-config';
import { LedgedConfig } from '../legend-config';
import { LinePoints } from '../line-points';

export class SSMContainer {
    private static context;
    private static LINE_CLASS = 'ssm-line';
    private static TEXT_CLASS = 'ssm-text';
    private static LEGEND_CLASS = 'ssm-legend-text';

    private static LEGEND_START_X = 470;
    private static LEGEND_START_Y = 150;
    private static LEGEND_STEP_Y = 20;

    private lines: SSMLine[] = [];

    constructor() {
        SSMContainer.context = this;
    }

    // legend text & line text + x +y
    public addLine(config) {
        let lineNumber = this.lines.length
        let textConfig = new LedgedConfig(config.text.text, config.text.x, config.text.y);
        textConfig.setCssClass(SSMContainer.TEXT_CLASS);
        if (lineNumber === 0) {
            textConfig.mustRenderZ();
        }
        // set legend config
        let legendConfig = new LedgedConfig(config.legend.text, SSMContainer.LEGEND_START_X, 
            SSMContainer.LEGEND_START_Y + SSMContainer.LEGEND_STEP_Y * lineNumber);
        legendConfig.setCssClass(SSMContainer.LEGEND_CLASS);
        let lineConfig = new LineConfig(textConfig, SSMContainer.LINE_CLASS, legendConfig);
        let line = new SSMLine(lineConfig);
        this.lines.push(line);
    }

    public setData(line: LinePoints) {
        this.lines[0].setData(line.getData());
    }

    public setPoint(point) {
        this.lines[0].setPoint(point);
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