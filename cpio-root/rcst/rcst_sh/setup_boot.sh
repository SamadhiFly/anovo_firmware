#!/bin/bash
echo "U-boot Env setup script"
if [ "$1" = "main" ]; then 
fw_setenv bootargs  "console=ttyPS0,115200 coherent_pool=20M ubi.block=0,6 ubi.mtd=2,2048 root=/dev/ubiblock0_6"

elif [ "$1" = "back" ]; then  

fw_setenv bootargs  "console=ttyPS0,115200 coherent_pool=20M ubi.block=0,7 ubi.mtd=2,2048 root=/dev/ubiblock0_7"


else

echo "Usage: sh setup_boot.sh [main | back] "

fi

