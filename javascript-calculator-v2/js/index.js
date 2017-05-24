$(document).ready(function calculate() {
  var currentNum = 0;
  var tempNum = 0;
  var displayNum = "0";
  var compute = 0; //add = 1, minus = 2, multiply = 3, divide = 4, percentage = 5
  var lastButtonCLicked = 0;
  var percentNum = 0;
  var memoryNum = 0;
  var chainNum = 0;
  var chainCount = 0;
  var decimalCount = 0;

// memory functions buttons
  $('#MC').click(function(evt) {
    var MC = 0;
    //prevent browser's default action
    evt.preventDefault();
    memoryNum = 0;
    document.getElementById("display").innerHTML = "clear";
  }); //end MC button 

  $('#MPLUS').click(function(evt) {
    var MPLUS = 0;
    //prevent browser's default action
    evt.preventDefault();
    memoryNum = memoryNum + currentNum;
    document.getElementById("display").innerHTML = "M+ " + displayNum;
  }); //end MPLUS button    

  $('#MMINUS').click(function(evt) {
    var MMINUS = 0;
    //prevent browser's default action
    evt.preventDefault();
    memoryNum = memoryNum - currentNum;
    document.getElementById("display").innerHTML = "M- " + displayNum;
  }); //end MMINUS button   

  $('#MR').click(function(evt) {
    var MR = 0;
    //prevent browser's default action
    evt.preventDefault();
    currentNum = memoryNum;
    displayNum = memoryNum.toString();
    document.getElementById("display").innerHTML = displayNum;
  }); //end MMINUS button  
  
// end memory functions buttons
  
  
// clear functions buttons
  $('#AC').click(function(evt) {
    var AC = 0;
    //prevent browser's default action
    evt.preventDefault();
    currentNum = 0;
    displayNum = "0";
    chainNum = 0;
    chainCount = 0;
    decimalCount = 0;
    document.getElementById("display").style.fontSize = "45px";
    document.getElementById("display").innerHTML = 0;
  }); //end AC button

  $('#CE').click(function(evt) {
    var CE = 0;
    //prevent browser's default action
    evt.preventDefault();
    displayNum = displayNum.slice(0, -1);
    if (displayNum.length === 0) {
      currentNum = 0;
      displayNum = "0";
      document.getElementById("display").innerHTML = displayNum;
    } else {
      currentNum = Number(displayNum);
      document.getElementById("display").innerHTML = displayNum;
    }
    if (decimalCount === 1) {
      decimalCount = 0;
    }
  }); //end AC button  
  
// end clear functions buttons
  
  
  
// function to run when a number is clicked
  function numClick(literalNum, stringNum) {
    lastButtonCLicked = literalNum;
    
    if (displayNum === "0") {
      displayNum = displayNum.replace("0", stringNum);
      currentNum = literalNum;
      document.getElementById("display").innerHTML = displayNum;
    } else {
      displayNum = displayNum.concat(stringNum);
      currentNum = Number(displayNum);
      document.getElementById("display").innerHTML = displayNum;
    }
  }; //end numClick  
  

// 0-9 number click functions
  $('#zero').click(function(evt) {
    numClick(0, "0");    
  }); //end zero button   

  $('#one').click(function(evt) {
    numClick(1, "1");    
  }); //end one button    
  
  $('#two').click(function(evt) {
    numClick(2, "2");    
  }); //end two button    
      
  $('#three').click(function(evt) {
    numClick(3, "3");    
  }); //end three button 

  $('#four').click(function(evt) {
    numClick(4, "4");    
  }); //end four button 

  $('#five').click(function(evt) {
    numClick(5, "5");    
  }); //end five button 

  $('#six').click(function(evt) {
    numClick(6, "6");    
  }); //end six button 

  $('#seven').click(function(evt) {
    numClick(7, "7");    
  }); //end seven button 

  $('#eight').click(function(evt) {
    numClick(8, "8");    
  }); //end eight button 

  $('#nine').click(function(evt) {
    numClick(9, "9");    
  }); //end nine button 
  
// end number click functions
  
  
  
// decimal and computation buttons
  $('#decimal-point').click(function(evt) {
    lastButtonCLicked = 0.0;
    //prevent browser's default action
    evt.preventDefault();
    if (displayNum === "0" && decimalCount === 0) {
      displayNum = displayNum.replace("0", "0.");
      currentNum = 0.0;
      decimalCount = 1;
      document.getElementById("display").innerHTML = displayNum;
    } else if (decimalCount === 0) {
      displayNum = displayNum.concat(".");
      currentNum = Number(displayNum);
      decimalCount = 1;
      document.getElementById("display").innerHTML = displayNum;
    } else {
      displayNum = displayNum.concat("");
      currentNum = Number(displayNum);
      document.getElementById("display").innerHTML = displayNum;
    }
  }); //end decimal button  

  $('#add').click(function(evt) {
    compute = 1;
    tempNum = currentNum;
    chainNum = chainNum + currentNum;
    displayNum = "";
    currentNum = 0;
    chainCount++;
    decimalCount = 0;
    document.getElementById("display").innerHTML = chainNum.toString();
    //prevent browser's default action
    evt.preventDefault();
  }); //end add button

  $('#subtract').click(function(evt) {
    compute = 2;
    tempNum = currentNum;
    decimalCount = 0;
    if (chainNum === 0) {
      chainNum = Math.abs(chainNum - currentNum);
    } else {
      chainNum = chainNum - currentNum;
    }
    currentNum = 0;
    displayNum = "";
    chainCount++;
    document.getElementById("display").innerHTML = chainNum.toString();
    //prevent browser's default action
    evt.preventDefault();
  }); //end add button

  $('#multiply').click(function(evt) {
    compute = 3;
    tempNum = currentNum;
    decimalCount = 0;
    if (chainNum === 0) {
      chainNum = 1;
      chainNum = chainNum * currentNum;
    } else {
      chainNum = chainNum * currentNum;
    }
    currentNum = 0;
    displayNum = "";
    chainCount++;
    document.getElementById("display").innerHTML = chainNum.toString();
    //prevent browser's default action
    evt.preventDefault();
  }); //end multiply button

  $('#divide').click(function(evt) {
    compute = 4;
    tempNum = currentNum;
    decimalCount = 0;
    if (chainNum === 0) {
      chainNum = 1;
      chainNum = currentNum / chainNum;
    } else {
      chainNum = chainNum / currentNum;
    }
    currentNum = 0;
    displayNum = "";
    chainCount++;
    document.getElementById("display").innerHTML = chainNum.toString();
    //prevent browser's default action
    evt.preventDefault();
  }); //end divide button  

  $('#percentage').click(function(evt) { // Note: there seems to be some disparity on how the percentage button should work. On the iOS stock calculator, the percentage button simply outputs the result of the the percentage of the first number. However, most calculators take that result and add it to the original amount, turning the percentage button into a tax calculator of sorts. I have decided to use this second method as well.
    compute = 5;
    percentNum = currentNum;
    decimalCount = 0;
    console.log(chainCount);
    if (chainCount < 1) {
      document.getElementById("display").innerHTML = "0";
      currentNum = 0;
      displayNum = "";
    } else if (chainCount >= 1) {
      if (chainNum === 0) {
        chainNum = 1;
        chainNum = chainNum * (percentNum / 100);
        chainNum = chainNum + tempNum;
      } else {
        chainNum = chainNum * (percentNum / 100);
        chainNum = chainNum + tempNum;
      }
      currentNum = 0;
      displayNum = "";
      document.getElementById("display").innerHTML = chainNum.toString();
    }

    //prevent browser's default action
    evt.preventDefault();
  }); //end percentage button  

  $('#equal').click(function(evt) {
    decimalCount = 0;
    if (chainCount < 1) {
      if (compute == 1) {
        currentNum = tempNum + currentNum;
        displayNum = currentNum.toString();
      } else if (compute == 2) {
        currentNum = tempNum - currentNum;
        displayNum = currentNum.toString();
      } else if (compute == 3) {
        currentNum = tempNum * currentNum;
        displayNum = currentNum.toString();
      } else if (compute == 4) {
        currentNum = tempNum / currentNum;
        displayNum = currentNum.toString();
      }
      if (displayNum.length > 10) {
        document.getElementById("display").style.fontSize = "25px";
        document.getElementById("display").innerHTML = displayNum;
      } else {
        document.getElementById("display").innerHTML = displayNum;
      }
    } else if (chainCount >= 1) {
      if (compute == 1) {
        chainNum = chainNum + currentNum;
        displayNum = "";
        currentNum = 0;
        document.getElementById("display").innerHTML = chainNum.toString();
        chainCount = chainCount++;
      } else if (compute == 2) {
        tempNum = currentNum;
        if (chainNum === 0) {
          chainNum = Math.abs(chainNum - currentNum);
        } else {
          chainNum = chainNum - currentNum;
        }
        currentNum = 0;
        displayNum = "";
        document.getElementById("display").innerHTML = chainNum.toString();
      } else if (compute == 3) {
        tempNum = currentNum;
        if (chainNum === 0) {
          chainNum = 1;
          chainNum = chainNum * currentNum;
        } else {
          chainNum = chainNum * currentNum;
        }
        currentNum = 0;
        displayNum = "";
        document.getElementById("display").innerHTML = chainNum.toString();
      } else if (compute == 4) {
        tempNum = currentNum;
        if (chainNum === 0) {
          chainNum = 1;
          chainNum = currentNum / chainNum;
        } else {
          chainNum = chainNum / currentNum;
        }
        currentNum = 0;
        displayNum = "";
        document.getElementById("display").innerHTML = chainNum.toString();
      }
    }

    //prevent browser's default action
    evt.preventDefault();
  }); //end equal button

}); //end document ready