let generateNumber = document.querySelector('.generateNumber');
let btnGroup = document.querySelector('.btn-group');
let elenterNumber = document.querySelector('.enterNumber');
let elprompt = document.querySelector('.prompt');
let Answer;
let enterNumber = '';
let range = {
    min: 1,
    max: 100
}
window.onload = function(){

}
generateNumber.addEventListener('click', rndNumber, false)


function rndNumber(){
    let rndNumber = Math.floor(Math.random() * 100) + 1
    // https://ithelp.ithome.com.tw/articles/10197920
    console.log(rndNumber);
    Answer = rndNumber;
    btnGroup.addEventListener('click', btnFunction, false)
    // 按下後才新增監聽事件
}
let btnFunction = function(e){
    if(e.target.tagName === 'BUTTON'){
        enterNumber = elenterNumber.value
        let btnValue = e.target.value
        if(btnValue == 'clear'){
            enterNumber = '';
            console.log('clear');
        }
        else if(btnValue == 'send'){
            checkNumber()
            console.log('send');
            enterNumber = ''
        }
        else{
            enterNumber += btnValue
        }
        elenterNumber.value = enterNumber
    }
}
function checkNumber(){
    console.log(enterNumber, Answer);
    console.log(numberInRange());
    if(numberInRange()){
        if (parseInt(enterNumber) > parseInt(Answer)){
            // 猜的數字比答案大
            range.max = parseInt(enterNumber)
            console.log(range.min, Answer, range.max);
            elprompt.textContent = `${range.min} ~ ${range.max}`
        }
        else if(parseInt(enterNumber) < parseInt(Answer)){
            // 猜的數字比答案小
            range.min = parseInt(enterNumber)
            console.log(range.min, Answer, range.max);
            elprompt.textContent = `${range.min} ~ ${range.max}`
        }
        else if(parseInt(enterNumber) == parseInt(Answer)){
            alert('恭喜答對')
            btnGroup.removeEventListener('click', btnFunction, false)
            // 猜對後將監聽事件移除
            elprompt.textContent = '';
            range.min = 1;
            range.max = 100;
        }
    }
    else{
        alert('請輸入在範圍裡的數字')
    }
}
function numberInRange(){
    return parseInt(enterNumber) >= range.min && parseInt(enterNumber) <= range.max
}
function Initialize(){

}
