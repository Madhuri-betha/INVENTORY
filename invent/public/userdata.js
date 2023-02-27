var endpoint = "http://localhost:9000/"
 async function fun(e){
  let v=e.parentNode.previousElementSibling;
  let b=e.parentNode.parentNode;
  let p=v.firstChild;
      var tempData={}
      tempData["id"]= b.childNodes[1].innerHTML;
      tempData["problem"]=p.value;
      p.value="";
      console.log(tempData);
      await fetch(endpoint + "problem",{
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
    })
  }