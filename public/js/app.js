var searchForm = document.querySelector('#searchForm');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    document.querySelector('#output').textContent = 'Loading...'
    var address = document.querySelector('#address').value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.querySelector('#output').textContent = JSON.parse(this.response).summary;
            console.log(this);
        }
    };
    xhttp.open("GET", "http://localhost:3000/weather?address=pune", true);
    xhttp.send();
});