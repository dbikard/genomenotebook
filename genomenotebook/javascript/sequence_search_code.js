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

function findSequence(seq, searchString) {
  var positions = {
    left: [],
    right: [],
    width: [],
    pos:[],
    orientation:[],
  };
  
  // Forward orientation
  var index = seq.indexOf(searchString);
  while (index !== -1) {
    var left = index;
    var right = index + searchString.length;
    positions.left.push(left);
    positions.right.push(right);
    positions.width.push(searchString.length);
    positions.pos.push((left+right)/2);
    positions.orientation.push("+");
    index = seq.indexOf(searchString, index + 1);
  }

  // Reverse complement orientation
  var revSearchString = getReverseComplement(searchString);
  var reverseIndex = seq.indexOf(revSearchString);
  while (reverseIndex !== -1) {
    var left_rev = reverseIndex;
    var right_rev = reverseIndex + searchString.length;

    positions.left.push(left_rev);
    positions.right.push(right_rev);
    positions.width.push(searchString.length);
    positions.pos.push((left_rev+right_rev)/2);
    positions.orientation.push("-");

    reverseIndex = seq.indexOf(revSearchString, reverseIndex + 1);
  }

  return positions;
}


let searchString = cb_obj.value.toUpperCase();
let isDnaSequence = /^[ACGT]{4,}$/i.test(searchString);

if (isDnaSequence) {
    //console.log("Searching for DNA sequence.");
    //searchString = searchString;
    var positions = findSequence(sequence.seq,searchString);
    //console.log(positions)

    // sorting by order in the sequence so that the next button works as expected
    // Get the indices to maintain the association between the left and right arrays
    const indices = positions.left.map((_, index) => index);

    // Sort the indices based on the values in the right array
    indices.sort((a, b) => positions.left[a] - positions.left[b]);

    // Sort the arrays based on the sorted indices
    positions.left = indices.map((index) => positions.left[index]);
    positions.right = indices.map((index) => positions.right[index]);
    positions.pos = indices.map((index) => positions.pos[index]);
    positions.orientation = indices.map((index) => positions.orientation[index]);

    //console.log(positions);

    search_span_source.data['x'] = positions.pos.map(v => v+0.5);
    search_span_source.data['width'] = positions.width;
    search_span_source.data['fill_color'] = positions.orientation.map(function(item) {
                                                                      if (item === "+") {
                                                                        return "green";
                                                                      } else if (item === "-") {
                                                                        return "red";
                                                                      } else {
                                                                        return item;
                                                                      }
                                                                    });
                                                                    
    search_span_source.change.emit();
    
    // change the x_range to display the first hit starting from the current view and looping back from the begnining
    if (search_span_source.data.x.length > 0) {
      // first search from current position
      var x = search_span_source.data.x.find(function(item) {return item > x_range.start});
      if (typeof pos==="undefined") { // if not found search from begining
        x = search_span_source.data.x[0];
      }
      //console.log(pos)
      if (typeof x!=="undefined"){
          var w = (x_range.end - x_range.start)/2;
          //Define new field of view
          x_range.start = (x - w < bounds[0]) ? bounds[0] : x - w;
          x_range.end = (x + w > bounds[1]) ? bounds[1] : x + w;
      }
  }
} 