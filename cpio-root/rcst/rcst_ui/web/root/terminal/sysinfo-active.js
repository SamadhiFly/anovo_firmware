document.getElementById('terminal').className = "active";
document.getElementById('sysinfo').className = "active";
var  location_path = window.location.pathname;
switch (location_path)
{
	case document.getElementById('sysload_a').getAttribute("href"):
	{
		document.getElementById('sysload').className = "active";	
	}
	break;
	case document.getElementById('syslan_a').getAttribute("href"):
	{
		document.getElementById('syslan').className = "active";	
	}
	break;
	case document.getElementById('syswan_a').getAttribute("href"):
	{
		document.getElementById('syswan').className = "active";	
	}
	break;			
}
