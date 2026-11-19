var location_path = window.location.pathname;
var terminal_path = document.getElementById('terminal_a').getAttribute("href");
var odu_path = document.getElementById('odu_a').getAttribute("href");
var network_path = document.getElementById('network_a').getAttribute("href");
var diagnostics_path = document.getElementById('diagnostics_a').getAttribute("href");
if (location_path == terminal_path)
{
	document.getElementById('terminal').className = "active";
	var sysinfo_path = document.getElementById('sysinfo_a').getAttribute("href");
	var rxinfo_path = document.getElementById('rxinfo_a').getAttribute("href");
	var txinfo_path = document.getElementById('txinfo_a').getAttribute("href");
	var chipinfo_path = document.getElementById('chipinfo_a').getAttribute("href");
	alert(location_path);
	alert(1);				
	if(location_path == sysinfo_path)
	{
		document.getElementById('sysinfo').className = "active";
		var sysload_path = document.getElementById('sysload_a').getAttribute("href");
		var syslan_path = document.getElementById('syslan_a').getAttribute("href");
		var syswan_path = document.getElementById('syswan_a').getAttribute("href");
		alert(location_path);
		alert(2);		
		switch (location_path)
		{
			case sysload_path:
			{
				document.getElementById('sysload').className = "active";	
			}
			break;
			case syslan_path:
			{
				document.getElementById('syslan').className = "active";	
			}
			break;
			case syswan_path:
			{
				document.getElementById('syswan').className = "active";	
			}
			break;			
		}	
	}
}





