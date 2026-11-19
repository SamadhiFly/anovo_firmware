#!/bin/bash

#lixch20161116 snmp QOS OVS ---->> TOS 高优先级队列中

#snmp回复存放在最高优先级队列中
iptables -A POSTROUTING -t mangle -p udp --dport 162 -j TOS --set-tos 0x02

#QOS和OVS回复存放在最高优先级队列中
iptables -A POSTROUTING -t mangle -p TCP --sport 6631 -j TOS --set-tos 0x02
iptables -A POSTROUTING -t mangle -p TCP --sport 6632 -j TOS --set-tos 0x02

#ICMP存放在次高优先级队列中
iptables -A POSTROUTING -t mangle -p icmp -j TOS --set-tos 0x10


#snmp回复存放在50k队列中
#tc filter add dev sn0 parent 1:fffe protocol ip prio 0 u32 match ip dport 162 0xffff match ip protocol 0x11 0xff flowid 1:2

#QOS和OVS回复存放在50k队列中
#tc filter add dev sn0 parent 1:fffe protocol ip prio 0 u32 match ip sport 6631 0xffff match ip protocol 0x06 0xff flowid 1:2
#tc filter add dev sn0 parent 1:fffe protocol ip prio 0 u32 match ip sport 6632 0xffff match ip protocol 0x06 0xff flowid 1:2
