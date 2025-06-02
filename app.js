let input = document.querySelector(".input");
let btns = document.querySelectorAll(".btn");
let strr ="";
let bracketToggle = true;
const clickSound = new Audio("buttons.mp3"); // or use full URL for hosted sound

//loop for calculation
Array.from(btns).forEach((btn)=>{
  btn.addEventListener(("click"),(e)=>{
  //sound effect
    clickSound.pause();
    clickSound.currentTime = 0; // rewind to start
    clickSound.play();
    let value = e.target.textContent.trim();
  //animate border
    btn.classList.add("animate-radius","bg");
  setTimeout(() => {
    btn.classList.remove("animate-radius","bg");
  },100);
  //calculation
    if(value =="="){
      try{
  // when click only = for multiple times
      if(strr.trim() === "") return;
  //modulus problem
      strr = strr.replace(/x/g,"*");
      strr = strr.replace(/(\d+(\.\d+)?)(%)\s*(\d+(\.\d+)?)/g, (match, p1, _, __, p4) => {
       return `((${p1}/100)*${p4})`;
        });
      strr = strr.replace(/(\d+(\.\d+)?)%/g, (match, p1, p2, offset, string) => {
  // Find the previous number to multiply with, if exists
          let before = string.slice(0, offset).match(/(\d+(\.\d+)?)(?!.*\d)/);
          if (before) {
            return `(${p1}/100*${before[1]})`;
          } else {
            return `(${p1}/100)`;
          }
        });
      strr = eval(strr);
      input.value = strr;
      }catch (err){
        console.log(err);
        strr ="";
        input.value= strr;
      }
      
    }
  //AC button
    else if (value =="AC"){
      strr = "";
      input.value = strr;

    }
  //delete Button
    else if (e.target.closest(".btn").getAttribute("data-value") =="del"){
      strr = strr.slice(0,-1);
      input.value = strr;
    }
  //bracket Problem
    else{
      if(e.target.getAttribute("data-value") == "()" && bracketToggle == true) {
        value = "(";
        bracketToggle= false;
      }else if(e.target.getAttribute("data-value")== "()" && bracketToggle== false){
        value = ")";
        bracketToggle=true;
      }
  //decimal problem
      if (value === ".") {
        let lastSegment = strr.split(/[\+\-\*\/]/).pop();
        if (lastSegment.includes(".")) {
        return;
        }
        if (lastSegment === "") {
        value = "0.";
        }
      }
  //display output
      strr += value;
      input.value = strr;
    }
  });
});
