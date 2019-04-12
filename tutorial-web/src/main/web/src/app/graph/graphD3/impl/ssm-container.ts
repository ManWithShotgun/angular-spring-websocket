import {SSMLine} from './ssm-line';
import { LineConfig } from '../line-config';
import { LedgedConfig } from '../legend-config';
import { LinePoints } from '../line-points';

export class SSMContainer {
    private static context;
    private static LINE_CLASS = 'ssm-line';
    private static TEXT_CLASS = 'ssm-text';
    private static LEGEND_CLASS = 'ssm-legend-text';
    private static LEGEND_TEXT_PREFIX = 'ssm ';

    private static LEGEND_START_X = 470;
    private static LEGEND_START_Y = 150;
    private static LEGEND_STEP_Y = 20;

    // private lines: SSMLine[] = [];
    private lines: Map<string, SSMLine> = new Map();

    constructor() {
        SSMContainer.context = this;
    }

    // legend text & line text + x +y
    public addLine(config) {
        let lineNumber: number = this.lines.size;
        let textConfig = new LedgedConfig(config.ksi, config.text.x, config.text.y);
        textConfig.setCssClass(SSMContainer.TEXT_CLASS);
        if (lineNumber === 0) {
            textConfig.mustRenderZ();
        }
        // set legend config
        let legendConfig = new LedgedConfig(SSMContainer.LEGEND_TEXT_PREFIX + config.ksi, SSMContainer.LEGEND_START_X, 
            SSMContainer.LEGEND_START_Y + SSMContainer.LEGEND_STEP_Y * lineNumber);
        legendConfig.setCssClass(SSMContainer.LEGEND_CLASS);
        let lineConfig = new LineConfig(textConfig, SSMContainer.LINE_CLASS, legendConfig);
        let line = new SSMLine(lineConfig);
        this.lines.set(config.ksi, line);
    }

    public setData(line: LinePoints, ksi) {
        this.lines.get(ksi).setData(line.getData());
    }

    public setPoint(point, ksi) {
        this.lines.get(ksi).setPoint(point);
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