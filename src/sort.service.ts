import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface SortParameter {
    name: string;
    asc: boolean;
}

@Injectable()
export class SortService {
    public onClear$: Observable<string>;
    private shouldSort: boolean;
    private parameters: SortParameter[];
    private clearEvent: Subject<string>;
    constructor() {
        this.shouldSort = false;
        this.parameters = [];
        this.clearEvent = new Subject<string>();
        this.onClear$ = this.clearEvent.asObservable();
    }
    public orderBy(parameter: SortParameter, preserve: boolean) {
        const parm = this.parameters.find((t) => t.name === parameter.name);
        if (!parm) {
            this.parameters.push(parameter);
        } else {
            parm.asc = parameter.asc;
        }


        if (!preserve) {
            this.clearEvent.next(parameter.name);
            this.parameters
                .filter((t) => t !== (parm || parameter))
                .forEach((t) => this.clear(t.name, true));
        }
        this.shouldSort = true;
    }

    public clear(name: string, preserve: boolean) {
        const parmIndex = this.parameters.findIndex((t) => t.name === name);
        if (parmIndex >= 0) {
            const parm = this.parameters.splice(parmIndex, 1);
           
        }

        if (!preserve) {
             this.parameters
                 .filter((t) => parmIndex < 0 || t !== this.parameters[parmIndex])
                 .forEach((t) => this.clear(t.name, true));
             this.clearEvent.next(name);
        }


        this.shouldSort = true;
    }

    public sort(array: any[]): any[] {
        if (!this.shouldSort) {
            return array;
        }

        this.shouldSort = false;
        return array.sort((a, b) => {
            let result = 0;
            this.parameters.forEach((parm) => {
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
