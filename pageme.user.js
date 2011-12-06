// ==UserScript==
// @name           PageME
// @namespace      trimis.com
// @description    Auto Forward and back
// @include        http://*
// ==/UserScript==

document.addEventListener("keypress", ProcessKeyPress, false);

function ProcessKeyPress(e)
{
	if(
		(e.keyCode==39 && e.ctrlKey == true) || 	// CTRL + Right
		(e.keyCode ==34 && e.shiftKey == true)  	// Shift + Page Down
	)
	{
		
		var SearchPatterns = ["^\\s*[nN][eE][xX][tT]",
						"^.*next page",
						"^\\s*›",
						"^\\s*\\&gt;",
						"^\\s*Older Posts",
						"^\\s*»",
						"next.png|next.jpg"]
		Click_Navigation_Link(SearchPatterns);
	}
	
	if(
		(e.keyCode == 37 && e.ctrlKey == true) || 	// CTRL + Left
		(e.keyCode == 33 && e.shiftKey == true) 	// Shift + Page Up	
	)
	{
		var SearchPatterns = ["^\\s*[pP][rR][eE][vV]",
						"^.*previous page",
						"^\\s*[bB][aA][cC][kK]",
						"^\\s*\\&lt;",
						"^\\s*Newer Posts",
						"^\\s*«",
						"previous.png|previous.jpg"] 
		Click_Navigation_Link(SearchPatterns);
	}
}

var debugOutputDiv = null;
function DebugWriteLn(line)
{
	if(debugOutputDiv == null)
	{
		
		debugOutputDiv = document.createElement("div");
		debugOutputDiv.id = "div1";
		debugOutputDiv.setAttribute("align","center");
		debugOutputDiv.style.margin = "0px auto";
		debugOutputDiv.className ="dynamicDiv";
		document.body.appendChild(debugOutputDiv);
		
	}
	debugOutputDiv.innerHtml += line + "<br />";
}

function Click_Navigation_Link( Keys )
{	// Click_Navigation_Link

	var links = document.getElementsByTagName( "a" );
	
	for( var n = 0 ; n < Keys.length ; n++ )
	{	// Step through all Keys

		var thisKey = Keys[ n ];
		var re = new RegExp( thisKey );
		DebugWriteLn("checking key:"+thisKey);

		for( var i = links.length - 1 ; i >= 0 ; i-- ) 
		{	// Step through all Links, backwards
			
			var thisElement = links[ i ];
			if ( CheckElement( re, thisElement ) ) 
			{	// Something on this link matches the key
			
				thisElement.click();
				document.location.href = thisElement.href;
				
			}	// Something on this link matches thekey

		}	// Step through all Keys
		
	}	// Step through all Links, backwards
	
}	// Click_Navigation_Link

function CheckElement(re, thisElement)
{
	if( thisElement )
	{
		if( thisElement.innerHTML )
		{
			DebugWriteLn( "checking innerHTML:" + thisElement.innerHTML );
			if( Search( re, thisElement.innerHTML ) ) 
			{
				return true;
			}
		}
		
		if( thisElement.title )
		{
		
			DebugWriteLn( "checking title:" + thisElement.title );
			if( Search( re, thisElement.title ) ) 
			{
				return true;
			}
		
		}
		
		if( thisElement.alt )
		{	// check the alt of an img tag
		
			DebugWriteLn( "checking alt:" + thisElement.alt );
			if( Search( re, thisElement.alt ) ) 
			{
				return true;
			}
			
		}	// check the alt of an img tag
		
		if( thisElement.src )
		{	// check the src of an img tag
			
			DebugWriteLn( "checking src:" + thisElement.src );
			if( Search( re, thisElement.src ) ) 
			{
				return true;
			}
			
		}	// check the src of an img tag
		
		if( thisElement.childNodes.length > 0 )
		{	// Check Decendants
		
			if( CheckElement( re, thisElement.firstChild ) ) 
			{
				return true;
			}
			
		}	// Check decendants
		
		if( thisElement.childNodes.length > 1)
		{	// Last descendant (google uses this)
		
			if( CheckElement( re, thisElement.lastChild) ) 
			{
				return true;
			}
			
		}	// Last descendant (google uses this)

	}
	return false;
}

function Search( Needle, Haystack )
{
	if( Needle != null && Haystack != null )
	{
		return Needle.test( Haystack );
	}
	return false;
}