document.getElementById('terminal').className = "active";
document.getElementById('chipinfo').className = "active";
var  location_path = window.location.pathname;
switch (location_path)
{
	case document.getElementById('chippower_a').getAttribute("href"):
	{
		document.getElementById('chippower').className = "active";	
	}
	break;
	//~ case document.getElementById('chipvol_a').getAttribute("href"):
	//~ {
		//~ document.getElementById('chipvol').className = "active";	
	//~ }
	//~ break;
	case document.getElementById('chiptemp_a').getAttribute("href"):
	{
		document.getElementById('chiptemp').className = "active";	
	}
	break;			
}
