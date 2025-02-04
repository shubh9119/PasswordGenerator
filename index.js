const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

// intial setup of the password generator..
let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
//set strength circle color to grey
setIndicator("#ccc");

//set passwordLength
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
}
function setIndicator(color){
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}
function generateSymbol(){
    const randNum=getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);
}
function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }
}
//English>>>NO....Dsa>>No....MERN>>YES....OS>>no.....DBMS>>NO....CN>>>no.
//async function for copycontent...
async function copyContent(){
  try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    //this method would copy the password into the clipboard...
    copyMsg.innerText="copied";
  }
  catch(e){
    copyMsg.innerText="Failed";
  }
  //to make copy wala span visible>>>
  copyMsg.classList.add("active");//it means the active class is added into the that elem

  //to set the time for the elem to to visibele and then automatically get dissapeared
  setTimeout(()=>{
    copyMsg.classList.remove("active")
  },2000);//after the 2 sec the active status would be vanished...
}

//appplying the event listener on the slider>>>
inputSlider.addEventListener('input',(e)=>{
  passwordLength=e.target.value;//copying the slider value in to the passwordlengt=th on moving the slider
  handleSlider();//this will set the display input>>>.....
})
allCheckBox.forEach((checkbox)=>{
  checkbox.addEventListener('click',handleCheckBoxChange);
})


//event-listener on copy-button >.as when there is some password then copy else dunno copy
copyBtn.addEventListener('click',()=>{
  if(passwordDisplay)
  {
    //means jab koi password hoga tabhi to copy krege warna nhi karenege na...

    copyContent();
  }
})

//for checkboxes
function handleCheckBoxChange(){
  checkCount=0;
  allCheckBox.forEach((checkbox)=>{
    if(checkbox.checked){
      checkCount++;//means if there any change which is visible like clicking on the checkbox or uncchecking

    }
  })
  //special condition when the >>>slider at 1 and u have checked all the checkbox
  if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();//jab jab password ki length change hogi>>tab tab>>handleslider call hoga

  }

}
//lets work on the last password generator>>>
generateBtn.addEventListener('click',()=>{
  if(checkCount<=0) return;

  if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
  }
  //lets see the real logiv of the password
  password="";

  if(uppercaseCheck.checked){
    password=generateUpperCase();
  }
  if(lowercaseCheck.checked){
    password=generateLowerCase();
  }
  if(numbersCheck.checked){
    password=generateRandomNumber();
  }
  if(symbolsCheck.checked){
    password=generateSymbol();
  }
  let funcArr = [];

    if(uppercaseCheck.checked)
        funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowerCase);

    if(numbersCheck.checked)
        funcArr.push(generateRandomNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    //compulsory addition
    for(let i=0; i<funcArr.length; i++) {
        password += funcArr[i]();
    }
    console.log("COmpulsory adddition done");

    //remaining adddition
    for(let i=0; i<passwordLength-funcArr.length; i++) {
        let randIndex = getRndInteger(0 , funcArr.length);
        console.log("randIndex" + randIndex);
        password += funcArr[randIndex]();
    }
    console.log("Remaining adddition done");
    //shuffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");
    //show in UI
    passwordDisplay.value = password;
    console.log("UI adddition done");
    //calculate strength
    calcStrength();
});




function shufflePassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
      //random J, find out using random function
      const j = Math.floor(Math.random() * (i + 1));
      //swap number at i index and j index
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}














