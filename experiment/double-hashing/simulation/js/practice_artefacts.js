class practiceEngine {
  constructor() {
    this.size = 0;
    this.table = Array(10)
      .fill()
      .map(() => ({ status: false, value: null }));
  }
}
let practice_engine = new practiceEngine();

var load = function () {
  for (let i = 0; i < 10; i++)
    practice_engine.table[i] = { status: 0, value: 0 };
  let fourthStatus = document.getElementById("fourthStatus");
  if (fourthStatus) {
    fourthStatus.innerHTML = "";
    fourthStatus.style.color = "black";
  }
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
    let hash2 = 5 - (element % 5);
    return (position + temp * hash2) % 10;
  }
}

async function show(position, colour, table) {
  for (let i = 0; i < 10; i++) {
    let iPosition = document.getElementById(i.toString());
    iPosition.style.background = "white";
    if (table[i].status) iPosition.value = table[i].value;
    else iPosition.value = "";
  }
  document.getElementById(position.toString()).style.background = colour;
  if (table[position].value)
    document.getElementById(position.toString()).value = table[position].value;
}

// Sample function to update all steps for each probe
function updateProbeSteps(steps) {
  const statusBoxes = [
    document.getElementById("status"),
    document.getElementById("status1"),
    document.getElementById("status2"),
    document.getElementById("status3"),
  ];
  for (let i = 0; i < statusBoxes.length; i++) {
    statusBoxes[i].innerHTML = steps[i] ? steps[i] : "";
  }
}

var changeTable = async function (table, element, operation, method) {
  let position = element % 10;
  let originalPosition = position;
  let probeLimit = 10;
  let temp = 0;
  let hash2 = 1;
  let probeSteps = [];

  if (method === "dh") {
    hash2 = 5 - (element % 5);
  }

  // Track each probe attempt
  while (table[position].status && temp < probeLimit) {
    probeSteps.push(`Probe ${temp + 1}: Tried index ${position} (occupied)`);
    temp++;
    if (method === "lp") {
      position = (originalPosition + temp) % 10;
    } else if (method === "qp") {
      position = (originalPosition + temp * temp) % 10;
    } else if (method === "dh") {
      position = (originalPosition + temp * hash2) % 10;
    } else {
      break;
    }
  }

  // For search and remove, probe until found or empty slot or probeLimit
  if (operation === "search" || operation === "remove") {
    probeSteps = [];
    for (let i = 0; i < probeLimit; i++) {
      let probePos;
      if (method === "lp") {
        probePos = (originalPosition + i) % 10;
      } else if (method === "qp") {
        probePos = (originalPosition + i * i) % 10;
      } else if (method === "dh") {
        probePos = (originalPosition + i * hash2) % 10;
      } else {
        probePos = originalPosition;
      }
      if (table[probePos].status && table[probePos].value === element) {
        probeSteps.push(`Probe ${i + 1}: Tried index ${probePos} (found)`);
        let fourthStatus = document.getElementById("fourthStatus");
        if (operation === "search") {
          if (fourthStatus) {
            fourthStatus.style.color = "green";
            fourthStatus.innerHTML = "Element Found!";
          }
          await show(probePos, "green", table);
        } else if (operation === "remove") {
          table[probePos].status = false;
          table[probePos].value = null;
          practice_engine.size = Math.max(0, practice_engine.size - 1);
          if (fourthStatus) {
            fourthStatus.style.color = "green";
            fourthStatus.innerHTML = "Element Removed!";
          }
          await show(probePos, "green", table);
        }
        updateProbeSteps(probeSteps);
        return;
      } else {
        if (table[probePos].status) {
          probeSteps.push(
            `Probe ${i + 1}: Tried index ${probePos} (occupied, not found)`
          );
        } else {
          probeSteps.push(
            `Probe ${i + 1}: Tried index ${probePos} (empty, not found)`
          );
        }
      }
    }
    // If probeLimit reached or not found
    let fourthStatus = document.getElementById("fourthStatus");
    if (fourthStatus) {
      fourthStatus.style.color = "red";
      fourthStatus.innerHTML = "Element Not Found!";
    }
    updateProbeSteps(probeSteps);
    await show(originalPosition, "red", table);
    return;
  }

  // Final probe step (success or fail)
  if (temp < probeLimit && !table[position].status) {
    probeSteps.push(
      `Probe ${temp + 1}: Tried index ${position} (empty, inserted here)`
    );
  }

  updateProbeSteps(probeSteps);

  if (temp >= probeLimit) {
    let fourthStatus = document.getElementById("fourthStatus");
    if (fourthStatus) {
      fourthStatus.style.color = "red";
      fourthStatus.innerHTML = "Insert Failed: Table Full or No Slot Found!";
    }
    await show(position, "red", table);
    return;
  }

  // Insert element if slot found
  table[position].status = true;
  table[position].value = element;
  practice_engine.size++;
  let fourthStatus = document.getElementById("fourthStatus");
  if (fourthStatus) {
    fourthStatus.style.color = "green";
    fourthStatus.innerHTML = "Insert Successful!";
  }
  await show(position, "green", table);
};

var insert = function (method) {
  updateProbeSteps([]);
  let fourthStatus = document.getElementById("fourthStatus");
  if (fourthStatus) {
    fourthStatus.innerHTML = "";
    fourthStatus.style.color = "black";
  }
  if (practice_engine.size < 10) {
    let element = parseInt(document.getElementById("value-box").value, 10);
    if (!isNaN(element)) {
      changeTable(practice_engine.table, element, "insert", method);
    }
  } else {
    let fourthStatus = document.getElementById("fourthStatus");
    if (fourthStatus) {
      fourthStatus.style.color = "red";
      fourthStatus.innerHTML = "Insert Failed: Table Full!";
    }
  }
};

var searchelement = function (method) {
  updateProbeSteps([]);
  let fourthStatus = document.getElementById("fourthStatus");
  if (fourthStatus) {
    fourthStatus.innerHTML = "";
    fourthStatus.style.color = "black";
  }
  let element = parseInt(document.getElementById("value-box").value, 10);
  if (!isNaN(element)) {
    changeTable(practice_engine.table, element, "search", method);
  }
};

var remove = function (method) {
  updateProbeSteps([]);
  let fourthStatus = document.getElementById("fourthStatus");
  if (fourthStatus) {
    fourthStatus.innerHTML = "";
    fourthStatus.style.color = "black";
  }
  let element = parseInt(document.getElementById("value-box").value, 10);
  if (!isNaN(element)) {
    changeTable(practice_engine.table, element, "remove", method);
  }
};

function resetArtefact() {
  location.reload();
  document.getElementById("value-box").value = "";
  updateProbeSteps([]);
  let fourthStatus = document.getElementById("fourthStatus");
  if (fourthStatus) {
    fourthStatus.innerHTML = "";
    fourthStatus.style.color = "black";
  }
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
