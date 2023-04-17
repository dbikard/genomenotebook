let x_size = x_range.end - x_range.start;
let letterSpace = 9.6*x_size
if (letterSpace < 600) {
    let seq = sequence.seq.substring(x_range.start-sequence.bounds[0], x_range.end-sequence.bounds[0]);
    let letter_spacing = (600-letterSpace)/x_size;
    div.styles.letter_spacing = letter_spacing + "px";
    //div.style.fontStretch = (Math.min(600/letterSpace,1)*100).floor() + '%';
    
    div.text = seq;

} else {
    div.text="";
}

//If getting close to the edge of loaded glyphs, then reload them on current position
if (x_range.start<loaded_glyph_source.data.start+2000 || x_range.end>loaded_glyph_source.data.end-2000){
    //find the index of elements 20kb away
    const loaded_range=loaded_glyph_source.data['range'][0]
    const ix_start = all_glyphs['xs'].findIndex((element) => element[0] > x_range.start - loaded_range);
    const ix_stop = all_glyphs['xs'].findIndex((element) => element[0] > x_range.end + loaded_range);

    //Select the glyph elements in the 20kb range of the searched gene
    for (let attr in all_glyphs) {
        glyph_source.data[attr] = all_glyphs[attr].slice(ix_start, ix_stop);
    }
    
    loaded_glyph_source.data['start'] = ix_start;
    loaded_glyph_source.data['end'] = ix_stop;
    glyph_source.change.emit()
    loaded_glyph_source.change.emit()
}