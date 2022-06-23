jQuery(document).ready(function($) {

    (function($) {
		"use strict";
		
var options = {
    "key": "rzp_test_Xclu41IFWOchCd", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://example.com/your_logo",
    "handler": function (response){
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
    },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9999999999"
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#F37254"
    }
};
var rzp1 = new Razorpay(options);
// document.getElementById('payment-bbtn').onclick = function(e){
//     rzp1.open();
//     e.preventDefault();
// }


$(".submit-fee").on('click',function() {
        var error_count = 0;
        var ajaxURL=$(".admission-fee").attr('action');
        var fee_amount=$(".fee_amount").val();
        var st_name=$(".st_name").val();
        
        if(!fee_amount || !st_name){
            $("#reg_no_error").text("Please fill required fields");
            error_count = 1;
        }
        else{
            $("#reg_no_error").text("");
            error_count = 0;
        }
        if(!error_count)
        {
           $("#overlay-load").css("display", "block");
            
            $.ajax({
                url: ajaxURL,
                type: 'post',
                data: {
                    action: 'proceed_to_payment',
                    fee_amount: fee_amount,
                    st_name: st_name
                },
                success: function(result) {
                    //alert(result);
                    var resultData = $.trim(result).split('|');
					if(resultData[0])
						{
							//alert(resultData[5]);
							var options = {
								"key":'rzp_live_RssPlz4JKydW9S', // Enter the Key ID generated from the Dashboard
								"amount": resultData[5], // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
								"currency": "INR",
								"name": resultData[1],
								"description": "Submit Fee",
								"image": "https://quadnotion.com/demo/prathyasa-new/wp-content/uploads/2020/06/prathyasa-logo-horizontal.png",
								"order_id":'',//This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
								"handler": function (response){

									if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
										alert("Something went wrong! Plaese try again.")
									}
									else
									{
										$("#reg_no_error").text("Payment Successfull.");
										$("#reg_no_error").css('color','green');
										
									}
								},
								"prefill": {
									"name": resultData[1],
									"email": '',
									"contact": ''
								},
								"notes": {
									"address": ''
								},
								"theme": {
									"color": "#c4932c"
								}
							};
							$('#overlay-load').css('display','none');
							var rzp1 = new Razorpay(options);
							rzp1.open();
						}
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("Error");
                }
            });
        }
        return false;
    });


    })(jQuery);

});