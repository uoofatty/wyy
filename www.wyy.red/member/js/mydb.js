
//定义indexDB
var myDB={
    name:'wyyBG',
    version:1,
    db:null
};

//外部调用 - 添加
function addDataForWyy(personals){
    openDB(myDB.name,myDB.version);

    setTimeout(function(){
        addData(myDB.db,'personals',personals);
    },300);

    setTimeout(function(){
        closeDB(myDB.db);
    },500);
}

//外部调用 - 关键字查询
function fuzzySearchForWyy(keyword){
    openDB(myDB.name,myDB.version);

    setTimeout(function(){
        fuzzySearch(myDB.db,'personals',keyword);
    },300);

    setTimeout(function(){
        closeDB(myDB.db);
    },500);
}

//Open indexDB
function openDB (name,version) {
    var version=version || 1;
    var request=window.indexedDB.open(name,version);
    request.onerror=function(e){
        console.log(e.currentTarget.error.message);
    };
    request.onsuccess=function(e){
        myDB.db=e.target.result;
    };
    request.onupgradeneeded=function(e){
        var db=e.target.result;
        if(!db.objectStoreNames.contains('personals')){
            var store = db.createObjectStore('personals',{autoIncrement: true}); //创建key
            //store.createIndex('nameIndex','name',{unique:true});
            store.createIndex('telIndex','tel',{unique:true});//创建索引
        }
        console.log('DB version changed to '+version);
    };
}

//入库操作
function addData(db,storeName,personals){
    var transaction=db.transaction(storeName,'readwrite');
    var store=transaction.objectStore(storeName);

    for(var i=0;i<personals.length;i++){
        store.add(personals[i]);
    }
}

//游标遍历 object store
function fetchStoreByCursor(db,storeName){
    var transaction=db.transaction(storeName);
    var store=transaction.objectStore(storeName);
    var request=store.openCursor();
    request.onsuccess=function(e){
        var cursor=e.target.result;
        if(cursor){
            console.log(cursor.key);
            var currentPerson=cursor.value;
            console.log(currentPerson.name);
            console.log(currentPerson.tel);
            cursor.continue();
        }
    };
}

//关键字查询
function fuzzySearch(db,storeName,keyword){

    var transaction = db.transaction(storeName);
    var store = transaction.objectStore(storeName);
    var request = store.openCursor();
    var most = 0;

    request.onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            if (cursor.value.tel.indexOf(keyword) != -1 && most <= 10) {

                $('#tel_ck').append("<li class=\"tel-ck-option\"><p class=\"pull-left\">" + cursor.value.tel + " - " + cursor.value.name + "</p><button type=\"button\" class=\"close tel-ck-js\"><span aria-hidden=\"true\">&times;</span></button></li>");

                // console.log(cursor.value.name);
                // console.log(cursor.value.tel);
                most++;
            }
            cursor.continue();
        }
    };
}

//close db
function closeDB(db){
    db.close();
}