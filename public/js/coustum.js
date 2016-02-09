$(document).ready(function() {
    $('.del').on('click',function(){
        var node = $(this);
        var url = $(this).attr('data');
        $.ajax({
            url:url, 
            method :"POST",
            success:function(data) {
                alert(data.data); 
                $(node.parentsUntil('tr')[0]).parent().remove();
            }
        });
    });
    var url = window.location.href;
    var urls = url.split("/");
    $('.nav a').removeClass('active');
    if(urls[urls.length - 1] == "" || urls[urls.length - 1] =="liststudents" ){
        $('.listall a').addClass('active');
    }
    else{
        $('.add a').addClass('active');
    }
});