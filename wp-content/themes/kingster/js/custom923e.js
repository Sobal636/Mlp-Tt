jQuery(document).ready(function($) {

    (function($) {
        "use strict";
    
    })(jQuery);
    

    $(".submit-reg-no").on('click',function() {
        var error_count = 0;
        var ajaxURL=$(".user-details-form").attr('action');
        var reg_no=$(".reg_no").val();
        
        if(!reg_no){
            $("#reg_no_error").text("Type Your Register Number Here");
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
                    action: 'quad_get_certificate',
                    reg_no: reg_no
                },
                success: function(result) {
                    //alert(result);
                    var resultData = $.trim(result).split('|');
                    if(resultData[0] == 'success'){
                        window.location.href = resultData[1];
                    }else{
                        $("#overlay-load").css("display", "none");
                        $('#reg_no_error').text(resultData[1]);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("Error");
                }
            });
        }
        return false;
    });
});
