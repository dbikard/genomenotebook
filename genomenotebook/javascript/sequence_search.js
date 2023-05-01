function getReverseComplement(seq) {
    let complement = {
      "A": "T",
      "C": "G",
      "G": "C",
      "T": "A"
    };
    let reverseComplement = "";
    for (let i = seq.length - 1; i >= 0; i--) {
      reverseComplement += complement[seq[i]];
    }
    return reverseComplement;
}

div.text="";
let searchString = cb_obj.value.toUpperCase();
let isDnaSequence = /^[ACGT]{6,}$/i.test(searchString);
let pos = null;

if (isDnaSequence) {
    console.log("Searching for DNA sequence.");
    //searchString = searchString;
    let searchStart = x_range.start-sequence.bounds[0];
    let seq = sequence.seq.substring(searchStart);
    let startPos = seq.indexOf(searchString) + searchStart + sequence.bounds[0];


    if (startPos === -1) {
    // Search the reverse complement of the search string
    let reverseComplement = getReverseComplement(searchString);
    let reverseStartPos = seq.indexOf(reverseComplement) + searchStart + sequence.bounds[0];

    if (reverseStartPos === -1) {
        // Substring not found in either forward or reverse complement
        console.log("Substring not found.");
        return;
    } else {
        // Found in reverse complement
        startPos = reverseStartPos;
    }
    }

    let endPos = startPos + searchString.length;
    pos = (startPos + endPos) / 2;

    //div.text += searchString + pos;
    x_range.start = pos - 14;
    x_range.end = pos + 14;
    search_span_source.data['x'] = [pos];
    search_span_source.data['width'] = [endPos - startPos];
    search_span_source.change.emit();

    //Select the glyph elements in the 20kb range of the searched gene
    const x_start = pos - 20000
    const x_end = pos + 20000

    //find the index of element 20kb away
    const ix_start = all_glyphs['xs'].findIndex((element) => element[0] > x_start);
    const ix_stop = all_glyphs['xs'].findIndex((element) => element[0] > x_end);

    for (let attr in all_glyphs) {
    glyph_source.data[attr] = all_glyphs[attr].slice(ix_start, ix_stop);
    }

    glyph_source.change.emit()
    x_range.change.emit()
} 

