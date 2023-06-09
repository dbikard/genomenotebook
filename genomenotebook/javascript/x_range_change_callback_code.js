
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


//Old implementation that didn't work for all browsers
    //let letter_spacing = (div.width-letterSpace)/x_size;
    //div.styles.letter_spacing = letter_spacing + "px";
    
    //This didn't work in all browsers
    //var whitespace='&nbsp;'.repeat(parseInt(div.width/4)); //adds a line of whitespace to force the justification before the line return
    //div.text = seq + ' <span style="white-space: nowrap">'+whitespace+'</span>'; // this enforces the inter-character text-justify on a single line

    //var pad_right=parseInt(spaceBetweenBases*end_floatingPart);
    //div.styles.padding_right = pad_right+"px";