langget();
function logInfoGet()
{
		output.innerHTML =
			'<img src="/icons/loading.gif" alt="Loading" style="vertical-align:middle" /> ' +
			'loading...'
		;

		legend.parentNode.style.display = 'block';
		legend.style.display = 'inline';
		
		pingString = $('input[name=ping]').val();
		$.ajax({
			url: '/action/logInfoGet',
			data: {pingString:pingString},
			type: "POST",
			dataType: "text",
			async: false,
			success : function(rsp){
				if (rsp)
				{
					legend.style.display = 'none';
					output.innerHTML = rsp;
				}
				else
				{
					legend.style.display = 'none';
					output.innerHTML = '<span class="error">Bad address specified!</span>';
				}				
			},
			error:function(){
					console.log("logInfoGet error");
			}
		});	
}
