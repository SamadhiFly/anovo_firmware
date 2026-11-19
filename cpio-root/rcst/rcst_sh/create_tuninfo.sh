#!/bin/bash
operation_num=$(cat /etc/config/gre_config | grep "opt_temp " | wc -l) #0删除 1增加 2修改 3初始化

                                                                                                                                        
del_gre() {                                                                                                                            
                                                                                                                                            
	gre_num=$(uci show gre_config.gre_config | wc -l)                                                           
	i=0                                                                                                                 
	while [[ "$i" -lt "$gre_num" ]]                                                                                
	do
			let "i=i+1"	                                                                                                                  
			uci delete gre_config.gre_config.$(uci show gre_config.gre_config |awk -F '[.]+' '{print $3}'| awk -F '[=]+' '{print $1}' | sed -n "2 p") 
			uci commit gre_config 
                                                                                                 
                                                                                 
	done                                                                                                                
}     



add_greinfo() {                                                                                                                            
                                                                                                                                            
        tunid_num=$(cat /etc/config/gre_config | grep "tunid_temp " | wc -l)                                                          
        tunname_num=$(cat /etc/config/gre_config | grep "tunname_temp " | wc -l)                                                        
        tunremotewanip_num=$(cat /etc/config/gre_config | grep "tunremotewanip_temp " | wc -l)                                                      
        tunlocalwanip_num=$(cat /etc/config/gre_config | grep "tunlocalwanip_temp " | wc -l)                                                            
        tunlocallanip_num=$(cat /etc/config/gre_config | grep "tunlocallanip_temp " | wc -l)     
        tunvlanid_num=$(cat /etc/config/gre_config | grep "tunvlanid_temp " | wc -l) 
        sucid_num=$(cat /etc/config/gre_config | grep "sucid_temp " | wc -l)                                                          
	
                                                                                                                                        
                if [ "$sucid_num" -eq "1" ] ; then  
                        sucid=$(uci get gre_config.gre_config.sucid_temp)                                                          
						
						uci set gre_info.$sucid=gre_info
						uci commit gre_config
																																																																																
                        if [ "$tunid_num" -eq "1" ] ; then                                                                                  
                                tunid=$(uci get gre_config.gre_config.tunid_temp)                                                                                        
                                uci set gre_info.$sucid.tunid=$tunid                                                                  
                                uci commit gre_info                                                                                         
                        fi                                                                                                                  
                                                                                                                                            
                        if [ "$tunname_num" -eq "1" ] ; then                                                                                  
                                tunname=$(uci get gre_config.gre_config.tunname_temp)                                                        
                                uci set gre_info.$sucid.tunname=$tunname                                                                
                                uci commit gre_info                                                                                         
                        fi  
                                                       
                        if [ "$tunremotewanip_num" -eq "1" ] ; then                                                                                  
                                tunremotewanip=$(uci get gre_config.gre_config.tunremotewanip_temp)                                                        
                                uci set gre_info.$sucid.tunremotewanip=$tunremotewanip                                                                
                                uci commit gre_info                                                                                         
                        fi                                                                                                                   
                                                                                                                                                                                                                                                                                       
                        if [ "$tunlocalwanip_num" -eq "1" ] ; then                                                                                  
                                tunlocalwanip=$(uci get gre_config.gre_config.tunlocalwanip_temp)                                                        
                                uci set gre_info.$sucid.tunlocalwanip=$tunlocalwanip                                                                
                                uci commit gre_info                                                                                         
                        fi   
                        
						if [ "$tunlocallanip_num" -eq "1" ] ; then                                                                                  
								tunlocallanip=$(uci get gre_config.gre_config.tunlocallanip_temp)                                                        
								uci set gre_info.$sucid.tunlocallanip=$tunlocallanip                                                                
								uci commit gre_info                                                                                         
						fi   

						if [ "$tunvlanid_num" -eq "1" ] ; then                                                                                  
								tunvlanid=$(uci get gre_config.gre_config.tunvlanid_temp)                                                        
								uci set gre_info.$sucid.tunvlanid=$tunvlanid                                                                
								uci commit gre_info                                                                                         
						fi   
												
#						vlanlocalwanip=$(uci get network.wan$tunvlanid.ipaddr)
						
		                                                                                                                                   
                                                                                                             
                fi                                                                                                                          
                                                                                                                                
}    


if [ "$operation_num" -eq "1" ] ; then                                                                                                      
        operation=$(uci get gre_config.gre_config.opt_temp)                                                                         
        if [ "$operation" -eq "1" ] ; then                                                                                                  
	            add_greinfo 
				sucid=$(uci get gre_config.gre_config.sucid_temp)    
				tunname=$(uci get gre_info.$sucid.tunname)	 
				tunremotewanip=$(uci get gre_info.$sucid.tunremotewanip)     
				tunlocalwanip=$(uci get gre_info.$sucid.tunlocalwanip)
				tunlocallanip=$(uci get gre_info.$sucid.tunlocallanip)  
				echo "$sucid $tunname $tunremotewanip $tunlocalwanip $tunlocallanip"                                                                                                                
				if [ "$(ifconfig |grep $tunname | wc -l)" -eq "0" ] ; then 
					ip tunnel add $tunname mode gre remote $tunremotewanip local $tunlocalwanip
					ip addr add $tunlocallanip dev $tunname peer $tunlocallanip/24 
					ip link set $tunname up mtu 1500		
				fi	                                                                                                                                                                                                            
                del_gre                                                                                                                                              
                exit 0                                                                                                                      
                                                                                                                                            
        elif [ "$operation" -eq "0" ] ; then     

				sucid=$(uci get gre_config.gre_config.sucid_temp)    
				tunname=$(uci get gre_info.$sucid.tunname)		
				ip tunnel del $tunname                                                                  
                uci delete gre_info.$sucid                                                                                                
                uci commit gre_info                                                                                                         
                del_gre                                                                                                              
                                                                                             
                                                                                                                                            
                exit 0                                                                                                                      
                                                                                                                                            
        elif [ "$operation" -eq "2" ] ; then    
                                                                                                                                                                                                  
				sucid=$(uci get gre_config.gre_config.sucid_temp)    
				tunname=$(uci get gre_info.$sucid.tunname)
				tunremotewanip=$(uci get gre_info.$sucid.tunremotewanip)     
				tunlocalwanip=$(uci get gre_info.$sucid.tunlocalwanip)
				tunlocallanip=$(uci get gre_info.$sucid.tunlocallanip)  						
				ip tunnel del $tunname										
                uci delete gre_info.$sucid                                                                                                
                uci commit gre_info
                add_greinfo
				if [ "$(ifconfig |grep $tunname | wc -l)" -eq "0" ] ; then 
					ip tunnel add $tunname mode gre remote $tunremotewanip local $tunlocalwanip					
					ip addr add $tunlocallanip dev $tunname peer $tunlocallanip/24 					
					ip link set $tunname up mtu 1500							
				fi	                           
                del_gre                                                                                                                                        
                exit 0                                                                                                                      
                                                                                        
        fi
else
       greinfo_num=$(uci show gre_info | grep tunname | wc -l)
		i=0                                                                                                                 
		while [[ "$i" -lt "$greinfo_num" ]]                                                                                
		do      
			let "i=i+1"                                                                                                             
			sucid=$(uci show /etc/config/gre_info | grep tunname |  sed -n "$i"p| awk -F'[.]' '{print $2}')
			tunname=$(uci get gre_info.$sucid.tunname)
			tunremotewanip=$(uci get gre_info.$sucid.tunremotewanip)     
			tunlocalwanip=$(uci get gre_info.$sucid.tunlocalwanip)
			tunlocallanip=$(uci get gre_info.$sucid.tunlocallanip) 
			if [ "$(ifconfig |grep $tunname | wc -l)" -eq "0" ] ; then						
				ip tunnel add $tunname mode gre remote $tunremotewanip local $tunlocalwanip
				ip addr add $tunlocallanip dev $tunname peer $tunlocallanip/24 
				ip link set $tunname up mtu 1500
			fi	
		
		done                                                                                                                                           
fi        
