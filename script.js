document.addEventListener('DOMContentLoaded',function(){
    loadFromLocalStorage();
});

function onFormSubmit() {
    var FormData = readFormData();

    if (!FormData.fullname || !FormData.empcode || !FormData.salary || !FormData.city) {
        alert("Please fill all the fields!");
        return;
    }
    insertNewRecord(FormData);
    resetForm();
}
function readFormData() {
    var FormData = {};
    FormData["fullname"] = document.getElementById("fullname").value;
    FormData["empcode"] = document.getElementById("empcode").value;
    FormData["salary"] = document.getElementById("salary").value;
    FormData["city"] = document.getElementById("city").value;
    return FormData;


}
function insertNewRecord(data) {
    var table = document.getElementById("employeelist").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullname;
    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empcode;
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onclick = "onEdit(this)" style="cursor:pointer; color: blue;">Edit</a>
                        <a onclick = "onDelete(this)" style="cursor:pointer; color: blue;">Delete</a>`;


savetolocalstorage();
}
function resetForm() {
    document.getElementById("fullname").value = "";
    document.getElementById("empcode").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";

}
function onEdit(td) {
    var row = td.parentElement.parentElement;
    document.getElementById("fullname").value = row.cells[0].innerHTML;
    document.getElementById("empcode").value = row.cells[1].innerHTML;
    document.getElementById("salary").value = row.cells[2].innerHTML;
    document.getElementById("city").value = row.cells[3].innerHTML;

    row.parentNode.removeChild(row);
    savetolocalstorage();
}
function onDelete(td) {

    if (confirm('Are you sure you want to delete the entire record')) {
        var row = td.parentElement.parentElement;
        row.parentNode.removeChild(row);
        savetolocalstorage();
    }
    
}



function savetolocalstorage() {
    var table = document.getElementById("employeelist")
    var rows = document.getElementsByTagName('tbody')[0].rows;
    var data = [];
    for (var i = 0; i < rows.length; i++) {
        var rowData = {
            fullname: rows[i].cells[0].innerHTML,
            empcode: rows[i].cells[1].innerHTML,
            salary: rows[i].cells[2].innerHTML,
            city: rows[i].cells[3].innerHTML
        };
        data.push(rowData);


    }
    localStorage.setItem('employeelist', JSON.stringify(data));
    console.log("data saved successfully");



}

function loadFromLocalStorage() {
    var saveddata = localStorage.getItem('employeelist');
    if (saveddata) {
        var data = JSON.parse(saveddata)
        var table = document.getElementById("employeelist").getElementsByTagName('tbody')[0];
        table.innerHTML = '';
        data.forEach(function (item) {
            var newRow = table.insertRow(table.length);
            var cell1 = newRow.insertCell(0);
            cell1.innerHTML = item.fullname;

            var cell2 = newRow.insertCell(1);
            cell2.innerHTML = item.empcode;

            var cell3 = newRow.insertCell(2);
            cell3.innerHTML = item.salary;

            var cell4 = newRow.insertCell(3);
            cell4.innerHTML = item.city;

            var cell5 = newRow.insertCell(4);
            cell5.innerHTML = `<a onclick="onEdit(this)" style="cursor:pointer; color: blue;">Edit</a>
                                       <a onclick="onDelete(this)" style="cursor:pointer; color: blue;">Delete</a>`;


        });
    }
}
