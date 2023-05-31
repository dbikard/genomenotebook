
var x_size = x_range.end - x_range.start;

// show the sequence when zoomed in enough
var letterSpace = 9.6*x_size;
if (letterSpace < div.width && x_range.end>x_range.start) { 
    /*for some weird reasons after a search sometimes x_range.end is smaller than x_range.start 
    which causes unwanted behaviour*/

    var seq = sequence.seq.substring(Math.floor(x_range.start)-sequence.bounds[0], Math.floor(x_range.end)-sequence.bounds[0]);
    
    var spaceBetweenBases=div.width/x_size;
    
    // Loop through each character in the sequence
    div.text=""
    for (let i = 0; i < seq.length; i++) {
        div.text+='<span style="width:' + spaceBetweenBases + 'px; display: inline-block; overflow: hidden">'+seq[i]+'</span>'
    }

    var start_floatingPart = x_range.start % 1;
    var end_floatingPart = x_range.end % 1;
    
    var pad_left=parseInt(spaceBetweenBases*(1-start_floatingPart));
    div.styles.padding_left = pad_left+"px";
} else {
    div.text="";
    
}

//div.change.emit()


function updateGlyphs() {
    console.log("glyph update")
    const max_glyph_loading_range=loaded_range.data['range'][0]
    const ix_start_find = all_glyphs['xs'].findIndex((element) => Math.max(...element) > x_range.start - max_glyph_loading_range);
    const ix_stop_find = all_glyphs['xs'].findIndex((element) => Math.min(...element) > x_range.end + max_glyph_loading_range);
    const last_ix = all_glyphs['xs'].length - 1;
    const ix_start = ix_start_find === -1 ? 0 : ix_start_find; // takes the first element if element not found
    const ix_stop = ix_stop_find === -1 ? last_ix : ix_stop_find; // takes the last element if element not found

    //Select the glyph elements in the 20kb range of the searched gene
    for (let attr in all_glyphs) {
        glyph_source.data[attr] = all_glyphs[attr].slice(ix_start, ix_stop + 1);
    }
    
    loaded_range.data['start'][0] = all_glyphs['xs'][ix_start][0];
    loaded_range.data['end'][0] = all_glyphs['xs'][ix_stop][3];
    //console.log(ix_start,ix_stop,loaded_glyph_source.data['start'],loaded_glyph_source.data['end'],last_ix)
    glyph_source.change.emit()
    loaded_range.change.emit()
}

//If getting close to the edge of loaded glyphs, then reload them on current position
if (x_range.start<loaded_range.data.start[0]+2000 || x_range.end>loaded_range.data.end[0]-2000){
    updateGlyphs()
}

//Old implementation that didn't work for all browsers
    //let letter_spacing = (div.width-letterSpace)/x_size;
    //div.styles.letter_spacing = letter_spacing + "px";
    
    //This didn't work in all browsers
    //var whitespace='&nbsp;'.repeat(parseInt(div.width/4)); //adds a line of whitespace to force the justification before the line return
    //div.text = seq + ' <span style="white-space: nowrap">'+whitespace+'</span>'; // this enforces the inter-character text-justify on a single line

    //var pad_right=parseInt(spaceBetweenBases*end_floatingPart);
    //div.styles.padding_right = pad_right+"px";