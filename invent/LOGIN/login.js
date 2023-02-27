

endpoint="http://localhost:9000/"
document.getElementById("login").addEventListener("click", async () => {
let formData = new FormData(document.querySelector("form"));
  let tempData = {};
  formData.forEach((value, lable) => {
    tempData[lable] = value;
  });
  console.log(tempData)
  await fetch(endpoint + "verify",{
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      data: tempData
    }),
}).then(response =>{
  if(response.redirected){
    window.location.href = response.url;
  }
  else{
    return response.text();
  }
}).then(data=>{
     if(data){
      alert(data);
     }
})
})


