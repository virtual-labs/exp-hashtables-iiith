class checkerClass {
  constructor() {
    this.allCorrect = 0;
    this.status = [];
    this.answersHT = ["", "41", "82", "63", "94", "45", "", "", "", "89"];
    this.answersLP = ["", "1", "21", "33", "41", "75", "45", "", "", ""];
    this.answersQP = ["41", "1", "21", "33", "", "75", "45", "", "", ""];
    this.answersDH = ["75", "1", "", "33", "44", "21", "", "", "", "41"];
    this.questionNumber = 0;
    this.answersA = ["80", "41", "82", "", "44", "45", "66", "", "", "89"];
    this.answersB = ["", "41", "82", "63", "94", "45", "", "", "", "99"];
    this.answersC = ["70", "51", "", "43", "94", "", "", "77", "", "79"];
    this.answersD = ["50", "21", "", "73", "", "55", "", "", "88", "89"];
    this.answersE = ["0", "11", "", "", "74", "15", "96", "", "", "69"];
    this.answersF = ["", "11", "62", "53", "74", "65", "", "", "", "19"];
    this.answersG = ["70", "71", "", "73", "74", "75", "76", "", "", ""];
    this.answersH = ["", "", "32", "93", "44", "", "", "87", "98", "19"];
  }
}
let checker = new checkerClass();

var check = function (method) {
  var htmltitle = document.getElementById("htmltitle").innerHTML;
  var method = "";

  if (htmltitle === "Double Hashing Exercise") method = "dh";
  else if (htmltitle === "Hash Tables Exercise") method = "ht";
  else if (htmltitle === "Quadratic Probing Exercise") method = "qp";
  else if (htmltitle === "Linear Probing Exercise") method = "lp";

  var values = [];
  for (i = 0; i < 10; i++)
    values[i] = document.getElementById(i.toString()).value;
  var answers;
  if (method === "ht") answers = checker.answersHT;
  else if (method === "lp") answers = checker.answersLP;
  else if (method === "qp") answers = checker.answersQP;
  else if (method === "dh") answers = checker.answersDH;

  for (i = 0; i < 10; i++) {
    if (values[i] === answers[i]) checker.status[i] = 1;
    else checker.status[i] = 0;
  }
  checker.allCorrect = 1;

  for (i = 0; i < 10; i++) {
    var temp = document.getElementById(i.toString());
    if (checker.status[i] && values[i] !== "") {
      temp.style.background = "#a4c652"; // Correct and filled
    } else if (answers[i] !== "" && values[i] === "") {
      checker.allCorrect = 0;
      temp.style.background = "red"; // Should be filled but is empty
    } else {
      temp.style.background = "white"; // Empty and expected to be empty
    }
  }

  if (checker.allCorrect) {
    document.getElementById("further").style.display = "block";
    document.getElementById("further").style.maxWidth = "700px";
    for (let i = 0; i < 10; i++) {
      document.getElementById("button" + i).style.borderRadius = "100%";
      document.getElementById("button" + i).style.boxShadow = "2px 2px #888888";
      document.getElementById("button" + i).style.boxShadowOpacity = "30%";
    }
  }

  document.getElementById("exercisestatus").style.display = "block";
};

var newques = function () {
  var htmltitle = document.getElementById("htmltitle").innerHTML;
  var method = "";

  if (htmltitle === "Double Hashing Exercise") method = "dh";
  else if (htmltitle === "Hash Tables Exercise") method = "ht";
  else if (htmltitle === "Quadratic Probing Exercise") method = "qp";
  else if (htmltitle === "Linear Probing Exercise") method = "lp";

  checker.questionNumber += 1;
  var questionelement = document.getElementById("thequestion");
  if (checker.questionNumber === 9) checker.questionNumber = 1;
  if (checker.questionNumber === 1) {
    questionelement.innerHTML =
      "Insert 66, 80, 41, 44, 82, 89 and 45 in the given hash table.";
    if (method === "ht") checker.answersHT = checker.answersA;
    else if (method === "lp") checker.answersLP = checker.answersA;
    else if (method === "qp") checker.answersQP = checker.answersA;
    else if (method === "dh") checker.answersDH = checker.answersA;
  } else if (checker.questionNumber === 2) {
    questionelement.innerHTML =
      "Insert 82, 63, 41, 99, 94 and 45 in the given hash table.";
    if (method === "ht") checker.answersHT = checker.answersB;
    else if (method === "lp") checker.answersLP = checker.answersB;
    else if (method === "qp") checker.answersQP = checker.answersB;
    else if (method === "dh") checker.answersDH = checker.answersB;
  } else if (checker.questionNumber === 3) {
    questionelement.innerHTML =
      "Insert 70, 51, 43, 94, 77 and 79 in the given hash table.";
    if (method === "ht") checker.answersHT = checker.answersC;
    else if (method === "lp") checker.answersLP = checker.answersC;
    else if (method === "qp") checker.answersQP = checker.answersC;
    else if (method === "dh") checker.answersDH = checker.answersC;
  } else if (checker.questionNumber === 4) {
    questionelement.innerHTML =
      "Insert 50, 21, 73, 55, 88 and 89 in the given hash table.";
    if (method === "ht") checker.answersHT = checker.answersD;
    else if (method === "lp") checker.answersLP = checker.answersD;
    else if (method === "qp") checker.answersQP = checker.answersD;
    else if (method === "dh") checker.answersDH = checker.answersD;
  } else if (checker.questionNumber === 5) {
    questionelement.innerHTML =
      "Insert 0, 74, 11, 69, 96 and 15 in the given hash table.";
    if (method === "ht") checker.answersHT = checker.answersE;
    else if (method === "lp") checker.answersLP = checker.answersE;
    else if (method === "qp") checker.answersQP = checker.answersE;
    else if (method === "dh") checker.answersDH = checker.answersE;
  } else if (checker.questionNumber === 6) {
    questionelement.innerHTML =
      "Insert 53, 62, 11, 19, 74 and 65 in the given hash table.";
    if (method === "ht") checker.answersHT = checker.answersF;
    else if (method === "lp") checker.answersLP = checker.answersF;
    else if (method === "qp") checker.answersQP = checker.answersF;
    else if (method === "dh") checker.answersDH = checker.answersF;
  } else if (checker.questionNumber === 7) {
    questionelement.innerHTML =
      "Insert 70, 71, 73, 74, 75 and 76 in the given hash table.";
    if (method === "ht") checker.answersHT = checker.answersG;
    else if (method === "lp") checker.answersLP = checker.answersG;
    else if (method === "qp") checker.answersQP = checker.answersG;
    else if (method === "dh") checker.answersDH = checker.answersG;
  } else if (checker.questionNumber === 8) {
    questionelement.innerHTML =
      "Insert 32, 93, 44, 87, 98 and 19 in the given hash table.";
    if (method === "ht") checker.answersHT = checker.answersH;
    else if (method === "lp") checker.answersLP = checker.answersH;
    else if (method === "qp") checker.answersQP = checker.answersH;
    else if (method === "dh") checker.answersDH = checker.answersH;
  }

  restart();
};

var restart = function () {
  for (let i = 0; i < 10; i++) {
    checker.status[i] = 0;
    document.getElementById(i.toString()).style.background = "white";
    document.getElementById(i.toString()).value = "";
  }
};

var handlers = function () {
  document.getElementById("submitbutton").addEventListener("click", check);
  document.getElementById("newbutton").addEventListener("click", newques);
  document.getElementById("restartbutton").addEventListener("click", restart);
};

handlers();
