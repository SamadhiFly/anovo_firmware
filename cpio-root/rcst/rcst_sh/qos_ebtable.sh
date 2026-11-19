#!/bin/sh

networkmode=$(uci get networkmode.networkmode.networkmode)
if [ "$networkmode" == 1 ];then
#~ ebtables -F
#~ true > /tmp/ebt.sh
#echo "0" > /proc/sys/net/bridge/bridge-nf-call-iptables
echo "0"
#~ iptables -t mangle -S | grep '^-N qos_\|-j qos_\|-j MARK' | sed  -e 's/-A qos_Default_ct / /'  -e 's/-m mark --mark 0x0/ /'  -e 's/0xf -m tcp -m multiport/ /'  -e 's/0xf -m udp -m multiport/ /'  -e 's/0xf / /' -e 's/0xff/ /' -e 's/-m comment --comment "AOL  iChat  ICQ" / /'  -e 's/32 / /'  -e 's/32 / /' -e 's/-p /--ip-proto /' -e 's/-s /--ip-src /' -e 's/-d /--ip-dst /' -e 's/--ports /--ip-dport /' -e 's/-j MARK --set-xmark /-j mark --set-mark /'  -e '${p;g}'  | sed -n -e 's/^./ebtables -A FORWARD -p ipv4 &/p' > /tmp/ebt.sh
#~ result=$(tr -d '/' < /tmp/ebt.sh)
#~ echo "$result" > /tmp/ebt.sh
#~ sh /tmp/ebt.sh
elif [ "$networkmode" == 2 ];then
#echo "0" > /proc/sys/net/bridge/bridge-nf-call-iptables
echo "1"
fi
