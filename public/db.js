let db;
const request=indexedDB.open("budgettrack",1);

function saveRecord(e)
{db.transaction(["pending"],"readwrite").objectStore("pending").add(e)}

function checkDB(){const e=db.transaction(["pending"],"readwrite").objectStore("pending").getAll();e.onsuccess=
function(){console.log(e.result),
    e.result.length>0&&(console.log(e.result),
    
    fetch("/api/transaction/bulk",
    {method:"POST",body:JSON.stringify(e.result),
    headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then(e=>e.json()).then(()=>{db.transaction(["pending"],
    "readwrite").objectStore("pending").clear()}))}}
    
    request.onupgradeneeded=function(e)
    {e.target.result.createObjectStore("pending",{autoIncrement:!0})},
    
    request.onsuccess=function(e)
    {db=e.target.result,navigator.onLine&&checkDB()},
    
    request.onerror=function(e)
    {console.log("Error! "+e.target.errorCode)},
    window.addEventListener("online",checkDatabase);