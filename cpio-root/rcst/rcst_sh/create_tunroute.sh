#!/bin/bash
operation_num=$(cat /etc/config/gre_routeconfig | grep "opt_temp " | wc -l) #0删除 1增加 2修改 3初始化

                                                                                                                                        
del_greroute() {                                                                                                                            
                                                                                                                                            
	gre_num=$(uci show gre_routeconfig.gre_routeconfig | wc -l)                                                           
	i=0                                                                                                                
	while [[ "$i" -lt "$gre_num" ]]                                                                                
	do         
			let "i=i+1"                                                                                                           
			uci delete gre_routeconfig.gre_routeconfig.$(uci show gre_routeconfig.gre_routeconfig |awk -F '[.]+' '{print $3}'| awk -F '[=]+' '{print $1}' | sed -n "2 p") 
			uci commit gre_routeconfig                                                                                                                                                                          
	done                                                                                                                
}     

add_greroute(){
       grerouteinfo_num=$(uci show gre_routeinfo | grep tunid | wc -l)
		i=0                                                                                                                 
		while [[ "$i" -lt "$grerouteinfo_num" ]]                                                                                
		do      
			let "i=i+1"                                                                                                             
			sucid=$(uci show gre_routeinfo | grep tunid |  sed -n "$i"p| awk -F'[.]' '{print $2}')
			tunid=$(uci get gre_routeinfo.$sucid.tunid)
			tunroutedstaddress=$(uci get gre_routeinfo.$sucid.tunroutedstaddress)
			tunroutenetmask=$(uci get gre_routeinfo.$sucid.tunroutenetmask)
			ip route add $tunroutedstaddress/$tunroutenetmask dev tun$tunid		
		done	
}


add_grerouteinfo() {                                                                                                                            
                                                                                                                                            
        tunid_num=$(cat /etc/config/gre_routeconfig | grep "tunid_temp " | wc -l)   
        tunroutedstaddress_num=$(cat /etc/config/gre_routeconfig | grep "tunroutedstaddress_temp " | wc -l)                                                        
        tunroutenetmask_num=$(cat /etc/config/gre_routeconfig | grep "tunroutenetmask_temp " | wc -l)                                                                                                         
        sucid_num=$(cat /etc/config/gre_routeconfig | grep "sucid_temp " | wc -l)                                                          
	
                                                                                                                                        
                if [ "$sucid_num" -eq "1" ] ; then  
                        sucid=$(uci get gre_routeconfig.gre_routeconfig.sucid_temp)                                                          
						
						uci set gre_routeinfo.$sucid=gre_routeinfo
						uci commit gre_routeinfo
																																																																																
                        if [ "$tunid_num" -eq "1" ] ; then                                                                                  
                                tunid=$(uci get gre_routeconfig.gre_routeconfig.tunid_temp)                                                                                        
                                uci set gre_routeinfo.$sucid.tunid=$tunid                                                                  
                                uci commit gre_info                                                                                         
                        fi                                                                                                                  
                                                                                                                                            
                        if [ "$tunroutedstaddress_num" -eq "1" ] ; then                                                                                  
                                tunroutedstaddress=$(uci get gre_routeconfig.gre_routeconfig.tunroutedstaddress_temp)                                                        
                                uci set gre_routeinfo.$sucid.tunroutedstaddress=$tunroutedstaddress                                                                
                                uci commit gre_routeinfo                                                                                         
                        fi  
                                                       
                        if [ "$tunroutenetmask_num" -eq "1" ] ; then                                                                                  
                                tunroutenetmask=$(uci get gre_routeconfig.gre_routeconfig.tunroutenetmask_temp)                                                        
                                uci set gre_routeinfo.$sucid.tunroutenetmask=$tunroutenetmask                                                                
                                uci commit gre_routeinfo                                                                                         
                        fi                                                                                                                   
                   																                                                                                                                                                                                                                                         
                fi                                                                                                                          
                                                                                                                                
}    


if [ "$operation_num" -eq "1" ] ; then                                                                                                      
        operation=$(uci get gre_routeconfig.gre_routeconfig.opt_temp)                                                                         
        if [ "$operation" -eq "1" ] ; then                                                                                                  
                add_grerouteinfo                                                                                                                
                del_greroute  
                add_greroute                                                                                                              
                                                                                             
                                                                                                                                            
                exit 0                                                                                                                      
                                                                                                                                            
        elif [ "$operation" -eq "0" ] ; then     

				sucid=$(uci get gre_routeconfig.gre_routeconfig.sucid_temp)
				tunid=$(uci get gre_routeinfo.$sucid.tunid)
				tunroutedstaddress=$(uci get gre_routeinfo.$sucid.tunroutedstaddress)
				tunroutenetmask=$(uci get gre_routeinfo.$sucid.tunroutenetmask)		
                ip route del $tunroutedstaddress/$tunroutenetmask dev tun$tunid                                                  
                uci delete gre_routeinfo.$sucid                                                                                                
                uci commit gre_routeinfo                                                                                                         
                del_greroute                                                                                                              
                                                                                             
                                                                                                                                            
                exit 0                                                                                                                      
                                                                                                                                            
        elif [ "$operation" -eq "2" ] ; then    
				sucid=$(uci get gre_routeconfig.gre_routeconfig.sucid_temp)    
                                                                   
                uci delete gre_routeinfo.$sucid                                                                                                
                uci commit gre_routeinfo    
                add_grerouteinfo                                                                                                     
                del_greroute                                                                                                   
                add_greroute                                                                                                                            
                exit 0                                                                                                                      
                                                                                        
        fi
else
		add_greroute																																
fi        
