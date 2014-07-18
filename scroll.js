var cellHeight;
var numCells = 15;
var scrollSpeed = 15;
var numEntries = 3000;

function generateData () {
	// filling the data array
	var data = [numEntries];
	for (var i = 0; i < numEntries; i++) {
		data[i] = i + 1;	
	}
	data[41] = "TRUTH";
	return data;
};

// cell container gets repositioned when scrolling by the amount of scrollSpeed
function setPos(speed) {	
	var topPos = $('#cell-container').position().top + speed;
    $('#cell-container').css({top: topPos, position: 'absolute'});
}

// the data index gets looped so that the index always points to a valid entry in the data-array
function loopIndex() {
	if (dataIndex < 0) dataIndex += numEntries;
	if (dataIndex >= numEntries) dataIndex -= numEntries;
}

$(window).bind('mousewheel DOMMouseScroll', function(event){
    if (event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0) {
    	setPos(scrollSpeed);
    }
    else {
        setPos(-scrollSpeed);
    }

    var cellPos = $('.cell:first').offset().top;
    
    // SCROLL DOWN
	if (cellPos < -cellHeight) {
		// to avoid that the cell container scrolls away margin-top has to be adjusted in the same amount of the position
		// both values have to even each other out
		marginTop = parseInt($('#cell-container').css('margin-top'));
		marginTop += cellHeight;
		$('#cell-container').css('margin-top', marginTop + 'px');
		// the first cell gets detached, its index and content gets updated and finally appended to the end of the cell container
		// for scrolling up this is reversed
		cell = $('.cell:first').detach();
		dataIndex = parseInt(cell.attr('dataindex')) + numCells;
		loopIndex();
		cell.attr('dataindex', dataIndex);
		cell.text(data[dataIndex])
		cell.appendTo('#cell-container');
	}

	// SCROLL UP
	if (cellPos > 0) {
		marginTop = parseInt($('#cell-container').css('margin-top'));
		marginTop -= cellHeight - 20; // dirty magic number to adjust cell margin ;)
		$('#cell-container').css('margin-top', marginTop + 'px');

		cell = $('.cell:last').detach();
		dataIndex = parseInt(cell.attr('dataindex')) - numCells;
		loopIndex();
		cell.attr('dataindex', dataIndex);
		cell.text(data[dataIndex])
		cell.prependTo('#cell-container');
	}
});

$(function() {
	data = generateData();
	// setup the cell container
    for (var i = 0; i < numCells; i++) {
    	$('#cell-container').append('<div class="cell" dataindex="' + i + '">' + data[i] + '</div>');
    }
	cellHeight = $('.cell').outerHeight();
});