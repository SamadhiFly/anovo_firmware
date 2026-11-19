function uconn_read_status(uconn) ----新增
   return uconn:call("network.interface", "status", {interface="wan"})
end

function match_pattern(exit_code)
	local PPPOE_RESULT = {
	   ['PEER_NO_RESP'] =  {
		  code = 531,
		  vcode = 678,
		  ppp_exit =  { ['8'] = true, ['10'] = true}
	   },
	   
	   ['NO_MORE_SESSION'] = {
		  code = 530,
		  vcode = 633,
		  ppp_exit = '20'
	   },
	   ['AUTH_FAILD'] = {
		  code = 507,
		  vcode = 691,
		  ppp_exit = { ['11'] = true, ['19'] = true}
	   }
	}
   for key, pattern in pairs(PPPOE_RESULT) do
      local p = pattern.ppp_exit
      if type(p) == 'table' then
	 if p[exit_code] then return pattern end
      else
	 if p == exit_code then return pattern end
      end
   end
   return nil
end

function get_and_clean_last_error()
   last_error =  '/tmp/state/pppoe_last_error'
--~ local config = { last_error = '/tmp/state/pppoe_last_error',
		 --~ debug = nil,
		 --~ check_interval = 2
	      --~ }
   local logfd = io.open(last_error)
   if not logfd then
    return { code = 1000, msg = 1000} end
   local exit_code = logfd:read("*all")
   logfd:close()
   local erasefd = io.open(last_error, 'w') 
   erasefd:close()
   local res = match_pattern(exit_code:gsub('\n*',''))
   if res then
      return { code = res.code, msg = res.vcode }
   else
      return { code = 100, msg = 100}
   end
end

function get_if_status(uconn)
   ifst = uconn_read_status(uconn)
   if not ifst then
      uconn:call("network", "reload", {})
      ifst = uconn_read_status(uconn)
   end
   return ifst
end

function pppoeStatusCheck()
	local status = {}
	local uconn = ubus.connect()
	local ifst = get_if_status(uconn)
	local status =  get_and_clean_last_error()
	--~ if ifst.up then
	--~ status["process"] = "up"
	--~ elseif ifst.pending then
	   --~ status["process"] = "connecting"
	--~ else
	   --~ status["process"]  = "down"
	--~ end
	if ifst.up then
		status["process"] = "up"
	else
	   status["process"]  = "connecting"
	end
	return status
end

function ubusWanStatus()
	local ubus = require("ubus").connect()
	local wan = ubus:call("network.interface.wan", "status", {})
	local result = {}
	result["proto"] = string.lower(wan.proto or "dhcp")
	result["up"] = wan.up
	--~ result["uptime"] = wan.uptime or 0
	result["pending"] = wan.pending
	result["autostart"] = wan.autostart
	return result
end

--- status
--- 0:未拨号
--- 1:正在拨号
--- 2:拨号成功
--- 3:正在拨号 但返现拨号错误信息
--- 4:关闭拨号
function getPPPoEStatus()
	local pppoe_status = 0
	local pppoe_errcode = 0
    local result = {}
	local LuciNetwork = require("luci.model.network").init()
	local network = LuciNetwork:get_network("wan")
    local  status = ubusWanStatus()
    if status then
        if status.proto == "pppoe" then
            if status.up then
                --pppoe_status = 2
                --[[
				result["ipaddr"] = getLanWanIp("wan")  --wan6
				 result["sn0_MAC"] = getsn0Mac()
				result["username"] =network:get("username")
				--~将路由下发到协议层 
				rcst.open_dev()
				rcst.route_to_driver()
				--~pppoe自动获取IP需修改wan_config.sh文件 
				luci.util.exec("sh /rcst/rcst_sh/wan_config.sh > /dev/null")
				luci.util.exec("ifconfig pppoe-wan txqueuelen 2000")
				--]]		
			else
				local check = pppoeStatusCheck()
				if check then
					if check.process == "down" then
						pppoe_status = 4
					elseif check.process == "up" then
						pppoe_status = 2
					elseif check.process == "connecting" then
						if check.code == nil or check.code == 100 then
							pppoe_status = 1
						else
							pppoe_status = 3
							pppoe_errcode =  check.msg
						end
					else
						pppoe_status = 4
					end
				end
			end
		else
			pppoe_status = 4
		end
	else
		pppoe_status = 4
	end
	if pppoe_status == 3 then 
		pppoe_status = pppoe_errcode
	end
	return tonumber(pppoe_status)
end
--主函数
local PPPoEStatus = getPPPoEStatus()
print(PPPoEStatus);



