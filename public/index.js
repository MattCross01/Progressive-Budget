let myChart,transactions=[];

function populateTotal()
{const t=transactions.reduce((t,e)=>t+parseInt(e.value),0);
    document.querySelector("#total").textContent=t}
    
    function populateTable()
    {const t=document.querySelector("#tbody");
    
    t.innerHTML="",transactions.forEach(e=>{const n=document.createElement("tr");
    n.innerHTML=`\n      <td>${e.name}</td>\n      <td>${e.value}</td>\n    `,
    t.appendChild(n)})}
    
    function populateChart(){const t=transactions.slice().reverse();
        
        let e=0;const n=t.map(t=>{const e=new Date(t.date);
            return`${e.getMonth()+1}/${e.getDate()}/${e.getFullYear()}`}),
            
            a=t.map(t=>e+=parseInt(t.value));
            
            myChart&&myChart.destroy();
            
            const o=document.getElementById("myChart").getContext("2d");
            myChart=new Chart(o,
                {type:"line",
                data:{labels:n,
                    datasets:[{label:"Total Over Time",
                    fill:!0,backgroundColor:"#6666ff",
                    data:a}]}})}
                    
                    function sendTransaction(t){const e=document.querySelector("#t-name"),
                    
                    n=document.querySelector("#t-amount"),a=document.querySelector(".error");
                    if(""===e.value||""===n.value)return void(a.textContent="Missing Information");
                    
                    a.textContent="";const o={name:e.value,
                        value:n.value,
                        date:(new Date).toISOString()};
                        
                        t||(o.value*=-1),transactions.unshift(o),
                        populateChart(),
                        populateTable(),
                        populateTotal(),
                        fetch("/api/transaction",
                        {method:"POST",
                        body:JSON.stringify(o),
                        headers:{Accept:"application/json, text/plain, */*",
                        "Content-Type":"application/json"}})
                        .then(t=>t.json())
                        .then(t=>{t.errors?a.textContent="Missing Information":(e.value="",n.value="")})
                        
                        .catch(t=>{saveRecord(o),e.value="",n.value=""})}
                        
                        fetch("/api/transaction")
                        .then(t=>t.json())
                        .then(t=>{transactions=t,
                            populateTotal(),
                            populateTable(),
                            populateChart()}),
                            
                            document.querySelector("#add-btn")
                            .addEventListener("click",function(t){t.preventDefault(),sendTransaction(!0)}),
                            document.querySelector("#sub-btn").addEventListener("click",
                            
                            function(t){t.preventDefault(),sendTransaction(!1)});