
//定义indexDB
var myDB={
    name:'wyyBG',
    version:1,
    db:null
};

// //执行open
// openDB(myDB.name,myDB.version);

//执行操作---- 因异步操作，设置延迟加载----------------------------------------------

// // 执行添加数据
// setTimeout(function(){
//     addData(myDB.db,'personals',personals);
// },1000);

// //执行关键字查询
// setTimeout(function(){
//     fuzzySearch(myDB.db,'personals','133');
// },1000);

// //执行遍历
// setTimeout(function(){
//     fetchStoreByCursor(myDB.db,'personals');
// },1000);
//
// //执行下标查询
// setTimeout(function(){
//     getDataByIndex(myDB.db,'personals','wyy');
// },1000);
//
// //执行key查询
// setTimeout(function(){
//     getDataByKey(myDB.db,'personals','1001')
// },1000);


//执行操作----- 因异步操作，设置延迟加载---------------------------------------------


//外部调用 - 添加
function addDataForWyy(personals){
    openDB(myDB.name,myDB.version);

    setTimeout(function(){
        addData(myDB.db,'personals',personals);
    },1000);

    setTimeout(function(){
        closeDB(myDB.db);
    },1500);
}

//外部调用 - 关键字查询

function fuzzySearchForWyy(keyword){
    openDB(myDB.name,myDB.version);

    setTimeout(function(){
        fuzzySearch(myDB.db,'personals',keyword);
    },1000);

    setTimeout(function(){
        closeDB(myDB.db);
    },1500);
}

//模拟数据
// var personals = [{id:1004,name:"eee",tel:'15612341155'}];

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

    //db.close();
}

//查找数据key
function getDataByKey(db,storeName,value){

    var transaction=db.transaction(storeName,'readwrite');
    var store=transaction.objectStore(storeName);
    var request=store.get(value);
    request.onsuccess=function(e){
        var person=e.target.result;
        console.log(person.name);
    };
}
//查找数据 索引
function getDataByIndex(db,storeName,value){
    var transaction=db.transaction(storeName,'readwrite');
    var store=transaction.objectStore(storeName);
    var index = store.index("telIndex");
    var request = index.get(value);
    request.onsuccess=function(e){
        var person=e.target.result;
        console.log(person.tel);
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

// IDBKeyRange.only(value):只获取指定数据
// IDBKeyRange.lowerBound(value,isOpen)：获取最小是value的数据，第二个参数用来指示是否排除value值本身，也就是数学中的是否是开区间
// IDBKeyRange.upperBound(value,isOpen)：和上面类似，用于获取最大值是value的数据
// IDBKeyRange.bound(value1,value2,isOpen1,isOpen2)：

//索引与游标结合
function getMultipleData(db,storeName){
    var transaction=db.transaction(storeName);
    var store=transaction.objectStore(storeName);
    var index = store.index("nameIndex");
    var request=index.openCursor(IDBKeyRange.only(26))
    request.onsuccess=function(e){
        var cursor=e.target.result;
        if(cursor){
            var student=cursor.value;
            console.log(student.id);
            cursor.continue();
        }
    }
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
                console.log(cursor.value.name);
                console.log(cursor.value.tel);
                most++;
            }
            cursor.continue();
        }
    };
}

//更新数据
function updateDataByKey(db,storeName,value){
    var transaction=db.transaction(storeName,'readwrite');
    var store=transaction.objectStore(storeName);
    var request=store.get(value);
    request.onsuccess=function(e){
        var student=e.target.result;
        student.age=35;
        store.put(student);
    };
}

//调用object store的delete方法根据键值删除记录
function deleteDataByKey(db,storeName,value){
    var transaction=db.transaction(storeName,'readwrite');
    var store=transaction.objectStore(storeName);
    store.delete(value);
}

//调用object store的clear方法可以清空object store
function clearObjectStore(db,storeName){
    var transaction=db.transaction(storeName,'readwrite');
    var store=transaction.objectStore(storeName);
    store.clear();
}

//关闭数据库可以直接调用数据库对象的close方法
function closeDB(db){
    db.close();
}
//删除数据库使用indexedDB对象的deleteDatabase方法
function deleteDB(name){
    indexedDB.deleteDatabase(name);
}