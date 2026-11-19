local fs = require "nixio.fs"
local LuciUci = require "luci.model.uci"
local LuciUtil = require "luci.util"
local uciCursor = LuciUci.cursor()
local result = {}
local routes = {}
local rt = {}
local sum=""
local lanip = uciCursor:get("network", "lan", "ipaddr")
local status=tonumber(luci.util.exec("uci get switch_redirect.redirect_set.switch"))
local redirect_proto,inside_ip,start_port,end_port,sp,discribe,i,j,sname,changeip,inside_ipspilt,newip,vlan
if fs.access("/etc/config/firewall") then
	for line in io.lines("/etc/config/firewall") do
		local class =  line:match(
			"(redirect)" 
		)
		if class then	 
			sname =  LuciUtil.split(line, "'")
			if sname[2] then
				inside_ip= uciCursor:get("firewall", sname[2], "dest_ip")
				changeip =  LuciUtil.split(lanip, ".")
				inside_ipspilt = LuciUtil.split(inside_ip, ".")
				for i=1,3 do
					inside_ipspilt[i] = changeip[i] 
				end
				newip =tostring( inside_ipspilt[1].."."..inside_ipspilt[2].."."..inside_ipspilt[3].."."..inside_ipspilt[4])
				inside_port = tostring(uciCursor:get("firewall", sname[2], "dest_port"))
				sp = LuciUtil.split(inside_port, "-")	
				rt = {
					redirect_proto = tostring( uciCursor:get("firewall", sname[2], "proto")),
					discribe= tostring( uciCursor:get("firewall", sname[2], "name")),  
					inside_ip= newip,
					start_port=sp[1],
					end_port= sp[2]
				}		   		           			   		          		       
				routes[#routes+1] = rt
				uciCursor:set("firewall", sname[2], "dest_ip", newip)--?
			end
		end
	end
end
if #routes > 0 then
	for j=1,(#routes-1) do
	sum = sum.."{"..'"'.."redirect_proto"..'"'..":"..'"'..routes[j].redirect_proto..'"'..","
			..'"'.."inside_ip"..'"'..":"..'"'..routes[j].inside_ip..'"'..","
			..'"'.."start_port"..'"'..":"..routes[j].start_port..","
			..'"'.."end_port"..'"'..":"..routes[j].end_port..","
			..'"'.."discribe"..'"'..":"..'"'..routes[j].discribe..'"'.."},"
	end
	sum = sum.."{"..'"'.."redirect_proto"..'"'..":"..'"'..routes[#routes].redirect_proto..'"'..","
			..'"'.."inside_ip"..'"'..":"..'"'..routes[#routes].inside_ip..'"'..","
			..'"'.."start_port"..'"'..":"..routes[#routes].start_port..","
			..'"'.."end_port"..'"'..":"..routes[#routes].end_port..","
			..'"'.."discribe"..'"'..":"..'"'..routes[#routes].discribe..'"'.."}"
	uciCursor:commit("firewall")
	luci.util.exec("/etc/init.d/firewall reload")			
else
	sum = nil
end
print(sum)
