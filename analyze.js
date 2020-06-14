import path from "path";
import getJSON from "./parser";
import { hasHandwritten } from "./filters";

var data = getJSON(path.join(__dirname + "/NewData.json"));
var keys = Object.keys(data);
for(var key in keys){
    data[keys[key]]=JSON.parse(data[keys[key]]);
}
var call1Data = data["call30"].result;
console.log(call1Data);
var result = call1Data.filter(hasHandwritten);

console.log("total cards in call1:", call1Data.length);
console.log("handwritten cards in first call:", result.length);

var count = 0;
var icount = 0;
Object.keys(data).forEach((key) => {
  count += data[key].result.length;
  data[key].result.forEach((ele) => {
    ele.prediction.forEach((pt) => {
      if (pt.label == "Index") {
        icount += 1;
      }
    });
  });
});

console.log("total card count:", count);
console.log(
  "total index references: ",
  icount,
  "avg index references: ",
  icount / count
);
