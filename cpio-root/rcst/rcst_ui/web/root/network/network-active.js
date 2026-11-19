document.getElementById('network').className = "active";
var  location_path = window.location.pathname;
if (location_path.match("lan"))
{
	document.getElementById('network_lan_wan').className = "active";	
}
else if (location_path.match("wan"))
{
	document.getElementById('wan').className = "active";	
}
else if (location_path.match("proset"))
{
	document.getElementById('proset').className = "active";	
}
else if (location_path.match("prosetvrf"))
{
	document.getElementById('proset').className = "active";	
}
else if (location_path.match("arp"))
{
	document.getElementById('arp').className = "active";	
}



