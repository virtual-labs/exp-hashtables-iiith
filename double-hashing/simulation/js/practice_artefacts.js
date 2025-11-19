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
    iPosition = document.getElementById(i.toString());
    iPosition.style.background = "white";
    if (table[i].status) iPosition.value = table[i].data;
  }
  document.getElementById(position.toString()).style.background = colour;
  if (table[position].data)
    document.getElementById(position.toString()).value = table[position].data;
}

var changeTable = async function (table, element, operation, method) {
  position = element % 10;
  originalPosition = element % 10;
  firstStatus = document.getElementById("status");
  secondStatus = document.getElementById("status1");
  thirdStatus = document.getElementById("status2");
  fourthStatus = document.getElementById("status3");
  let warningBox = document.getElementById("warningStatus");

  firstStatus.innerHTML = "";
  secondStatus.innerHTML = "";
  thirdStatus.innerHTML = "";
  fourthStatus.innerHTML = "";
  if (warningBox) warningBox.innerHTML = "";

  let temp = 0;
  let hash2 = 0;
  let visitedPositions = new Set();
  let collisionOccurred = false;
  let reasoningMessages = "";

  if (operation === "insert" && practice_engine.size >= 10) {
    if (warningBox) {
      warningBox.innerHTML = `<div style="color:#d9534f;text-align:center;"><b>Sorry, the table is full. Please reset the table to add more elements.</b></div>`;
    }
    return;
  }

  // Double Hashing: Use coprime value 7 for hash2 and explain to user
  if (method === "dh") {
    hash2 = 7 - (element % 7);
    if (hash2 === 0) {
      hash2 = 1;
      reasoningMessages = `<div style="color:#5bc0de;"><b>Note:</b> hash2 was 0, so it was changed to 1 to ensure all slots can be probed.</div>`;
    } else {
      reasoningMessages = `<div style="color:#5bc0de;"><b>Info:</b> hash2 is set to ${hash2}, which is coprime with table size 10. This ensures every slot can be reached during probing.</div>`;
    }
  }

  // Main probe loop
  while (table[position].status === 1) {
    collisionOccurred = true;
    firstStatus.innerHTML = "";
    secondStatus.innerHTML = "";
    thirdStatus.innerHTML = "";
    fourthStatus.innerHTML = "";
    await sleep(1000);

    if (table[position].data != element) {
      firstStatus.style.color = "black";
      secondStatus.style.color = "black";
      thirdStatus.style.color = "black";
      fourthStatus.style.color = "red";

      firstStatus.innerHTML = "hash = " + element + " % 10 = " + (element % 10);
      await sleep(500);
      if (method != "ht") {
        if (method === "dh") {
          secondStatus.innerHTML =
            "hash2 = 7 - ( " + element + " % 7 ) = " + (7 - (element % 7));
          secondStatus.innerHTML += ", i = " + temp;
        } else {
          secondStatus.innerHTML = "i = " + temp;
        }
      }

      await sleep(500);
      if (method === "ht") thirdStatus.innerHTML = "Index = hash = " + position;
      else if (method === "lp")
        thirdStatus.innerHTML = "Index = (hash + i)%10 = " + position;
      else if (method === "qp")
        thirdStatus.innerHTML = "Index = (hash + i*i)%10 = " + position;
      else if (method === "dh")
        thirdStatus.innerHTML = "Index = (hash + i*hash2)%10 = " + position;

      await sleep(500);
      if (method != "ht") fourthStatus.innerHTML = "Collision Occured";
      else if (operation != "insert")
        fourthStatus.innerHTML = "Element Not Found!";

      show(position, "red", table);
      await sleep(1000);

      // Reasoning for probe cycling (should not happen with coprime hash2)
      if (visitedPositions.has(position)) {
        reasoningMessages =
          `<div style="color:#d9534f;"><b>Sorry, the element ${element} cannot be added.</b><br>` +
          `Even with a coprime hash2, all slots are occupied or the probe sequence cycled. Try resetting the table or using a different value.</div>`;
        if (warningBox) {
          warningBox.innerHTML = reasoningMessages;
          warningBox.style.textAlign = "center";
        }
        return;
      }
      visitedPositions.add(position);

      temp++;
      if (method != "ht")
        position = jump(method, originalPosition, temp, element);
      else break;
    } else {
      // Element already exists
      firstStatus.style.color = "black";
      secondStatus.style.color = "black";
      thirdStatus.style.color = "black";
      fourthStatus.style.color = "#a4c652";

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

      if (operation === "insert") {
        fourthStatus.style.color = "#a4c652";
        fourthStatus.innerHTML = "Element already exists!";
        show(position, "#a4c652", table);
      } else if (operation === "search") {
        fourthStatus.style.color = "#a4c652";
        fourthStatus.innerHTML = "Element Found!";
        show(position, "#a4c652", table);
      } else if (operation === "remove") {
        fourthStatus.style.color = "#a4c652";
        fourthStatus.innerHTML = "Element Found!";
        practice_engine.size--;
        table[position].status = 2;
        table[position].data = "";
        fourthStatus.style.color = "#a4c652";
        fourthStatus.innerHTML = "Element Removed!";
        show(position, "#a4c652", table);
      }
      // No warning needed for already existing element
      if (warningBox) warningBox.innerHTML = "";
      return;
    }
  }

  // If slot is empty after probing, try to insert/search/remove
  if (table[position].status === 0 || table[position].status === 2) {
    firstStatus.innerHTML = "";
    secondStatus.innerHTML = "";
    thirdStatus.innerHTML = "";
    fourthStatus.innerHTML = "";
    firstStatus.style.color = "black";
    secondStatus.style.color = "black";
    thirdStatus.style.color = "black";

    firstStatus.innerHTML = "hash = " + element + " % 10 = " + (element % 10);
    await sleep(500);
    if (method != "ht") {
      if (method === "dh") {
        secondStatus.innerHTML =
          "hash2 = 7 - ( " + element + " % 7 ) = " + (7 - (element % 7));
        secondStatus.innerHTML += ", i = " + temp;
      } else {
        secondStatus.innerHTML = "i = " + temp;
      }
    }

    await sleep(500);
    if (method === "ht") thirdStatus.innerHTML = "Index = hash = " + position;
    else if (method === "lp")
      thirdStatus.innerHTML = "Index = (hash + i)%10 = " + position;
    else if (method === "qp")
      thirdStatus.innerHTML = "Index = (hash + i*i)%10 = " + position;
    else if (method === "dh")
      thirdStatus.innerHTML = "Index = (hash + i*hash2)%10 = " + position;
    await sleep(500);

    if (operation === "insert") {
      fourthStatus.style.color = "#a4c652";
      fourthStatus.innerHTML = "Element Added";
      table[position].data = element;
      table[position].status = 1;
      practice_engine.size++;
      show(position, "#a4c652", table);

      if (collisionOccurred) {
        reasoningMessages = `<div style="color:#5bc0de;"><b>The element ${element} was added after resolving collisions using double hashing with a coprime hash2 (${hash2}).</b></div>`;
        if (warningBox) {
          warningBox.innerHTML = reasoningMessages;
          warningBox.style.textAlign = "center";
        }
      } else {
        if (warningBox) warningBox.innerHTML = "";
      }
    } else if (operation === "search") {
      fourthStatus.style.color = "red";
      fourthStatus.innerHTML = "Element Not Found";
      show(position, "red", table);
      if (warningBox) warningBox.innerHTML = "";
    } else if (operation === "remove") {
      fourthStatus.style.color = "red";
      fourthStatus.innerHTML = "Element Not Found";
      show(position, "red", table);
      if (warningBox) warningBox.innerHTML = "";
    }
  }
};

// Also update the jump function for double hashing:
function jump(method, position, temp, element) {
  if (method === "lp") {
    return (position + temp) % 10;
  } else if (method === "qp") {
    return (position + temp * temp) % 10;
  } else if (method === "dh") {
    let hash2 = 7 - (element % 7);
    if (hash2 === 0) hash2 = 1;
    return (position + temp * hash2) % 10;
  }
}

var insert = function (method) {
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
