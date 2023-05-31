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

div.text="";
let searchString = cb_obj.value.toUpperCase();
let isDnaSequence = /^[ACGT]{4,}$/i.test(searchString);
let pos = null;

if (isDnaSequence) {
    //console.log("Searching for DNA sequence.");
    //searchString = searchString;
    var positions = findSequence(sequence.seq,searchString)
    //console.log(positions)
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
  } 

