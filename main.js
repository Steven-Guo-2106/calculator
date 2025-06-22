function add(a, b){
    return a+b;
};

function subtract(a, b){
    return a-b;
};

function multiply(a, b){
    return a*b;
};

function divide(a, b){
    return Math.floor(a/b*100)/100;
}

let num1 = "";
let num2 = "";
let operator = "";
let solved = false;

function operate(num1, num2, operator){
    if(operator == '+'){
        return add(num1, num2);
    } else if(operator == '-'){
        return subtract(num1, num2);
    } else if(operator == '*'){
        return multiply(num1, num2);
    } else {
        return divide(num1, num2);
    }
}

function backspace(string){
    return string.slice(0, string.length-1);
}



function makeCalc(){
    const display = document.querySelector('#display');
    const displayOp = document.createElement("p");
    displayOp.textContent = `${num1} ${operator} ${num2}`;
    display.appendChild(displayOp);


    const numbers = document.querySelector("#numbers");
    for(let i=1; i<11; i++){
        const num = document.createElement("button");
        num.setAttribute("class", "nums");
        num.textContent = `${i%10}`;
        num.addEventListener("click", ()=> {
            if(operator == ""){
                if(solved == true){
                    num1=""
                    solved=false;
                };
                num1 = num1*10 + i%10;
                displayOp.textContent = `${num1} ${operator} ${num2}`;
            } 
            if(operator !=""){
                num2 = num2*10 + i%10;
                displayOp.textContent = `${num1} ${operator} ${num2}`;
            }
        })
        numbers.appendChild(num);
    }

    const equals = document.createElement("button");
    equals.textContent = "=";
    equals.setAttribute("class", "nums");
    equals.addEventListener("click", ()=>{ 
        let solution = operate(num1, num2, operator);
        if(num1 !="" && num2 !="" && operator !=""){
            displayOp.textContent = solution;
            num1=solution;
            num2="";
            operator="";
            solved=true;
        } else {
            displayOp.textContent = `${num1} ${operator} ${num2}`;
        }
    });
    numbers.appendChild(equals);

    const operators = document.querySelectorAll(".operator");
    operators.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            if (btn.textContent == "clear"){
                num1="";
                num2="";
                operator="";
                displayOp.textContent = `${num1} ${operator} ${num2}`;
            } else if(btn.textContent == "del"){
                if(num2 != ""){
                    num2 = backspace(num2.toString());
                } else if (operator != ""){
                    operator = "";
                } else if(num1 != ""){
                    num1 = backspace(num1.toString());
                }
                displayOp.textContent = `${num1} ${operator} ${num2}`;
            } else {
                if(operator != "" && num2 !=""){
                    num1 = operate(num1, num2, operator);
                    operator = btn.textContent;
                    num2 = "";
                    displayOp.textContent = `${num1} ${operator} ${num2}`;
                }
                operator = btn.textContent;
                displayOp.textContent = `${num1} ${operator} ${num2}`;
            }

        })
    })
}

makeCalc();