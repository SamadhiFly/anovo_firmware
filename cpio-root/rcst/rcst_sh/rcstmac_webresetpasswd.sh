#!/bin/bash

syslog_sh()
{
	echo $(date | awk '{print $2,$3,$4}') $(uci get system.system.hostname) "shell.info rcstmac_webinit"[$(ps | grep rcstmac_webinit.sh | grep -v grep | awk '{print $1}' | sed -n 1p)]: $1 >> /mnt/rcst_log/messages
}

dec2bin() {
	local num=""
	local bin=""
if [ "$1" == "A" ]; then
	num=10
elif [ "$1" == "B" ]; then
	num=11
elif [ "$1" == "C" ]; then
	num=12
elif [ "$1" == "D" ]; then
	num=13
elif [ "$1" == "E" ]; then
	num=14
elif [ "$1" == "F" ]; then
	num=15
else
	num=$1
fi
#echo num:$num
	while [ $num -gt 0 ]; do
		bin=$((num%2))$bin
		num=$((num/2))
	done
	[ -z "$bin" ] && bin="0"
	bin=$(printf "%04d" "$bin")
	echo $bin
	return "$bin"
}

bin2dec() {
        local bin=$1
        local dec=0
        local len=$(echo -n $bin | wc -c)

        #echo $bin $len

        i=0
        while [ $i -lt $len ]; do

        digit=${bin:$i:1}
        dec=$((dec*2 + digit))
        let i=i+1
        done
        echo $dec
}

dev2string() {
	if [ "$1" == "1" ]; then
		string="!"
	elif [ "$1" == "2" ]; then
		string="@"
	elif [ "$1" == "3" ]; then
		string="#"
	elif [ "$1" == "4" ]; then
		string="%"
	elif [ "$1" == "5" ]; then
		string="%"
	elif [ "$1" == "6" ]; then
		string="^"
	elif [ "$1" == "7" ]; then
		string="!"
	elif [ "$1" == "8" ]; then
		string="*"
	elif [ "$1" == "9" ]; then
		string="@"
	elif [ "$1" == "0" ]; then
		string="#"
	else
		string="!"
	fi
        echo $string
}

macstr=$(cat /etc/config/rcst_mac | grep rcst_mac | awk '{print $5$6$7}')
echo $macstr
bin1=$(dec2bin $(cat /etc/config/rcst_mac | grep rcst_mac | awk '{print $6}' | cut -c2))
bin2=$(dec2bin $(cat /etc/config/rcst_mac | grep rcst_mac | awk '{print $7}' | cut -c1))
bin3=$(dec2bin $(cat /etc/config/rcst_mac | grep rcst_mac | awk '{print $7}' | cut -c2))
echo $bin1$bin2$bin3
binsum="$bin1$bin2$bin3"
echo binsum:$binsum
len=$(echo -n $binsum | wc -c)
if [ "$len" == "12" ]; then

binsum1=$(echo -n $binsum | cut -c1-3)
binsum1=0$binsum1
binsum2=$(echo -n $binsum | cut -c4-6)
binsum2=0$binsum2
binsum3=$(echo -n $binsum | cut -c7-9)
binsum3=0$binsum3
binsum4=$(echo -n $binsum | cut -c10-12)
binsum4=0$binsum4
echo "binsum:$binsum1 $binsum2 $binsum3 $binsum4"
dec1=$(bin2dec "$binsum1")
dec2=$(bin2dec "$binsum2")	
dec3=$(bin2dec "$binsum3")	
dec4=$(bin2dec "$binsum4")		
echo "dec:$dec1 $dec2 $dec3 $dec4"
string1=$(dev2string "$dec1")
string2=$(dev2string "$dec2")
string3=$(dev2string "$dec3")
string4=$(dev2string "$dec4")
echo "string:$string1 $string2 $string3 $string4"

	webinitpasswd="$macstr""CT_4000""$string1$string2$string3$string4"
	echo $webinitpasswd
	cd /rcst/rcst_app/;./sm4_web "$webinitpasswd" init
	cp /tmp/auth.txt /mnt/auth_init.txt 
	cp /tmp/auth.txt /mnt/auth_web_save.txt
	#cp /rcst/rcst_sh/auth_ct4000.txt /tmp/auth.txt
	chmod 755 /tmp/goahead 
	chmod 755 /tmp/route.txt
	chmod 755 /tmp/gopass
	chmod 755 /tmp/auth.txt
	#kill -9 $(ps | grep goahead  | grep -v grep | awk '{print $1}')
else

syslog_sh "rcstmac_webinit  read maclen failed $len $dec1 $dec2 $dec3 $dec4" 

fi


