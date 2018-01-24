// $('#myModal').modal(options);

//签收
$('#inbg').click(function () {
    $('#myModal').modal('show');

    //success end
    var name = $('#name').val();
    var tel =  $('#tel').val();

    //签收成功后执行 indexDB添加信息
     var personals = [{name:name,tel:tel}];
     addDataForWyy(personals);

});

$('#subnum').click(function () {
    if(parseInt($('#num').val())>1){
        $('#num').val(parseInt($('#num').val()) - 1);
    }else{
        $('#num').val(1);
    }
});

$('#addnum').click(function () {
    $('#num').val(parseInt($('#num').val()) + 1);
});

//签收获取indexDB
$('#tel').keyup(function(){
    var tel = $('#tel').val();

    if(tel.length >= 3 && tel.length < 11){

        console.log(tel);

        $('#tel_ck').find("li").remove();

        fuzzySearchForWyy(tel); //关键字

        setTimeout(function(){
            var lilen = $("#tel_ck").find("li").length;
            if(lilen > 0){
                $('#tel_ck').show();
            }else{
                $('#tel_ck').hide();
            }
        },500);

    }else{
        $('#tel_ck').hide();
    }

});

$('.tel-ck-option p').click(function () {
    $('#tel_ck').hide();
});

$('.tel-ck-js').click(function () {

    console.log('--------------------------del');

    $(this).parent().remove();

    setTimeout(function(){
        var lilen = $("#tel_ck").find("li").length;
        if(lilen > 0){
            $('#tel_ck').hide();
        }
    },700);
});






