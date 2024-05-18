let boxes=document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO = true;//PlayerX,PlayerO
let buttonClickCount=0;

const winPattern = [
    [0,1,2],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    turnO=true;
    buttonClickCount=0;
    msgContainer.classList.add("hide");
    enabledBoxes();
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("Box was Clicked");
        if(turnO){
            box.innerText="O";
            box.style.color="#0b132b";
            turnO = false;
        }
        else{
            box.innerText="X";
            box.style.color="#2b1572";
            turnO = true;
        }
        box.disabled = true; //ek bar x ya o daalne ke baad dubara change na ho 
        buttonClickCount++;
        checkWinner();
        let isWinner = checkWinner();
        if(buttonClickCount===9 && !isWinner){
            gameDraw();
        }

    });
});

const disabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enabledBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

const showWinner =(winner)=>{
    msg.innerText=`Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};

const gameDraw=()=>{
    msg.innerText="Game was a Draw";
    msgContainer.classList.remove("hide");
    disabledBoxes();
}
const checkWinner=()=>{
    for(let pattern of winPattern){
        // console.log(pattern[0],pattern[1],pattern[2]);
        // console.log(
        //     boxes[pattern[0]].innerText,
        //     boxes[pattern[1]].innerText,
        //     boxes[pattern[2]].innerText
        // );
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!=""){
            if(pos1val===pos2val && pos2val===pos3val){
                // console.log("Winner",pos1val);
                showWinner(pos1val);
            }
        }
    }
};




newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
