#!/bin/bash

chmod -R 755 /mnt/
chmod -R 755 /mnt/*
chmod -R 755 /mnt/work/*
chmod -R 755 /etc/
chmod -R 755 /etc/config/
chmod -R 750 /rcst/
#chmod  -R 755 /rcst/http_sh/
#chmod  -R 755 /rcst/rcst_app/
#chmod  -R 755 /rcst/rcst_drv/
#chmod  -R 755 /rcst/rcst_sh/
#chmod  -R 755 /rcst/rcst_ui/
#chmod  -R 755 /rcst/upgrade_sh/
chmod u+s /bin/su
chmod o+x /bin/busybox
rm /bin/ps
cp /rcst/rcst_sh/ps /bin
chmod -R 750 /bin/ps
rm /usr/bin/top
cp /rcst/rcst_sh/top /usr/bin
chmod -R 750 /usr/bin/top
chmod -R 750 /usr/bin/htop
