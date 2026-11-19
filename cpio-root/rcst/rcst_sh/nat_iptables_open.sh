#! /bin/bash

#iptables -t nat -F
#iptables -t nat -P PREROUTING ACCEPT
#iptables -t nat -P INPUT ACCEPT
#iptables -t nat -P OUTPUT ACCEPT
#iptables -t nat -P POSTROUTING ACCEPT
#iptables -t nat -N ACC_LAN
#iptables -t nat -N ACC_WLAN
#iptables -t nat -N MESH_LAN
#iptables -t nat -N delegate_postrouting
#iptables -t nat -N delegate_prerouting
#iptables -t nat -N postrouting_lan_rule
#iptables -t nat -N postrouting_rule
#iptables -t nat -N postrouting_wan_rule
#iptables -t nat -N prerouting_lan_rule
#iptables -t nat -N prerouting_rule
#iptables -t nat -N prerouting_wan_rule
#iptables -t nat -N zone_lan_postrouting
#iptables -t nat -N zone_lan_prerouting
#iptables -t nat -N zone_wan_postrouting
#iptables -t nat -N zone_wan_prerouting
#iptables -t nat -A PREROUTING -p tcp -j MESH_LAN
#iptables -t nat -A PREROUTING -p tcp -j ACC_LAN
#iptables -t nat -A PREROUTING -p tcp -j ACC_WLAN
#iptables -t nat -A PREROUTING -j delegate_prerouting
#iptables -t nat -A POSTROUTING -j delegate_postrouting
#iptables -t nat -A delegate_postrouting -o eth0 -j zone_lan_postrouting
#iptables -t nat -A delegate_postrouting -o sn0 -j zone_wan_postrouting
#iptables -t nat -A delegate_prerouting -i eth0 -j zone_lan_prerouting
#iptables -t nat -A delegate_prerouting -i sn0 -j zone_wan_prerouting
#iptables -t nat -A zone_wan_postrouting -j MASQUERADE
iptables -t nat -D POSTROUTING -o ppp0 -j MASQUERADE
iptables -t nat -A POSTROUTING -o ppp0 -j MASQUERADE
uci set switch_redirect.redirect_set.switch=1
uci commit switch_redirect
