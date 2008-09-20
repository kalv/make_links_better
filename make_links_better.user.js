// Make Links Better user script
// version 0.1 BETA!
// 2008-09-20
// Copyright (c) 2008, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Make Icons Better", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Make Links Better
// @namespace     http://www.kalv.co.uk/
// @description   Script to enlarge small links to make it easier to read
// @include       *
// ==/UserScript==

function processLinks() {
	links = getAllLinks();
	addLinkHovers(links);
	GM_log("Added Link Hovers");
}

function addBox(el) {
	// get x,y co-ordinates
	XX = getXY(el);
	
	// draw a new box overlay in position
	var newDiv = document.createElement('div');
	newDiv.style.fontSize = '22px';
	newDiv.style.position = "absolute";
	// need to determine the middle for better positioning?
	newDiv.style.top = (XX.y-el.offsetHeight-5) + 'px';
	newDiv.style.left = (XX.x-5) + 'px';
	newDiv.style.border = "1px solid #000000";
	newDiv.style.padding = '5px';
	newDiv.style.background = "#ffffff";
	newDiv.zindex = '99';
	newDiv.addEventListener('mouseout',function(event) {
		this.parentNode.removeChild(this);
	},true);
	
	// copy link element into box with new size
	//newDiv.innerHTML = el.innerHTML;
	var newLink  = el.cloneNode(true);
	newLink.style.fontSize = '22px';
	
	newDiv.appendChild(newLink);
	el.parentNode.appendChild(newDiv);
}

function addLinkHovers(elements) {
	for (var x=0; x < elements.length; x++) {
		var el = elements[x];
		var oldSize = getStyle(el,"font-size");
		elements[x].addEventListener('mouseover', function(event) {
			this.style.fontSize = '20px';
			//addBox(this);
			
		},true);
		elements[x].addEventListener('mouseout', function(event) {
			this.style.fontSize = oldSize;
		},true);
	}
}

function getStyle(el,styleProp)
{
	if (el.currentStyle)
		var y = el.currentStyle[styleProp];
	else if (window.getComputedStyle)
		var y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
	return y;
}

function getFontSize(el) {
	fontSize = getStyle(el,"font-size");
	return fontSize.replace("px","");
}

function getAllLinks() {
	elements = document.getElementsByTagName('a');
	
	// determin whether these are links that need to be processed
	var returnElements = new Array();
	for (var x=0; x <elements.length;x++) {
		// check the font size
		var fontSize = getFontSize(elements[x]);
		if (fontSize && fontSize < 18) {
			returnElements.push(elements[x]);
		}
		// if no font size could be found use the screen space
		// else if (elements[x].offsetHeight < 50) {
		// 	returnElements.push(elements[x]);
		// }
	}
	
	return returnElements;
}

function getXY(obj)
{
  var curleft = 0;
  var curtop = obj.offsetHeight + 5;
  var border;
  if (obj.offsetParent)
  {
    do
    {
      // XXX: If the element is position: relative we have to add borderWidth
      if (getStyle(obj, 'position') == 'relative')
      {
        if (border = getStyle(obj, 'border-top-width')) curtop += parseInt(border);
        if (border = getStyle(obj, 'border-left-width')) curleft += parseInt(border);
      }
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    }
    while (obj = obj.offsetParent)
  }
  else if (obj.x)
  {
    curleft += obj.x;
    curtop += obj.y;
  }
  return {'x': curleft, 'y': curtop};
}

function getXYold(e)
	{
		var x,y;
		e = e || window.event;
		if (navigator.appName.indexOf('Microsoft') != -1)
		{
			var parent = e.srcElement;
			x=e.clientX + document.body.scrollLeft;
			y=e.clientY + document.body.scrollTop;
		}
		else
		{
			x =e.offsetLeft
			y= e.offsetTop
		}
		var XY = new Object();
		XY.x = x;
		XY.y = y;
		return XY;
	}

//window.addEventListener("load", function() { processLinks(); }, false);

processLinks();

/* Notes

	Current Issues:
	- Wrapping of content, when link is enlarged and at the end of a paragraph it pushes it to a new line
	which then calls the mouseout event, bad loop of rendering bad stuff
*/