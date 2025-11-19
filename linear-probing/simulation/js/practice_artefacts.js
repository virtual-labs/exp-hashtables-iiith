class practiceEngine {
  constructor() {
    this.table = [];
    this.size = 0;
  }
}
let practice_engine = new practiceEngine();

var load = function () {
  for (i = 0; i < 10; i++) practice_engine.table[i] = { status: 0, data: 0 };
};
document.getElementsByTagName("body").onload = load();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function jump(method, position, temp, element) {
  if (method === "lp") {
    return (position + temp) % 10;
  } else if (method === "qp") {
    return (position + temp * temp) % 10;
  } else if (method === "dh") {
    hash2 = 5 - (element % 5);
    return (position + temp * hash2) % 10;
  }
}

async function show(position, colour, table) {
  for (i = 0; i < 10; i++) {
    let iPosition = document.getElementById(i.toString());
    iPosition.style.background = "white";
    if (table[i].status) iPosition.value = table[i].data;
  }
  document.getElementById(position.toString()).style.background = colour;
  if (table[position].data)
    document.getElementById(position.toString()).value = table[position].data;
}

var changeTable = async function (table, element, operation, method) {
  // Ensure integer input
  element = parseInt(element, 10);
  if (isNaN(element)) {
    let fourthStatus = document.getElementById("status3");
    if (fourthStatus) {
      fourthStatus.style.color = "red";
      fourthStatus.innerHTML = "Please enter a valid integer!";
    }
    return;
  }

  let position = element % 10;
  let originalPosition = position;
  let firstStatus = document.getElementById("status");
  let secondStatus = document.getElementById("status1");
  let thirdStatus = document.getElementById("status2");
  let fourthStatus = document.getElementById("status3");

  firstStatus.innerHTML = "";
  secondStatus.innerHTML = "";
  thirdStatus.innerHTML = "";
  fourthStatus.innerHTML = "";

  let temp = 0;
  let probeLimit = 10; // Table size

  // SEARCH & REMOVE
  if (operation === "search" || operation === "remove") {
    let found = false;
    for (temp = 0; temp < probeLimit; temp++) {
      position = (originalPosition + temp) % 10;

      firstStatus.innerHTML = "hash = " + element + " % 10 = " + (element % 10);
      await sleep(500);
      if (method != "ht") secondStatus.innerHTML = "i = " + temp;
      await sleep(500);
      if (method === "ht") thirdStatus.innerHTML = "Index = hash = " + position;
      else if (method === "lp")
        thirdStatus.innerHTML = "Index = (hash + i)%10 = " + position;
      else if (method === "qp")
        thirdStatus.innerHTML = "Index = (hash + i*i)%10 = " + position;
      else if (method === "dh")
        thirdStatus.innerHTML = "Index = (hash + i*hash2)%10 = " + position;
      await sleep(500);

      if (
        table[position].status === 1 &&
        parseInt(table[position].data, 10) === element
      ) {
        fourthStatus.style.color = "#a4c652";
        if (operation === "search") {
          fourthStatus.innerHTML = "Element Found!";
          show(position, "#a4c652", table);
        } else if (operation === "remove") {
          fourthStatus.innerHTML = "Element Removed!";
          practice_engine.size--;
          table[position].status = 2; // Mark as deleted
          table[position].data = "";
          show(position, "#a4c652", table);
        }
        found = true;
        break;
      } else if (table[position].status === 0) {
        // Empty slot, stop searching
        fourthStatus.style.color = "red";
        fourthStatus.innerHTML = "Element Not Found!";
        show(position, "red", table);
        found = false;
        break;
      } else {
        // Collision, keep probing
        fourthStatus.style.color = "red";
        fourthStatus.innerHTML = "Collision Occured";
        show(position, "red", table);
        await sleep(500);
      }
    }
    if (!found && temp >= probeLimit) {
      fourthStatus.style.color = "red";
      fourthStatus.innerHTML = "Element Not Found!";
      show(originalPosition, "red", table);
    }
    return;
  }

  // INSERT (probe entire table, check for duplicate, remember first available slot)
  temp = 0;
  position = originalPosition;
  let firstAvailable = -1;
  let alreadyExists = false;

  for (temp = 0; temp < probeLimit; temp++) {
    position = (originalPosition + temp) % 10;

    if (table[position].status === 1) {
      if (parseInt(table[position].data, 10) === element) {
        alreadyExists = true;
        break;
      }
    } else if (firstAvailable === -1) {
      // Remember the first empty or deleted slot
      firstAvailable = position;
    }
  }

  if (alreadyExists) {
    fourthStatus.style.color = "#a4c652";
    fourthStatus.innerHTML = "Element already exists!";
    show(position, "#a4c652", table);
    return;
  }

  if (firstAvailable !== -1) {
    // Insert into the first available slot found during probing
    position = firstAvailable;
    firstStatus.innerHTML = "hash = " + element + " % 10 = " + (element % 10);
    await sleep(500);
    if (method != "ht")
      secondStatus.innerHTML =
        "i = " + ((position - originalPosition + probeLimit) % probeLimit);
    await sleep(500);
    if (method === "ht") thirdStatus.innerHTML = "Index = hash = " + position;
    else if (method === "lp")
      thirdStatus.innerHTML = "Index = (hash + i)%10 = " + position;
    else if (method === "qp")
      thirdStatus.innerHTML = "Index = (hash + i*i)%10 = " + position;
    else if (method === "dh")
      thirdStatus.innerHTML = "Index = (hash + i*hash2)%10 = " + position;
    await sleep(500);

    fourthStatus.style.color = "#a4c652";
    fourthStatus.innerHTML = "Insert Successful!";
    table[position].data = element;
    table[position].status = 1;
    show(position, "#a4c652", table);
    return;
  } else {
    fourthStatus.style.color = "red";
    fourthStatus.innerHTML = "Insert Failed: Table Full or No Slot Found!";
    show(originalPosition, "red", table);
    return;
  }
};

var insert = function (method) {
  if (practice_engine.size >= 10) {
    let fourthStatus = document.getElementById("status3");
    if (fourthStatus) {
      fourthStatus.style.color = "red";
      fourthStatus.innerHTML = "Insert Failed: Table Full or No Slot Found!";
    }
    return;
  }
  practice_engine.size++;
  let element = document.getElementById("value-box").value;
  changeTable(practice_engine.table, element, "insert", method);
};

var searchelement = function (method) {
  let element = document.getElementById("value-box").value;
  changeTable(practice_engine.table, element, "search", method);
};

var remove = function (method) {
  let element = document.getElementById("value-box").value;
  changeTable(practice_engine.table, element, "remove", method);
};

function resetArtefact() {
  location.reload();
  document.getElementById("value-box").value = "";
}

var handlers = function () {
  var htmltitle = document.getElementById("htmltitle").innerHTML;
  var method = "";
  if (htmltitle === "Hash Tables Practice") method = "ht";
  else if (htmltitle === "Linear Probing Practice") method = "lp";
  else if (htmltitle === "Quadratic Probing Practice") method = "qp";
  else if (htmltitle === "Double Hashing Practice") method = "dh";
  document
    .getElementById("insertbutton")
    .addEventListener("click", function () {
      insert(method);
    });
  document
    .getElementById("searchbutton")
    .addEventListener("click", function () {
      searchelement(method);
    });
  document
    .getElementById("removebutton")
    .addEventListener("click", function () {
      remove(method);
    });
  document.getElementById("resetbutton").addEventListener("click", function () {
    resetArtefact();
  });
};
handlers();
