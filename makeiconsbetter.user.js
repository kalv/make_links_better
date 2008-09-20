// Make Icons Better user script
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
// @name          Make Icons Better
// @namespace     http://www.kalv.co.uk/makeiconsbetter/
// @description   Script to enlarge small icons to make it easier to read
// @include       *
// ==/UserScript==

window.processIcons = function() {
	aler("processing");
}

window.addEventListener("load", function() { processIcons(); }, false);