import fs from 'fs';
import path from 'path';

export class daLogger {

    private static filepath: string = '';
    private static fileHandle: number;

    public static initalize(): void {

        for (let n = 1; n <= 999; n++) {

            this.filepath = path.join('./', this.generateFilename(n));
            if (!fs.existsSync(this.filepath)) break;
        }

        this.fileHandle = fs.openSync(this.filepath, 'a');
    }

    private static generateFilename(n: number): string {

        const now = new Date();
        const filename = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDay().toString().padStart(2, '0')}-${n.toString().padStart(3, '0')}.log`;
        return filename;
    }

    private static addLogMessage(type: string, message: string): void {

        const now = new Date();
        const time = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDay().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}:${now.getMilliseconds().toString().padStart(3, '0')}`;
       
        fs.writeSync(this.fileHandle, `${time} ${type}\t ${message}\n`);
    }

    public static info(message: any, ...params: any[]): void {

        params.unshift(message);
        this.addLogMessage('INFO', params.join(' '));
    }

    public static error(message: any, ...params: any[]): void {

        params.unshift(message);
        this.addLogMessage('ERROR', params.join(' '));
    }
}
