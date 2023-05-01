let x_size = x_range.end - x_range.start;
//If getting close to the edge of loaded glyphs, then reload them on current position
if (x_range.start<track_loaded_range.data.start[0]+2000 || x_range.end>track_loaded_range.data.end[0]-2000){
    //console.log("close to edge");
    //find the index of elements 20kb away
    const max_glyph_loading_range=track_loaded_range.data['range'][0];
    const ix_start_find = all_data.data['pos'].findIndex((element) => element > x_range.start - max_glyph_loading_range);
    const ix_stop_find = all_data.data['pos'].findIndex((element) => element > x_range.end + max_glyph_loading_range);
    //console.log(ix_start_find, ix_stop_find);

    const last_ix = all_data.data['pos'].length - 1;
    const ix_start = ix_start_find === -1 ? 0 : ix_start_find; // takes the first element if element not found
    const ix_stop = ix_stop_find === -1 ? last_ix : ix_stop_find; // takes the last element if element not found

    //console.log(ix_start, ix_stop);
    //Select the glyph elements in the 20kb range of the searched gene
    for (let attr in all_data.data) {
        loaded_data.data[attr] = all_data.data[attr].slice(ix_start, ix_stop + 1);
    }
    
    track_loaded_range.data['start'][0] = all_data.data['pos'][ix_start];
    track_loaded_range.data['end'][0] = all_data.data['pos'][ix_stop];
    //console.log(ix_start, all_data.data['pos'][ix_start], ix_stop, all_data.data['pos'][ix_stop], track_loaded_range.data.end[0]);
    loaded_data.change.emit();
    track_loaded_range.change.emit();
    //console.log(loaded_data.data);
}