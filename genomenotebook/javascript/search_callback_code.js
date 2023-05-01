
let searchString = cb_obj.value.toUpperCase();
let pos = null;

//looking for the position of a gene
let ix = all_glyphs['names'].findIndex((element) => element.toUpperCase().includes(searchString));
let g = all_glyphs['names'].find((element) => element.toUpperCase().includes(searchString));
pos = all_glyphs['xs'][ix][0];

//Define new field of view
x_range.start = (pos - 5000 < bounds[0]) ? bounds[0] : pos - 5000;
x_range.end = (pos + 5000 > bounds[1]) ? bounds[1] : pos + 5000;
x_range.change.emit()

//find the index of element 20kb away
const max_glyph_loading_range=loaded_range.data['range'][0]
const ix_start_find = all_glyphs['xs'].findIndex((element) => element[3] > x_range.start - max_glyph_loading_range);
const ix_stop_find = all_glyphs['xs'].findIndex((element) => element[0] > x_range.end + max_glyph_loading_range);
const last_ix = all_glyphs['xs'].length - 1;
const ix_start = ix_start_find === -1 ? 0 : ix_start_find; // takes the first element if element not found
const ix_stop = ix_stop_find === -1 ? last_ix : ix_stop_find; // takes the last element if element not found

//Select the glyph elements in the 20kb range of the searched gene
for (let attr in all_glyphs) {
  glyph_source.data[attr] = all_glyphs[attr].slice(ix_start, ix_stop + 1);
}
glyph_source.change.emit()

loaded_range.data.start[0] = all_glyphs['xs'][ix_start][0];
loaded_range.data.end[0] = all_glyphs['xs'][ix_stop][3];
loaded_range.change.emit()
div.text="";