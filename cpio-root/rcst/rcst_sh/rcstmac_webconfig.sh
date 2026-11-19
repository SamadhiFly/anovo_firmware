#!/bin/bash


#macstr=$(cat /etc/config/rcst_mac | grep rcst_mac | awk '{print $5$6$7}')
echo $1
passwd=$1
#webinitpasswd="$macstr""CT_4000"
echo $passwd
cd /rcst/rcst_app/;./sm4_test $passwd de
webpasswd=$(cat /tmp/sm_txt)
rm /tmp/sm_txt
cd /rcst/rcst_app/;./sm4_web "$webpasswd" init
cp /tmp/auth.txt /mnt/auth_init.txt 
cp /tmp/auth.txt /mnt/auth_web_save.txt
#cp /rcst/rcst_sh/auth_ct4000.txt /tmp/auth.txt
chmod 755 /tmp/goahead 
chmod 755 /tmp/route.txt
chmod 755 /tmp/gopass
chmod 755 /tmp/auth.txt
kill -9 $(ps | grep goahead  | grep -v grep | awk '{print $1}')
