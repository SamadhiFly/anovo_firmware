document.getElementById('diagnostics').className = "active";
document.getElementById('mesh_status').className = "active";
var  location_path = window.location.pathname;
switch (location_path)
{
	case document.getElementById('FLstatus_a').getAttribute("href"):
	{
		document.getElementById('FLstatus').className = "active";	
	}
	break;
	case document.getElementById('RLstatus_a').getAttribute("href"):
	{
		document.getElementById('RLstatus').className = "active";	
	}
	break;
}
