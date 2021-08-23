let day = document.querySelector('.day');
let tbody = document.querySelector('tbody');
let btnSub = document.querySelector('#btnSub');
let btnAdd = document.querySelector('#btnAdd');
let timeClass = {
    startDay: document.querySelector('#startDay'),
    startTime: document.querySelector('#startTime'),
    endDay: document.querySelector('#endDay'),
    endTime: document.querySelector('#endTime'),
}
let current = {
    year: 0,
    month: 0
}
let totalDay

window.onload = function(){
    let Today = new Date()
    current.year = Today.getFullYear()
    current.month = Today.getMonth() + 1
    updataDate()
    calculateDayOfMonth()
}
tbody.addEventListener('click', function(e){
    let dayCheck = document.querySelector('#dayCheck');
    editModal.show()
    showDate()
    let year = JSON.parse(e.target.id).year
    let month = JSON.parse(e.target.id).month.toString().padStart(2, 0)
    let day = JSON.parse(e.target.id).day.toString().padStart(2, 0)
    let wholeDay = `${year}-${month}-${day}`
    timeClass.startDay.value = wholeDay
    timeClass.endDay.value = wholeDay
    

    function showDate(){
        if(dayCheck.checked){
            timeClass.startTime.style.display = 'none'
            timeClass.endTime.style.display = 'none'
        }
        else{
            timeClass.startTime.style.display = ''
            timeClass.endTime.style.display = ''
        }
        timeClass.startDay.style.display = ''
        timeClass.endDay.style.display = ''
        timeClass.startTime.value = '00:00'
        timeClass.endTime.value = '00:00'
    }
    dayCheck.addEventListener('click', showDate)
})
// 月份 ++
btnSub.addEventListener('click', function(e){
    e.preventDefault();
    if (current.month == 1){
        current.month = 12
        current.year -= 1
    }
    else{
        current.month --
    }
    updataDate()
    calculateDayOfMonth()
})
// 月份 --
btnAdd.addEventListener('click', function(e){
    e.preventDefault();
    if (current.month == 12){
        current.month = 1
        current.year += 1
    }
    else{
        current.month ++
    }
    updataDate()
    calculateDayOfMonth()
})
// 更新畫面資料
function updataDate(){
    let year = document.querySelector('.year');
    let month = document.querySelector('.month');
    year.textContent = current.year
    month.textContent = current.month
}
// 取得需要顯示在畫面的日期陣列
function calculateDayOfMonth(){
    // 計算該當前月份有幾天
    let d = new Date(current.year , current.month, 0)
    let n = d.getDate()
    
    // 建立當前月份的陣列
    let MonthOfDay = []
    for(let i = 0; i < d.getDate(); i++){
        let data = {}
        data.year = parseInt(current.year );
        data.month = parseInt(current.month)
        data.day = i + 1
        MonthOfDay.push(data)
    }
    
    // 取得該月份第一天
    let weekday_first = new Date(current.year , current.month - 1, 1)
    // 取得該月份最後一天
    let weekday_last = new Date(current.year , current.month - 1, n)
    // 取得前一個月的末幾天
    let MonthOfDay_before = []
    for(let i = 0; i < weekday_first.getDay(); i++){
        let data = {}
        let MonthOfDay = new Date(current.year , current.month - 1, 0)
        data.year = parseInt(current.month) - 2 < 1 ? parseInt(current.year ) - 1 : parseInt(current.year )
        data.month = parseInt(current.month) - 2 < 0 ? parseInt(current.month) + 9 : parseInt(current.month) - 1
        data.day = MonthOfDay.getDate() - i
        MonthOfDay_before.push(data)
    }
    MonthOfDay_before.sort((a, b) => a.day - b.day)

    // 取得下一個月的前幾天
    let MonthOfDay_after = []
    for(let i = 0; i < 6 - weekday_last.getDay(); i++){
        let data = {}
        let MonthOfDay = new Date(current.year , current.month, 0)
        data.year = parseInt(current.month) > 11 ? parseInt(current.year ) + 1 : parseInt(current.year )
        data.month = parseInt(current.month) > 11 ? parseInt(current.month) - 11 : parseInt(current.month) + 1
        data.day = i + 1
        MonthOfDay_after.push(data)
    }
    MonthOfDay_after.sort((a, b) => a.day - b.day)

    // 總共要顯示在頁面上的日期
    totalDay = [...MonthOfDay_before, ...MonthOfDay, ...MonthOfDay_after]
    showData()
}
// 更新畫面
function showData(){
    tbody.innerHTML = '';
    for(let i = 0; i < totalDay.length / 7; i++ ){
        let tr = document.createElement('tr');
        let selectDay = totalDay.slice(i * 7, (i + 1) * 7)
        selectDay.forEach(item => {
            let td = document.createElement('td');
            if(item.month !== current.month){
                // 新增class
                td.classList.add('text-primary')
            }
            // 將日期轉成string放入id中
            td.id = JSON.stringify(item)
            td.innerText = item.day
            tr.appendChild(td)
        })
        tbody.appendChild(tr)
    }
}