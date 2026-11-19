require "rcst"
require("luci.sys")
require("luci.sys.zoneinfo")
local io     = require "io"
local os     = require "os"
local table  = require "table"
local nixio  = require "nixio"
local fs     = require "nixio.fs"
local uci    = require "luci.model.uci"
local sys	  = require "luci.sys"
luci.ip     = require "luci.ip"
local LuciUci = require "luci.model.uci"
local LuciUtil = require "luci.util"
local uciCursor = LuciUci.cursor()
--~hyong 
function setRoute()
    local uci = require("luci.model.uci").cursor()
    local result = {}
    local interface =luci.http.formvalue( "interface")
    local target =luci.http.formvalue("target")
    local netmask = luci.http.formvalue("netmask")
    local gateway =luci.http.formvalue ("gateway")

	--~ //netmask check
	local netmask_check_ret = netmask_check(netmask)
	result["netmask_check_result"] = netmask_check_ret.netmask_check

	--~ //gateway check
	local getgateway = getlanwanip(interface)
    local retv = getgateway.code
    local gw_ipaddr = getgateway.ipaddr
    local gw_netmask = getgateway.netmask
    
    local gateway_check = gateway_check(gw_ipaddr, gw_netmask, gateway)
	result["gateway_check_result"] = gateway_check.code

    --~ //targetip and netmask check
	local targetip_netmask_check = targetip_netmask_check(target, netmask)
    result["targetip_netmask_result"] = targetip_netmask_check

    --~ //targetip check
    if fs.access("/proc/net/route") then
		for line in io.lines("/proc/net/route") do
			local dev, dst_ip, gateway, flags, refcnt, usecnt, metric,
				  dst_mask, mtu, win, irtt = line:match(
				"([^%s]+)\t([A-F0-9]+)\t([A-F0-9]+)\t([A-F0-9]+)\t" ..
				"(%d+)\t(%d+)\t(%d+)\t([A-F0-9]+)\t(%d+)\t(%d+)\t(%d+)"
			)
			
			if dev then
				dst_ip   = luci.ip.Hex(	dst_ip, 32, luci.ip.FAMILY_INET4 )
				dst_ip	 = dst_ip:string()
				dst_ip	 = iptonl(dst_ip)
				
				if  iptonl(target) == dst_ip then
					result["targetip_check_result"] = "targetip_conflict"
					break;
				else
					result["targetip_check_result"] = "targetip_ok"
				end
			end
		end
	end

    --~ //config router 
    if result["netmask_check_result"] == "netmask_ok" and result["targetip_netmask_result"] == "targetip_netmask_ok" and result["targetip_check_result"] == "targetip_ok" and result["gateway_check_result"] == "gateway_ok" then
		local server = string.lower(string.gsub(target,"[.-]",""))

		local section = {
				["target"] = target,
				["gateway"] = gateway,
				["netmask"] = netmask,
				["interface"] = interface,
			}
		uci:section("network", "route", server, section)
		uci:commit("network")
		luci.util.exec("/etc/init.d/network reload")
		
		luci.util.exec("sh /rcst/rcst_sh/network_config.sh > /dev/null")

		rcst.open_dev()
		rcst.route_to_driver()
	end

    result["code"] = 0
end
function netmask_check(netmask)
	local result = {}

	local var_netmask = iptonl(netmask)

	local flag1 = 0
	local flag2 = 0
	local var1 = 0
	local var2 = 0
	
	for i = 0 , 30 do
		var1 = bit.rshift(var_netmask, i)
		var2 = bit.band(var1, 1)

		if var2 == 0 then
			if  flag1 == 1 then
				flag2 = flag2 + 1
			end
		else
			flag1 = 1
		end

		--~ var_netmask = var1
	end

	if flag1 == 1 and flag2 > 0 then
		result["netmask_check"] = "netmask_error"
	else
		result["netmask_check"] = "netmask_ok"
	end

	return result
end

--~hyong
function targetip_netmask_check(targetip, netmask)
	targetip = iptonl(targetip)
	netmask_not = ipnot(netmask)

	targetip_check = bit.band(targetip, netmask_not)

	if targetip_check == 0 then
		return "targetip_netmask_ok"
	else
		return "targetip_netmask_not_match"
	end
end
--~hyong 
function getlanwanip(interface)
	local result = {}

	if interface ~= "lan" and interface ~= "wan" then
        return false
    end

    local LuciNetwork = require("luci.model.network").init() 
    local network = LuciNetwork:get_network(interface)
    local wanType = network:proto()

	if interface == "lan" then
		netmask = luci.util.exec("ifconfig %s | sed -n 2p | awk '{print $4}' | tr -d 'Mask:'" %{rcst_ifname} )
        --~ netmask = luci.util.exec("ifconfig eth0 | sed -n 2p | awk '{print $4}' | tr -d 'Mask:'")
	elseif  interface == "wan" then
		if wanType == "pppoe" then
			netmask = luci.util.exec("ifconfig pppoe-wan | sed -n 2p | awk '{print $4}' | tr -d 'Mask:'")
		else
			netmask = luci.util.exec("ifconfig sn0 | sed -n 2p | awk '{print $4}' | tr -d 'Mask:'")
		end
    end

	if netmask then
		result["netmask"] = netmask
	else
		result["netmask"] = network:get("ipaddr")
	end
 
    result["code"] = 0
    result["ipaddr"] = network:get("ipaddr")
    result["network"] = network
    
    return result
end

--~hyong
function iptonl( ip )
	local a,b,c,d = ip:match("^(%d+).(%d+).(%d+).(%d+)")
	local ipnl = bit.lshift(a, 24) + bit.lshift(b, 16) + bit.lshift(c, 8) + d
	return ipnl
end

--~hyong
function ipnot ( ip )
	local ipnl = iptonl(ip)
	return bit.band(bit.bnot(ipnl),4294967295)
end

--~hyong
function gateway_check(gw_ipaddr, gw_netmask, gateway)
	local result = {}

	gw_ipaddr = iptonl(gw_ipaddr)
	gateway = iptonl(gateway)
	
	gw_netmask_not = ipnot(gw_netmask)
	gw_netmask = iptonl(gw_netmask)
	
	ret_ipaddr = bit.band(gw_ipaddr, gw_netmask)
	ret_gateway = bit.band(gateway, gw_netmask)
	ret_gateway_not = bit.band(gateway, gw_netmask_not)

	result["ret_ipaddr"] = ret_ipaddr
	result["ret_gateway"] = ret_gateway
	result["gw_netmask"] = gw_netmask
	result["gw_netmask_not"] = gw_netmask_not
	result["ret_gateway_not"] = ret_gateway_not

	if ret_ipaddr == ret_gateway and ret_gateway_not ~= 0 then
		result["code"] = "gateway_ok"
	else
		result["code"] = "unreachable"
	end

	return result
	
end
--主函数
local route_checkret = setRoute()
