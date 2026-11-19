document.getElementById('diagnostics').className = "active";
var  location_path = window.location.pathname;
if (location_path.match("status"))
{
	document.getElementById('status').className = "active";	
}
else if (location_path.match("net"))
{
	document.getElementById('net').className = "active";	
}
else if (location_path.match("rf"))
{
	document.getElementById('rf').className = "active";	
}
else if (location_path.match("acu"))
{
	document.getElementById('acu').className = "active";	
}
else if (location_path.match("process"))
{
	document.getElementById('process').className = "active";	
}
else if (location_path.match("syslog"))
{
	document.getElementById('log').className = "active";
	document.getElementById('syslog').className = "active";
}
else if (location_path.match("oplog"))
{
	document.getElementById('log').className = "active";
	document.getElementById('oplog').className = "active";
}
else if (location_path.match("alarmlog"))
{
	document.getElementById('log').className = "active";
	document.getElementById('alarmlog').className = "active";
}
	/*
	case document.getElementById('oplog_a').getAttribute("href"):
	{
		document.getElementById('log').className = "active";
		document.getElementById('oplog').className = "active";	
	}
	break;				
	*/

