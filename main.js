function getPlayers(page = 1) {
  pageNum = page;
  let pageNumber = page;
  let URI = "https://www.balldontlie.io/api/v1/players?page=" + pageNumber;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", URI);
  xhr.onload = () => {
    let response = JSON.parse(xhr.response);
    createPlayers(response.data);
    totalPages(response.meta.total_pages);
    let form = document.forms[0];
    form.reset();
  };
  xhr.send();
}

function createPlayers(playersData) {
  let table = document.querySelector("table");
  let tbody = table.querySelector("tbody");
  for (let i = 0; i < playersData.length; i++) {
    let newRow = tbody.insertRow();
    newRow.insertCell().append(playersData[i].first_name);
    newRow.insertCell().append(playersData[i].last_name);
    newRow.insertCell().append(playersData[i].team.name);
    newRow.insertCell().append(playersData[i].team.conference);
    newRow.insertCell().append(playersData[i].team.division);
  }
}

function totalPages(total_pages) {
  let span1 = document.querySelectorAll("span")[0];
  let span2 = document.querySelectorAll("span")[1];
  let input = document.getElementById("page");
  input.setAttribute("max", total_pages);
  span1.textContent = "";
  span2.textContent = "";
  span1.append(total_pages);
  span2.append(pageNum);
}

function clearTable() {
  let tbody = document.querySelector("table tbody");
  while (tbody.children.length > 0) {
    tbody.lastElementChild.remove();
  }
}

let form = document.forms[0];
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");

form.onsubmit = (e) => {
  e.preventDefault();
  clearTable();
  let pageInput = document.getElementById("page").value;
  getPlayers(pageInput);
};

previous.addEventListener("click", () => {
  if (pageNum > 1) {
    pageNum--;
    clearTable();
    getPlayers(pageNum);
  } else {
    console.log("Cannot go to a non-existing page");
  }
});

next.addEventListener("click", () => {
  let totalNumber = document.querySelectorAll("span")[0].innerText;
  if (pageNum < totalNumber) {
    pageNum++;
    clearTable();
    getPlayers(pageNum);
  } else {
    console.log("Cannot go to a non-existing page");
  }
});

let pageNum = 1;

getPlayers();
