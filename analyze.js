import path from "path";
import getJSON from "./parser";
import {hasHandwritten} from "./filters";


var data = getJSON(path.join(__dirname + "/data.json"));
var call1Data = data["call1"].result;

var result = call1Data.filter(hasHandwritten);
console.log("total cards in call1:",call1Data.length);
console.log("handwritten cards in first call:", result.length);

var count = 0;
Object.keys(data).forEach(key=> {
    count += data[key].result.length;
})

console.log("total card count:",count);