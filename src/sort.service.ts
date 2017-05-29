import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface SortParameter {
    name: string;
    asc: boolean;
    priority: number;
}

export interface Options {
    noneClass: string;
    ascendingClass: string;
    descendingClass: string;
}

@Injectable()
export class SortService {
    public options: Options;
    private shouldSort: boolean;
    private parameters: SortParameter[];
    constructor() {
        this.shouldSort = false;
        this.parameters = [];
    }
    public configure(options: Options) {
        this.options = options;
    }
    public register(name: string): SortParameter {
        let parm = this.parameters.find((t) => t.name === name);
        if (!parm) {
            parm = { name, asc: undefined, priority: undefined};
            this.parameters.push(parm);
        }
        return parm;
    }

    public clear() {
        this.parameters.forEach((t) => {
            t.asc = undefined;
            t.priority = undefined;
        });
        this.shouldSort = true;
    }

    public update(name: string, asc: boolean) {
        const parm = this.parameters.find((t) => t.name === name);
        if (parm.asc === undefined) {
            parm.priority = this.parameters.map((t) =>
                t.priority || 0).reduce((p, c) => c > p ? c : p, 0) + 1;
        }
        if (asc === undefined) {
            parm.priority = undefined;
        }
        parm.asc = asc;
        this.shouldSort = true;
    }

    public sort(array: any[]): any[] {
        if (!this.shouldSort) {
            return array;
        }

        this.shouldSort = false;
        const parameters = this.parameters.filter((t) => t.priority !== undefined)
        .sort((a, b) => {
            if (a.priority < b.priority) {
                return -1;
            }
            if (a.priority > b.priority) {
                return 1;
            }
            return 0;
        });
        return array.sort((a, b) => {
            let result = 0;
            parameters.forEach((parm) => {
                if (result === 0) {
                    const factor = parm.asc ? 1 : -1;
                    const aa = a[parm.name];
                    const bb = b[parm.name];
                    if (aa < bb) {
                        result = -1 * factor;
                    }
                    if (aa > bb) {
                        result = 1 * factor;
                    }
                }
            });
            return result;
        });
    }
}
