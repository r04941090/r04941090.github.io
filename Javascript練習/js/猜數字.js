let answer = [];
let start = document.querySelector('#start');

let eluserAnswer = document.querySelector('#answer');
let elguess = document.querySelector('#guess');
let elreset = document.querySelector('#reset');
let elreveal = document.querySelector('#reveal');
let listgroup = document.querySelector('.list-group');

window.onload = function(){
    start.addEventListener('click', getAnswer, false)
    start.disabled = false;
    elguess.disabled = true;
    elreset.disabled = true;
    elreveal.disabled = true
}
function revealFunction(){
    let answerString = ''
    answer.forEach(item =>{
        answerString += item
    })
    alert(`Answer：${answerString}`)
}
function resetFunction(){
    listgroup.innerHTML = ''
    start.disabled = false;
    elreveal.disabled = true;
    elreset.disabled = true;
    elguess.disabled = true;
    revealFunction();
    answer = [];
}
function getAnswer(){
    let rndNumber;
    while(answer.length < 4){
        rndNumber = Math.floor(Math.random() * 9);
        if(answer.findIndex((x) => x == rndNumber) == -1){
            // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
            // 幾個 =？
            answer.push(rndNumber);
        }
    }
    listgroup.innerHTML = ''
    eluserAnswer.value = ''
    elguess.disabled = false;
    elreset.disabled = false;
    elreveal.disabled = false
    start.disabled = true;
    elguess.addEventListener('click', checkAnswer, false)
    elreset.addEventListener('click', resetFunction, false)
    elreveal.addEventListener('click', revealFunction, false)
    console.log(answer);
}
function checkAnswer(){
    let A = 0;
    let B = 0;
    let userAnswer = eluserAnswer.value.split('');
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
    if(numberRule()){
        for(let i = 0; i < userAnswer.length; i++){
            let index = answer.findIndex((x) => x == userAnswer[i])
            if(index != -1){
                if(index == i){
                    A++
                }
                else{
                    B++
                }
            }
        }
        updateHTML(A, B)
        console.log(A, B);
    }
}
function updateHTML(A, B){
    let li = document.createElement('li')
    let liTextnode = document.createTextNode(eluserAnswer.value)
    // p3-31，建立文字節點
    let span = document.createElement('span')
    let spanTextnode = document.createTextNode(`${A}A${B}B`)
    li.classList.add('list-group-item', 'd-flex', 'align-items-center' )
    span.classList.add('badge', 'me-1')
    if(A == 4){
        span.classList.add('bg-success')
        alert('恭喜答對！')
    }
    else{
        span.classList.add('bg-danger')
    }
    span.appendChild(spanTextnode)
    li.appendChild(span);
    li.appendChild(liTextnode)
    listgroup.appendChild(li)
    // 順序會影響顯示
    eluserAnswer.value = ''
    console.log(li);
}
function numberRule(){
    let alertDialogs = [];
    let r = /^\d+$/;
    // /^\d{4}/
    if(eluserAnswer.value.split('').length != 4){
        alertDialogs.push('請確認輸入的長度')
    }
    if(!r.test(eluserAnswer.value)){
        alertDialogs.push('請輸入整數')
    }
    else{
        let repeat = false
        eluserAnswer.value.split('').forEach((item, index) => {
            if(eluserAnswer.value.split('').findIndex((x) => x == item) != index){
                repeat = true
            }
        })
        if(repeat){
            alertDialogs.push('請輸入"不重複"的整數')
        }
    }
    if(alertDialogs.length == 0){
        console.log('test');
        return true
    }
    else{
        let alertDialog = ''
        alertDialogs.forEach((item, index) => {
            alertDialog += `${index + 1}. ${item} \n`
        })
        alert(alertDialog);
        eluserAnswer.value = ''
        return false
    }
}