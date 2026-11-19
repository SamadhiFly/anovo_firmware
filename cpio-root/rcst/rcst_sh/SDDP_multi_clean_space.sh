#!/bin/bash

mem_used_max=24000 #单位KByte

if [ "$(df | grep mnt| awk '{print $4}')" -ge "$mem_used_max" ]; then
	rm -rf /mnt/alarm_log
	rm -rf /mnt/rcst_log/acu_info.txt
	rm -rf /mnt/rcst_log/acu_w.txt
	rm -rf /mnt/rcst_log/acu_offline.txt
	sh /rcst/rcst_sh/mem_reclaim.sh
fi
