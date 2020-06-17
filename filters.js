export function hasHandwritten(el){
    var res = false;
    el.predictions.forEach(item => {
        if(item.label == "Handwritten"){
            res = true;
        }
    });
    return res;
}