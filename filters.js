export function hasHandwritten(el){
    var res = false;
    el.prediction.forEach(item => {
        if(item.label == "Handwritten"){
            res = true;
        }
    });
    return res;
}