#!/bin/bash


passwd=$1
cd /rcst/rcst_app;./sm4_test $passwd de
adminpasswd=$(cat /tmp/sm_txt)
rm /tmp/sm_txt
passwd admin <<EOF
$adminpasswd
$adminpasswd
EOF
