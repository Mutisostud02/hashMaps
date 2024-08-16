function HashMap() {
    let arr = new Array(16);
    let loadFactor = 0.75;
    let entryNumber = 0;
    function loadExceeded() {
            return entryNumber >= arr.length * loadFactor;
    }
    function resize() {
        let oldArr  = arr;
        arr = new Array(oldArr.length * 2);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = [];
        }
        entryNumber = 0;
        for (let i = 0; i < oldArr.length; i++) {
            if(oldArr[i] !== undefined) {
            for (let j = 0; j < oldArr[i].length; j++) {
                    set(oldArr[i][j][0], oldArr[i][j][1]);
        }
    }
    }
    
    }
    function hash(key) {
        let hashCode = 5381;
        let c = 0.049;
        for (let i = 0; i < key.length; i++) {
            hashCode = (hashCode * 31 + key.charCodeAt(i)) % arr.length;
        }
        return hashCode;
    }
    function set(key, value) {
        if (loadExceeded()) {
            resize();
        }
        let index = hash(key);
        if(!arr[index]) {
            arr[index] = [];
        }  

        for(let i = 0; i < arr[index].length; i++) {
            if (arr[index][i][0] === key) {
                arr[index][i][1] = value;
                return true;
            }
        }
        if (arr[index].length > 0) {
            console.log(`Possible collisions detected at index ${index}`);
            console.log(`Current bucket state: ${arr[index]}`)
            return;
        }
        arr[index].push([key, value]);
        console.log(arr)
        entryNumber++;
        return true;
    }
    function get(key) {
        let index = hash(key);
        if (arr[index] === undefined) {
            return null;
        }
        for(let i = 0; i < arr[index].length; i++) {
            if (arr[index][i][0] === key) {
                return arr[index][i][1];
            }
        }
        return null;
    }
    function has(key) {
        let index = hash(key);
        if (arr[index] === undefined) {
            return false;
        }
        for(let i = 0; i < arr[index].length; i++) {
            if (arr[index][i][0] === key) {
                return true;
            }
        }
        return false;
    }
    function remove(key) {
        let index = hash(key);
        if (arr[index] === undefined) {
            return false;
        }
        for(let i = 0; i < arr[index].length; i++) {
            if (arr[index][i][0] === key) {
                arr[index].splice(i, 1);
                return true;
            }
        }
        return false;
    }
    function length() {
        let total = 0;
        for (let i = 0; i < arr.length; i++) {
                if(arr[i] !== undefined) {
                    total++;
                }
    }
    return total;
    }
    function clear() {
        for (let i = 0; i < arr.length; i++) {
                if(arr[i] !== undefined) {
                    arr[i].length = 0;                    
                }
    }
    entryNumber = 0;
    return false;
    }
    function keys() {
        let keyArr = [];
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] !== undefined && arr[i][0] !== undefined) {
                keyArr.push(arr[i][0][0]);                    
            }
        }
        return keyArr;

    }
    function values() {
        let keyArr = [];
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] !== undefined && arr[i][0] !== undefined) {
                keyArr.push(arr[i][0][1]);                    
            }
        }
        return keyArr;

    }
    function entries() {
        let keyArr = keys();
        let valArr = values();
        let results = [];
        for (let i = 0; i < keyArr.length; i++) {
            for (let j = 0; j < valArr.length; j++) {
                if (i === j) {
                    results.push([keyArr[i], valArr[j]]);
                }
            }
        }
        return results;
    }

    return {hash, set, get, has, remove, length, clear, keys, values, entries, arr};
}
const test = HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
console.log(test.arr);