require("luci.sys")  
local result = {}
local data = {}
local routes= {}
local sum=""
local ps = luci.util.execi("/bin/busybox top -bn1")
if not ps then
	sum = nil
end
for line in ps do
	local pid, ppid, user, stat, vsz, mem, cpu, cmd = line:match(
		"^ *(%d+) +(%d+) +(%S.-%S) +([RSDZTW][W ][<N ]) +(%d+) +(%d+%%) +(%d+%%) +(.+)"
	)
	local idx = tonumber(pid)
		if idx then
		data = {
			pid     = tonumber(pid),
			user    = user,
			memory    = mem,
			cpu    = cpu,
			command = cmd
		}
		routes[#routes+1] = data
	end
	if #routes == 10 then
		break
	end 
end
if #routes > 0 then
	for j=1,(#routes-1) do
	sum = sum.."{"..'"'.."pid"..'"'..":"..'"'..routes[j].pid..'"'..","
			..'"'.."user"..'"'..":"..'"'..routes[j].user..'"'..","
			..'"'.."cpu"..'"'..":"..'"'..routes[j].cpu..'"'..","
			..'"'.."memory"..'"'..":"..'"'..routes[j].memory..'"'..","
			..'"'.."command"..'"'..":"..'"'..routes[j].command..'"'.."},"
	end
	sum = sum.."{"..'"'.."pid"..'"'..":"..'"'..routes[#routes].pid..'"'..","
			..'"'.."user"..'"'..":"..'"'..routes[#routes].user..'"'..","
			..'"'.."cpu"..'"'..":"..'"'..routes[#routes].cpu..'"'..","
			..'"'.."memory"..'"'..":"..'"'..routes[#routes].memory..'"'..","
			..'"'.."command"..'"'..":"..'"'..routes[#routes].command..'"'.."}"
else
	sum = nil
end
print(sum)
