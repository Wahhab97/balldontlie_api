function getPlayers(page = 1) {
  let pageNumber = page;
  let URI = "https://www.balldontlie.io/api/v1/players?page=" + pageNumber;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", URI);
  xhr.onload = () => {
    let response = JSON.parse(xhr.response);
    createPlayers(response.data);
  };
  xhr.send();
}

function createPlayers(playersData) {
  let table = document.querySelector("table");
  for (let i = 0; i < playersData.length; i++) {
    let newRow = table.insertRow();
    newRow.insertCell().append(playersData[i].first_name);
    newRow.insertCell().append(playersData[i].last_name);
    newRow.insertCell().append(playersData[i].position);
    newRow.insertCell().append(playersData[i].team.name);
    newRow.insertCell().append(playersData[i].team.conference);
    newRow.insertCell().append(playersData[i].team.division);
  }
}

getPlayers();
