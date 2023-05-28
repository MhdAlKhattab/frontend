$(document).ready(function () {
    var id = window.location.search.split('=')[1];
    if (id){
        console.log("Ok", id);
        document.getElementById("referralInput").value = id;
    }
});