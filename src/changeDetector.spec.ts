import { ChangeDetector as cd } from './changeDetector';

describe("ChangeDetector referenceChanged", function () {
    it("should not change for same non-null reference", function () {
        expect(cd.referenceChanged("a", "a")).toBe(false);
    });

    it("should not change for same null reference", function () {
        expect(cd.referenceChanged(null, null)).toBe(false);
    });

    it("should not change for same undefined reference", function () {
        expect(cd.referenceChanged(undefined, undefined)).toBe(false);
    });

    it("should not change for undefined vs null reference", function () {
        expect(cd.referenceChanged(undefined, null)).toBe(true);
        expect(cd.referenceChanged(null, undefined)).toBe(true);
    });
    it("should not change for same array reference", function () {
        let array:any[] = [];
        expect(cd.referenceChanged(array, array)).toBe(false);
    });
    it("should not change for same object reference", function () {
        let obj = {};
        expect(cd.referenceChanged(obj, obj)).toBe(false);
    });
    it("should change for different arrays", function () {
        let array1:any[] = [];
        let array2:any[] = [];
        expect(cd.referenceChanged(array1, array2)).toBe(true);
    });


});

describe("ChangeDetector propertyChanged", function () {
    it("should not change for empty arrays", function () {
        expect(cd.propertyChanged([], [])).toBe(false);
    });
    it("should not change for arrays with same items", function () {
        expect(cd.propertyChanged([1, 2, 3], [1, 2, 3])).toBe(false);
    });
    it("should change for arrays with different items", function () {
        expect(cd.propertyChanged([1, 2, 3], [1, 8, 3])).toBe(true);
    });

    it("should change for arrays with items out of order", function () {
        expect(cd.propertyChanged([1, 2, 3], [1, 3, 2])).toBe(true);
    });
    it("should change for arrays with different number of items", function () {
        expect(cd.propertyChanged([1, 1], [1, 1, 1])).toBe(true);
    });
    it("should not change for empty objects", function () {
        expect(cd.propertyChanged({}, {})).toBe(false);
    });
    it("should not change for objects with same properties", function () {
        expect(cd.propertyChanged({ name: 'test' }, { name: 'test' })).toBe(false);
    });
    it("should  change for objects with extra property", function () {
        expect(cd.propertyChanged({ name: 'test' }, { name: 'test', color: 'blue' })).toBe(true);
    });
    it("should  change for objects with property change", function () {
        expect(cd.propertyChanged({ name: 'test' }, { name: 'test2' })).toBe(true);
    });
    it("should  not change for property names", function () {
        expect(cd.propertyChanged({ name: 'test' }, { 'name': 'test' })).toBe(false);
    });

});


describe("ChangeDetector performance tests", function () {
    it("should perform well when 1 million objects don't change", function () {
        console.log('filling one array 1...');
        var array1:any[] = [];
        for (var i = 0; i < 1000000; ++i) {
            array1.push(i);
        }
        console.log('done.')
        console.log('filling one array 2...');
        var array2:any[] = [];
        for (var i = 0; i < 1000000; ++i) {
            array2.push(i);
        }
        console.log('done.')
        var changed = cd.propertyChanged(array1, array2);
        expect(changed).toBe(false);
        console.log('Changed: ' + changed);
    });

    it("should perform well when last object from 1 million objects changes", function () {
        console.log('filling one array 1...');
        var array1:any[] = [];
        for (var i = 0; i < 1000000; ++i) {
            array1.push(i);
        }
        console.log('done.')
        console.log('filling one array 2...');
        var array2:any[] = [];
        for (var i = 0; i < 1000000; ++i) {
            array2.push(i);
        }
        array2[array2.length - 1] = 0;

        console.log('done.')
        var changed = cd.propertyChanged(array1, array2);
        expect(changed).toBe(true);
        console.log('Changed: ' + changed);
    });
    it ("should perform well for many objects", function() {
        function makeId() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function getObject() {
            return {
                firstName: makeId(),
                lastName: makeId(),
                color: makeId()
            };

        }

        console.log('filling one array 1...');
        var array1:any[] = [];
        for (var i = 0; i < 1000000; ++i) {
            array1.push(getObject());
        }
        console.log('done.')
        console.log('filling one array 2...');
        var array2:any[] = [];
        for (var i = 0; i < 1000000; ++i) {
            array2.push(getObject());
        }
        console.log('done.')

        var t0 = performance.now();
        var changed = cd.propertyChanged(array1, array2);
        expect(changed).toBe(true);
        console.log('Changed: ' + changed);

        var t1 = performance.now();
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

    });


    it ("should perform well for many objects using slice to copy array", function() {
        function makeId() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        }

        function getObject() {
            return {
                firstName: makeId(),
                lastName: makeId(),
                color: makeId()
            };

        }

        console.log('filling one array 1...');
        var array1:any[] = [];
        for (var i = 0; i < 1000000; ++i) {
            array1.push(getObject());
        }
        console.log('done.')
        console.log('filling one array 2...');
        var array2:any[] = array1.slice();
        array2[array2.length-1] = getObject();
        console.log('done.')

        var t0 = performance.now();
        var changed = cd.propertyChanged(array1, array2);
        expect(changed).toBe(true);
        console.log('Changed: ' + changed);

        var t1 = performance.now();
        console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

    });

});