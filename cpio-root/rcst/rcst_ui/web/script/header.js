var header = "";
header += "<h1 id='logo'><a href='/root/home.htm'><span id='logoo'></span></a></h1>";

header += "<div id='nav'>";
header += "<ul>";
header += "<li id='terminal'><a href='/root/terminal/sysload.htm' id='terminal_a'><span  id='terminal_b'></span></a></li>";
header += "<li id='odu'><a href='/root/odu/odu.htm' id='odu_a'><span  id='odu_b'></span></a></li>";
header += "<li id='network'><a href='/root/network/lan.htm' id='network_a'><span  id='network_b'></span></a></li>";
header += "<li id='diagnostics'><a href='/root/diagnostics/status.htm' id='diagnostics_a'><span   id='diagnostics_b'></span></a></li>";
header += "<li><a href='/root/guide/install-set1.htm' id='installation_b'></a></li>";
header += "</ul>";
header += "</div>";

header += "<div id='userbar'>";
header += "<span class='WorkMode'></span ><span class='mode' id='termode'></span>";
header += "<span class='line'>|</span>";
header += "<a href='/action/logout' id='quit'></a>";
header += "<span class='line'>|</span>";
header += "<a   href='/root/upgrade/packages.htm' id='upgrade'></a>";
header += "<span class='line'>|</span>";
header += "<a href='/root/upload/upload_login.htm' id='upload'></a>";
header += "<span class='line'>|</span>";
header += "<select name='language_three' id = 'language_three' style = 'cursor: pointer'    onChange = 'langset()' > ";
header += " <option value='en'>English</option>";
header += " <option value='zh'>简体中文</option>";
header += " <option value='zh_HK'>繁體中文</option>";
header += "</select>";
header += "</div>";

$('#header').html(header);
