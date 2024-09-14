let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [           //creating 2D array of Winning patterns
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {                      //cunstruction of reset game funtion
    turnO = true; 
    count = 0;
    enableBoxes();                            //used enableBoxes funtion
    msgContainer.classList.add("hide");       //added "hide" class in msgcontainer(div) so it will hide till "hide" not get removed from it
}


boxes.forEach((box) => {                      //handling event for each boxes
    box.addEventListener("click", () => {     //if any box is clicked and turn of playerO is true the innerText of box = "O" 
        console.log("box was clicked");
        
        if (turnO === true){  
            box.innerText = "O";
            turnO = false;                   //and then turn of playerO become false so next turn should be of playerX
        }
        else{
            box.innerText = "X";            //if any box is clicked and turn of playerO is false the innerText of box = "X" 
            turnO = true;                   //and then turn of playerO become true so next turn should be of playerO
        }
        box.disabled = true;               //if any box clicked and innerText is entered in it then it get disable so its text can not get change by clicking it again
        count++;        

        let isWinner = checkWinner();

        if (count === 9 && !isWinner)      //if the count of button clicked = 9 and no winner found then gameDraw method will be executed
        {                                  //but for this the checkWinner funtion should return false
            gameDraw();
        }

    });
});


const gameDraw = () => {
    msg.innerText = `Game was a Draw.`
    msgContainer.classList.remove("hide");     //removing Hide class from msgcontainer(div) by this msgcontainer(div) will get display
    disableBoxes();                    //disable button funtion                   
};



const disableBoxes = () => {             //cunstructed funtion to disable buttons 
    for (let box of boxes){              //after geting winner remaining buttons will be disabled so game will no be continued further
        box.disabled =true;
    }
}


const enableBoxes = () => {             //cunstructed funtion to enable buttons 
    for (let box of boxes){             //after getting winner when we reset the game all buttons get enabled again   
        box.disabled = false;
        box.innerText = "";             //also making innerText empty of all button 
    }
}


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;        
    msgContainer.classList.remove("hide");        //removing Hide class from msgcontainer(div) by this msgcontainer(div) will get display
    disableBoxes();               //disable button funtion                   
};



const checkWinner = () => {
    for (let pattern of winPatterns)
    {
        let pos1Val = boxes[pattern[0]].innerText;          //storing the inner text of patterns we added for  winning
        let pos2Val = boxes[pattern[1]].innerText;          
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "")   //if innerText in postions of patterns are non-empty then only it will check inner-conditon otherwise the loop will go on next pattern
        {
            if (pos1Val === pos2Val && pos2Val === pos3Val)    //if innerText in postions of patterns are same 
            {
                console.log("Winner",pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }
};


newGameBtn.addEventListener("click", resetGame);      
resetBtn.addEventListener("click", resetGame);


