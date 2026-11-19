#!/bin/bash

folder_file=/mnt/random_mac.txt
 
touch "$folder_file"

echo $(echo 40:`cat /proc/sys/kernel/random/uuid | md5sum | sed 's/../&:/g'|cut -c 1-14`) > $folder_file

echo "random_mac $(cat $folder_file)"
		
fw_setenv ethaddr $(cat $folder_file)
      
sync


