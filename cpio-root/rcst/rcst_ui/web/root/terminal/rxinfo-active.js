document.getElementById('terminal').className = "active";
document.getElementById('rxinfo').className = "active";
var  location_path = window.location.pathname;
switch (location_path)
{
	case document.getElementById('rxsnr_a').getAttribute("href"):
	{
		document.getElementById('rxsnr').className = "active";	
	}
	break;
	case document.getElementById('rxss_a').getAttribute("href"):
	{
		document.getElementById('rxss').className = "active";	
	}
	break;
	case document.getElementById('rxber_a').getAttribute("href"):
	{
		document.getElementById('rxber').className = "active";	
	}
	break;			
}
