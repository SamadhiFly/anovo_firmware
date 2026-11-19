#! /bin/bash

#iptables -t nat -F

iptables -t nat -D POSTROUTING -o ppp0 -j MASQUERADE
uci set switch_redirect.redirect_set.switch=0
uci commit switch_redirect
