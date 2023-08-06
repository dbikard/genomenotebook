if (search_span_source.data.x.length > 0) {
    var pos = search_span_source.data.x.find(function(item) {return item > x_range.end});
    if (typeof pos==="undefined") { // if not found search from begining
        pos = search_span_source.data.x[0];
    }
    if (typeof pos!=="undefined"){
        var w = (x_range.end - x_range.start)/2;
        //Define new field of view
        x_range.start = (pos - w < bounds[0]) ? bounds[0] : pos - w;
        x_range.end = (pos + w > bounds[1]) ? bounds[1] : pos + w;
    }
}
    


