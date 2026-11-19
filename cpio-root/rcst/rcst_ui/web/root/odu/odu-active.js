document.getElementById('odu').className = "active";
var  location_path = window.location.pathname;
if (location_path.match("odu/odu"))
{
	document.getElementById('rf').className = "active";	
}
else if (location_path.match("satellite"))
{
	document.getElementById('satellite').className = "active";	
}
else if (location_path.match("antenna"))
{
	document.getElementById('antenna').className = "active";	
}
else if (location_path.match("beam"))
{
	document.getElementById('beam').className = "active";	
}

