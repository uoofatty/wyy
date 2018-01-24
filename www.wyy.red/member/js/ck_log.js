//document.cookie="userId=829,userName=hulk1";

//addCookie('王洋洋','13381338638',365);

//console.log('cookies:' + document.cookie);

//添加一个coolie
function addCookie(name,value,expiresHours){
    var cookieString=name+"="+escape(value);
    console.log(cookieString);
    //判断是否设置过期时间
    if(expiresHours>0){
        var date=new Date();
        date.setTime(date.getTime+expiresHours*24*3600*1000);
        cookieString=cookieString+"; expires="+date.toGMTString();
    }
    document.cookie=cookieString;
}

//获取指定cookie的值
function getCookie(name){
    var strCookie=document.cookie;
    var arrCookie=strCookie.split("; ");
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        if(arr[0]==name) return arr[1];
    }
    return "";
}

//删除一个指定名称的cookie
function deleteCookie(name){
    var date=new Date();
    date.setTime(date.getTime()-10000);
    document.cookie=name+"=v; expires="+date.toGMTString();
}
