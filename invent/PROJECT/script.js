var selectedRow = null
var index = 1;

filteredTransactionsAfter = { "inventory": [] }

let data;

const api_url = "http://localhost:9000/getdata"
var endpoint = "http://localhost:9000/"

// Defining async function
async function getapi(url) {
  const response = await fetch(url);    	// Storing response
  var data = await response.json();
  updateTransactionTable(data)
  temp(data)
  temp1(data)
}

// Function to define innerHTML for HTML table
// function show(data) {
//   let tab =
//     `<tr>
// 		<th>Id</th>
// 		<th>Category</th>
//     <th>User Id</th>
// 		<th>Model</th>
// 		<th>Serial No</th>
//     <th>Date</th>

// 		</tr>`;
//   for (let r of data.inventory) {   	// Loop to access all rows
//     tab += `<tr>
// 	<td>${r.id} </td>
// 	<td>${r.category}</td>
//   <td>${r.userid}</td>		
// 	<td>${r.model}</td>
// 	<td>${r.serial}</td>	
//   <td>${r.date}</td>

//   <td><button id="edit" onClick="onEdit(this)">Edit</button></td>	
//   <td> <button id="delete" onClick="onDelete(this)">Delete</button></td>	
// </tr>`;
//   }
//   document.getElementById("storeList").innerHTML = tab; 	// Setting innerHTML as tab variable
// }


//Retrieve the data

// function readFormData() {
//   var formData = {};
//   formData["category"] = document.getElementById("category").value;
//   formData["model"] = document.getElementById("model").value;
//   formData["serial"] = document.getElementById("serial").value;
//   formData["date"] = document.getElementById("date").value;
//   formData["problem"] = document.getElementById("problem").value;
//   return formData;
// }

//Edit Data

function onEdit(td) {
  selectedRow = td.parentElement.parentElement;
  // var idno=selectedRow.cells[0].innerHTML;
  // document.getElementById("id").value=selectedRow.cells[0].innerHTML;
  document.getElementById("category").value = selectedRow.cells[1].innerHTML;
  document.getElementById("userid").value = selectedRow.cells[2].innerHTML;
  document.getElementById("model").value = selectedRow.cells[3].innerHTML;
  document.getElementById("serial").value = selectedRow.cells[4].innerHTML;
  document.getElementById("date").value = selectedRow.cells[5].innerHTML;

  const idField = document.createElement('input');
  const idlabel = document.createElement('label');
  idlabel.for = "idf";
  idlabel.innerHTML = "Id:"
  idField.type = 'text';
  idField.name = 'id';
  idField.id = 'idf';

  idField.value = `${selectedRow.cells[0].innerHTML}`; // Replace with the actual value of the ID
  const form = document.getElementById('myform');

  // form.appendChild(idField);
  form.insertBefore(idField, form.children[0])
  form.insertBefore(idlabel, form.children[0])

  idField.disabled = true
  document.getElementById("edit").disabled = true;
  var b = document.getElementById("category");
  b.disabled = true;

}

async function onDelete(td) {
  if (confirm('Do you want to delete this record?')) {


    row = td.parentElement.parentElement;
    var idno = row.cells[0].innerHTML;
    // console.log(row.rowIndex);
    document.getElementById('storeList').deleteRow(row.rowIndex);
    console.log(idno);
    await fetch(endpoint + "delete", {
      method: "POST",
      body: JSON.stringify({ data: idno }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },


    });
    // .then(() => {

    //   window.location.reload();
    // });
    // resetForm();
  }
}

//Reset the data
function resetForm() {
  document.getElementById("category").value = '';
  document.getElementById("userid").value = '';
  document.getElementById("model").value = '';
  document.getElementById("serial").value = '';
  document.getElementById("date").value = '';
  selectedRow = null;
}



// Calling that async function 
document.getElementById("submit").addEventListener("click", async () => {
  document.getElementById("category").disabled = false;
  if (document.getElementById('idf')) {
    document.getElementById("idf").disabled = false;
  }

  // if (document.getElementById("userid").value == NULL) alert("dxcfvghbjnkl;");
  let formData = new FormData(document.querySelector("form"));
  let tempData = {};
  formData.forEach((value, lable) => {
    tempData[lable] = value;
  });
  tempData["comments"] = " "
  tempData["problems"] = " "
  if (tempData["userid"] =="" || tempData["model"] == "" || tempData["serial"] == "" || tempData["date"]=="") {
    alert("please enter all fields");
    return
  }
  // else
  // {
  console.log(tempData)
  resetForm();
  await fetch(endpoint + "inventory", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      data: tempData
    }),
  }).then(() => {
    window.location.reload();
  });

}

);

getapi(api_url);







const filterForm = document.getElementById('searchitems');
const resetDataForm = document.getElementById('resetitems');
const transactionTable = document.getElementById("storeList")



//update transaction
function temp1(data) {
  resetDataForm.addEventListener("click", function (event) {

    filterForm.reset();
    console.log("table", data.inventory)

    updateTransactionTable(data);
  })
}

function updateTransactionTable(filteredTransactions) {
  // Use the filtered transactions array if provided, otherwise use the global transactions array
  console.log("entered")
  transactionsToDisplay = filteredTransactions;

  // Clear the current table rows
  while (transactionTable.rows.length > 1) {
    transactionTable.deleteRow(1);
  }


  // Loop through the transactions array and add rows to the table
  let tab =
    `<tr>
		<th>Id</th>
		<th>Category</th>
    <th>User Id</th>
		<th>Model</th>
		<th>Serial No</th>
    <th>Date</th>
    <th>Comments</th>
    <th>Problems</th>
     <th></th>
     <th></th>
		</tr>`;


  for (let r of transactionsToDisplay.inventory) {
    //console.log(r)	// Loop to access all rows
    tab += `<tr>
	<td>${r.id} </td>
	<td>${r.category}</td>
  <td>${r.userid}</td>		
	<td>${r.model}</td>
	<td>${r.serial}</td>	
  <td>${r.date}</td>
  <td>${r.comments}</td>
  <td>${r.problems}</td>

 
  <td><button id="edit" onClick="onEdit(this)">Edit</button></td>	
  <td> <button id="delete" onClick="onDelete(this)">Delete</button></td>	
</tr>`;
  }
  document.getElementById("storeList").innerHTML = tab;
};






//TEMP DATA

function temp(data) {
  console.log("zxcvbhjk")
  filterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("called filter")
    console.log("table", data.inventory)
    const id = filterForm.elements["idsearch"].value;
    const category = filterForm.elements["category"].value;
    const userid = filterForm.elements["userid"].value;
    const model = filterForm.elements["model"].value;
    const serial = filterForm.elements["serial"].value;

    const date = filterForm.elements["date"].value;

    // console.log("category",filterForm.elements["category"].value)
  
    // Filter the transactions array by the form values and update the transactions table
    // l
    filteredTransactionsAfter.inventory = data["inventory"].filter(function (transaction) {
     
      if(category && transaction.category.trim() !== category) {
       
        return false;
      }
      if (model && transaction.model !== model) {
        return false;
      }
      if(id && transaction.id.trim() !== id.trim()) {
        return false;
      }
      if (serial && transaction.serial.trim() !== serial.trim()) {
        return false;
      }
      if (date && transaction.date !== date) {
        return false;
      }
      return true;   
      // if (userid && transaction.userid.trim() !== userid.trim()) {
      //   //console.log(transaction.userid)
      //  //console.log( transaction.userid.trim(), userid.trim()) 
      
      // }
    });
   console.log(filteredTransactionsAfter)
    updateTransactionTable(filteredTransactionsAfter);
  });
}


//CCOMMENT 
document.getElementById("commentsubmit").addEventListener("click", async () => {
  let formData = new FormData(document.querySelector("#commentform"));
  let tempData = {};
  formData.forEach((value, lable) => {
    tempData[lable] = value;
  });
  // resetForm();
  await fetch(endpoint + "comment", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      data: tempData
    }),
  }).then(() => {
    window.location.reload();
  });

});





function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("storeList");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    tds = tr[i].getElementsByTagName("td")
    var foundInRow = false
    for (j = 0; j < tds.length; j++) {
      if (foundInRow)
        continue
      td = tr[i].getElementsByTagName("td")[j];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          foundInRow = true
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
}


//ADDING OPTIONS DYNAMICALLY
async function get(url) {
  const response = await fetch(url);    	// Storing response
  var data = await response.json();
  // Storing data in form of JSON
  //  show(data);
  var obj = data["deleted-invent"][0];
  console.log(obj);
  const selectElement = document.getElementById('category');
  for (key in obj) {
    const newOption = document.createElement('option');
    newOption.value = key;
    newOption.text = key;
    selectElement.appendChild(newOption);
  }
  const selectEle = document.getElementById('searchb');
  for (key in obj) {
    const newk = document.createElement('option');
    newk.value = key;
    newk.text = key;
    selectEle.appendChild(newk);
  }

}
get("http://localhost:9000/addingcategory")


function displaycategorybar(category) {
  console.log(category)
  if (category == "other") {
    document.getElementById("newcategorybar").style.display = "block";
    document.getElementById("newcategorytext").style.display = "inline";
  }
  else {
    document.getElementById("newcategorybar").style.display = "none";
    document.getElementById("newcategorytext").style.display = "none";
  }
}