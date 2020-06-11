import path from "path";
import getJSON from "./parser";
import {hasHandwritten} from "./filters";


var data = getJSON(path.join(__dirname + "/data.json"));
var call1Data = data["call1"].result;

var result = call1Data.filter(hasHandwritten);

console.log (result.length);
