#! /bin/bash

echo -e "$1" "$2" "$3" "$4\n{"'"'"lan_rx"'"'":$1"","'"'"lan_tx"'"'":$2"","'"'"wan_rx"'"'":$3"","'"'"wan_tx"'"'":$4\n""$3\n""$4" > /tmp/speed_cop
