import {SSMLine} from './ssm-line';

export class SSMContainer {
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