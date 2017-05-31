export class ChangeDetector {
    private static refChanged(a: any, b: any): boolean {
        if (a !== b)
            return true;

        if (a === null && b === null)
            return false;
            
        if (a === null || b === null)
            return true;

        if (a === undefined && b === undefined)
            return false;

        if (a === undefined || b === undefined)
            return true;
        return false;
    }
    private static isArray(a: any): boolean {
        return a.constructor === [].constructor;
    }

    private  static isObject(a: any): boolean {
        return a.constructor === {}.constructor;
    }

    private static arrayChanged(a:any[], b: any[]): boolean {
        if (a.length != b.length)
            return true;
        
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i])
                return true;
        }
        return false;
    }

    private static objChanged(a:object, b:object): boolean {
        if (Object.keys(a).length != Object.keys(b).length)
            return true;
        
        for (var key in a) {
            if (a[key] !== b[key])
                return true;
        }

        return false;
    }

    public static referenceChanged(a:any, b:any): boolean {

        return ChangeDetector.refChanged(a, b);
        
    }
    public static propertyChanged(a:any, b:any):boolean  {
        if (ChangeDetector.isArray(a) && ChangeDetector.isArray(b)) {
            return ChangeDetector.arrayChanged(a as any[], b as any[]);
        }

        if (ChangeDetector.isObject(a) && ChangeDetector.isObject(b)) {
            return ChangeDetector.objChanged(a as object, b as object);
        }

        return false;   
    }

}


