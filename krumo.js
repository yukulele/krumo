/**
* JavaScript routines for Krumo
*
* @version $Id: krumo.js 22 2007-12-02 07:38:18Z Mrasnika $
* @link http://sourceforge.net/projects/krumo


/////////////////////////////////////////////////////////////////////////////

/**
* Krumo JS Class
*/
function krumo() {
	}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 

/**
* Add a CSS class to an HTML element
*
* @param HtmlElement el 
* @param string className 
* @return void
*/
krumo.reclass = function(el, className) {
	if (el.className.indexOf(className) < 0) {
		el.className += (' ' + className);
		}
	}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 

/**
* Remove a CSS class to an HTML element
*
* @param HtmlElement el 
* @param string className 
* @return void
*/
krumo.unclass = function(el, className) {
	if (el.className.indexOf(className) > -1) {
		el.className = el.className.replace(className, '');
		}
	}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 

/**
* Toggle the nodes connected to an HTML element
*
* @param HtmlElement el 
* @return void
*/
krumo.toggle = function(el,event,force) {
	if(event && event.ctrlKey)
		return krumo.toggleAll(el);

	var sibl = el.parentNode.children;
	var isNest = /\bkrumo-nest\b/;
	var i = 0;
	do{
		var nest = sibl[i++];
		if(!nest)
			return;
	}while(!isNest.test(nest.className));
	
	if(typeof force === "undefined")
		force = nest.style.display == 'none';

	// toggle class
	//
	if (force) {
		nest.style.display = 'block';
		krumo.reclass(el, 'krumo-opened');
	} else {
		nest.style.display = 'none';
		krumo.unclass(el, 'krumo-opened');
	}
}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
/**
* Toggle the nodes and all this children connected to an HTML element
*
* @param HtmlElement el 
* @return void
*/
krumo.toggleAll = function(el) {
	var divs = el.parentNode.getElementsByTagName("div");
	var isNest = /\bkrumo-nest\b/;
	var nests = [];
	var i = 0;
	var div;
	do{
		div = divs[i++];
		if(!div)
			break;
		if(isNest.test(div.className))
			nests.push(div);
	}while(true);
	force = nests[0].style.display == 'none';
	for(i in nests){
		krumo.toggle(nests[i],null,force);
	}
	
}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 

/**
* Hover over an HTML element
*
* @param HtmlElement el 
* @return void
*/
krumo.over = function(el) {
	krumo.reclass(el, 'krumo-hover');
	}

// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 

/**
* Hover out an HTML element
*
* @param HtmlElement el 
* @return void
*/

krumo.out = function(el) {
	krumo.unclass(el, 'krumo-hover');
	}
	
/////////////////////////////////////////////////////////////////////////////
