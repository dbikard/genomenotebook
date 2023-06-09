function updateGlyphs() {
    //console.log("glyph update")
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
    glyph_source.change.emit();
    loaded_range.change.emit();
}

//If getting close to the edge of loaded glyphs, then reload them on current position
if (x_range.start<loaded_range.data.start[0]+2000 || x_range.end>loaded_range.data.end[0]-2000){
    updateGlyphs();
}