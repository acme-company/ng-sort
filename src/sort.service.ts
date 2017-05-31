import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ChangeDetector } from './changeDetector';

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
    private internal: any[];
    private copy: any[];
    private parameters: SortParameter[];
    private sorting: number = 0;
    private shouldSort: boolean;
    constructor() {
        this.parameters = [];
        this.shouldSort = false;
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
            if (!ChangeDetector.referenceChanged(this.internal, array) 
            && !ChangeDetector.propertyChanged(this.copy, array)){  
          
                return array;
            }
        }
        
        ++this.sorting;
        const parameters = this.parameters.filter((t) => t.priority !== undefined)
        .sort((a, b) =>  a.priority == b.priority ? 0 : (a.priority < b.priority ? -1:1));
        
        var array = array.sort((a, b) => {
            let result = 0;
            for (var i = 0, parm = parameters[i]; i < parameters.length && result == 0; ++i) {
                var aa = a[parm.name];
                var bb = b[parm.name];
                result = (aa == bb) ? 0 : (aa<bb? -1:1) * (parm.asc ? 1: -1);
            }
            return result;
        });
        this.internal = array;
        this.copy = array.slice();
        this.shouldSort = false;
        return this.internal;
    }

}
