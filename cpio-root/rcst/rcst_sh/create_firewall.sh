#!/bin/bash
operation_num=$(cat /etc/config/firewall_config | grep "operation_tmp " | wc -l) #0删除 1增加 2修改 3初始化
init_firewall() {

 target=$(uci get firewall_config.classify.target_tmp)                                                                       
                src=$(uci get firewall_config.classify.srctype_tmp)                                                                         
                dest=$(uci get firewall_config.classify.desttype_tmp)                                                                       
                proto=$(uci get firewall_config.classify.proto_tmp)                                                                         
                src_ip=$(uci get firewall_config.classify.srcip_tmp)                                                                        
                src_mac=$(uci get firewall_config.classify.srcmac_tmp)                                                                      
                dest_ip=$(uci get firewall_config.classify.destip_tmp)                                                                      
                src_sport=$(uci get firewall_config.classify.srcsport_tmp)                                                                  
                src_dport=$(uci get firewall_config.classify.srcdport_tmp)                                                                  
                dest_sport=$(uci get firewall_config.classify.destsport_tmp)                                                                
                dest_dport=$(uci get firewall_config.classify.destdport_tmp)                                                                
                name=$(uci get firewall_config.classify.name_tmp)                                                                           
                comment=$(uci get firewall_config.classify.comment_tmp)                                                                     
                                                                                                                                            
                uci set firewall.$comment=rule                                                                                              
                                                                                                                                            
                uci set firewall.$comment.target=$target                                                                                    
                uci set firewall.$comment.src=$src                                                                                          
                uci set firewall.$comment.dest=$dest                                                                                        
                uci set firewall.$comment.proto=$proto                                                                                      
                uci set firewall.$comment.src_ip=$src_ip                                                                                    
                uci set firewall.$comment.src_mac=$src_mac                                                                                  
                uci set firewall.$comment.dest_ip=$dest_ip                                                                                  
                uci set firewall.$comment.src_port=$src_sport-$src_dport                                                                    
                uci set firewall.$comment.dest_port=$dest_sport-$dest_dport                                                                 
                uci set firewall.$comment.name=$name                                                                                        
                uci set firewall.$comment.enabled=1                                            
                                                                                                                                            
                        #~ uci set firewall.$comment.src_dport=$start_port"-"$end_port                                                      
                        #~ uci set firewall.$comment.dest_port=$start_port"-"$end_port                                                      
                uci commit firewall																			
}

                                                                                                                                            
del_firewall() {                                                                                                                            
                                                                                                                                            
                        firewall_num=$(uci show firewall_config.classify | wc -l)                                                           
                        i=1                                                                                                                 
                        while [[ "$i" -lt "$firewall_num" ]]                                                                                
                        do                                                                                                                  
                                uci delete firewall_config.classify.$(uci show firewall_config.classify |awk -F '[.]+' '{print $3}'| awk -F '[=]+' '{print $1}' | sed -n "2 p") 
                                let "i=i+1"                                                                                                 
                                uci commit firewall_config                                                                                  
                        done                                                                                                                
}     



add_firewall() {                                                                                                                            
                                                                                                                                            
        #natenable=$(uci get proset.nat_set.switch)                                                                                         
        target_num=$(cat /etc/config/firewall_config | grep "target_tmp " | wc -l)                                                          
        srctype_num=$(cat /etc/config/firewall_config | grep "srctype_tmp " | wc -l)                                                        
        desttype_num=$(cat /etc/config/firewall_config | grep "desttype_tmp " | wc -l)                                                      
        proto_num=$(cat /etc/config/firewall_config | grep "proto_tmp " | wc -l)                                                            
        srcmac_num=$(cat /etc/config/firewall_config | grep "srcmac_tmp " | wc -l)                                                          
        srcip_num=$(cat /etc/config/firewall_config | grep "srcip_tmp " | wc -l)                                                            
        destip_num=$(cat /etc/config/firewall_config | grep "destip_tmp " | wc -l)                                                          
        srcsport_num=$(cat /etc/config/firewall_config | grep "srcsport_tmp " | wc -l)                                                      
        srcdport_num=$(cat /etc/config/firewall_config | grep "srcdport_tmp " | wc -l)                                                      
        destsport_num=$(cat /etc/config/firewall_config | grep "destsport_tmp " | wc -l)                                                    
        destdport_num=$(cat /etc/config/firewall_config | grep "destdport_tmp " | wc -l)                                                    
        name_num=$(cat /etc/config/firewall_config | grep "name_tmp " | wc -l)                                                              
        comment_num=$(cat /etc/config/firewall_config | grep "comment_tmp " | wc -l)  

#       if [ "$natenable" -eq "1" ] ; then                                                                                                  
                                                                                                                                            
                if [ "$comment_num" -eq "1" ] ; then                                                                                        
                        comment=$(uci get firewall_config.classify.comment_tmp)                                                             
                        uci set firewall.$comment=rule                                                                                      
                        uci commit firewall                                                                                                 
                                                                                                                                            
                                                                                                                                            
                        if [ "$target_num" -eq "1" ] ; then                                                                                 
                                target=$(uci get firewall_config.classify.target_tmp)                                                       
                                uci set firewall.$comment.target=$target                                                                    
                                uci commit firewall                                                                                         
                        fi                                                                                                                  
                                                                                                                                            
                                                                                                                                            
                        if [ "$srctype_num" -eq "1" ] ; then                                                                                
                                src=$(uci get firewall_config.classify.srctype_tmp)                                                         
                                uci set firewall.$comment.src=$src                                                                          
                                uci commit firewall                                                                                         
                        fi                                                                                                                  
                                                                                                                                            
                        if [ "$desttype_num" -eq "1" ] ; then                                                                               
                                dest=$(uci get firewall_config.classify.desttype_tmp)                                                       
                                uci set firewall.$comment.dest=$dest                                                                        
                                uci commit firewall                                                                                         
                        fi                                                                                                                  
                                                                                                                                            
                        if [ "$proto_num" -eq "1" ] ; then                                                                                  
                                proto=$(uci get firewall_config.classify.proto_tmp)                                                         
                                uci set firewall.$comment.proto=$proto                                                                      
                                uci commit firewall                                                                                         
                        fi                                                                                                                  
                                                                                                                                            
                        if [ "$srcip_num" -eq "1" ] ; then                                                                                  
                                src_ip=$(uci get firewall_config.classify.srcip_tmp)                                                        
                                uci set firewall.$comment.src_ip=$src_ip                                                                    
                                uci commit firewall                                                                                         
                        fi  
                                                       
                        if [ "$destip_num" -eq "1" ] ; then                                                                                 
                                dest_ip=$(uci get firewall_config.classify.destip_tmp)                                                      
                                uci set firewall.$comment.dest_ip=$dest_ip                                                                  
                                uci commit firewall                                                                                         
                        fi                                                                                                                  
                                                                                                                                            
                                                                                                                                            
                        if [ "$srcsport_num" -eq "1" ] ; then                                                                               
                                if [ "$srcdport_num" -eq "1" ] ; then                                                                       
                                        src_sport=$(uci get firewall_config.classify.srcsport_tmp)                                          
                                        src_dport=$(uci get firewall_config.classify.srcdport_tmp)                                          
                                        uci set firewall.$comment.src_port=$src_sport-$src_dport                                            
                                        uci commit firewall                                                                                 
                                fi                                                                                                          
                        fi                                                                                                                  
                                                                                                                                            
                                                                                                                                            
                                                                                                                                            
                        if [ "$destsport_num" -eq "1" ] ; then                                                                              
                                if [ "$destdport_num" -eq "1" ] ; then                                                                      
                                        dest_sport=$(uci get firewall_config.classify.destsport_tmp)                                        
                                        dest_dport=$(uci get firewall_config.classify.destdport_tmp)                                        
                                        uci set firewall.$comment.dest_port=$dest_sport-$dest_dport                                         
                                        uci commit firewall                                                                                 
                                fi                                                                                                          
                        fi                                                                                                                  
                                                                                                                                            
                                                                                                                                            
                                                                                                                                            
                        if [ "$name_num" -eq "1" ] ; then                                                                                   
                                name=$(uci get firewall_config.classify.name_tmp)                                                           
                                uci set firewall.$comment.name=$name                                                                        
                                uci commit firewall                                                                                         
                        fi  
                        
                                               
                        if [ "$srcmac_num" -eq "1" ] ; then                                                                                 
                                src_mac=$(uci get firewall_config.classify.srcmac_tmp)                                                      
                                uci set firewall.$comment.src_mac=$src_mac                                                                  
                                uci commit firewall                                                                                         
                        fi                                                                                                                  
                        uci set firewall.$comment.enabled=1   
						uci commit firewall      
                        #~ if [ "$start_port_num" -eq "1" ] && [ "$end_port_num" -eq "1" ]; then                                            
                                #~ start_port=$(uci get natport_config.classify.startport_tmp)                                              
                                #~ end_port=$(uci get natport_config.classify.endport_tmp)                                                  
#~                                                                                                                                          
                                #~ uci set firewall.$comment.src_dport=$start_port"-"$end_port                                              
                                #~ uci set firewall.$comment.dest_port=$start_port"-"$end_port                                              
                                #~ uci commit firewall                                                                                      
                        #~ fi                                                                                                               
                fi                                                                                                                          
                                                                                                                                            
#       fi                                                                                                                                  
}    


if [ "$operation_num" -eq "1" ] ; then                                                                                                      
        operation=$(uci get firewall_config.classify.operation_tmp)                                                                         
        if [ "$operation" -eq "1" ] ; then                                                                                                  
                add_firewall                                                                                                                
                del_firewall                                                                                                                
				/etc/init.d/firewall stop
				/etc/init.d/firewall restart                                                                                               
                sh /rcst/rcst_sh/tos_set.sh &                                                                                               
                                                                                                                                            
                exit 0                                                                                                                      
                                                                                                                                            
        elif [ "$operation" -eq "0" ] ; then                                                                                                
                comment=$(uci get firewall_config.classify.comment_tmp)                                                                     
                uci delete firewall.$comment                                                                                                
                uci commit firewall                                                                                                         
                del_firewall                                                                                                                
				/etc/init.d/firewall stop
				/etc/init.d/firewall restart                                                                                              
                sh /rcst/rcst_sh/tos_set.sh &                                                                                               
                                                                                                                                            
                exit 0                                                                                                                      
                                                                                                                                            
        elif [ "$operation" -eq "2" ] ; then                                                                                                
                comment=$(uci get firewall_config.classify.comment_tmp)                                                                     
                uci delete firewall.$comment                                                                                                
                uci commit firewall                                                                                                         
                add_firewall                                                                                                                
                del_firewall                                                                                                                
				/etc/init.d/firewall stop
				/etc/init.d/firewall restart                                                                                                  
                sh /rcst/rcst_sh/tos_set.sh &                                                                                               
                                                                                                                                            
                exit 0                                                                                                                      
                                                                                                                                            
        elif [ "$operation" -eq "3" ] ; then                                                                                                
                init_firewall                                                                                                               
                del_firewall                                                                                                                
				/etc/init.d/firewall stop
				/etc/init.d/firewall restart                                                                                                  
                sh /rcst/rcst_sh/tos_set.sh &                                                                                               
        fi                                                                                                                                  
fi        
