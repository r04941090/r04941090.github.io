let url = 'https://raw.githubusercontent.com/r04941090/FileStorage/master/iPhone.json'
let image = document.querySelector('#image');
let typeGroup = document.querySelector('#type-group');
let capacityGroup = document.querySelector('#capacity-group');
let colorGroup = document.querySelector('#color-group');

colorGroup.addEventListener('click', updateColor, false)
capacityGroup.addEventListener('click', updateCapacity, false)
typeGroup.addEventListener('click', updatePhoneType, false)

let currentSelect = {
    phoneType:'iphone12Pro',
    color:'darkImage',
    capacity:'128'
}

let iphoneData;
window.onload = function(){
    fetch(url)
        .then(response => response.json())
        .then(result => {
            // console.log(result);
            iphoneData = result.iphone
            // console.log(iphoneData);

        })
}
function updateColor(e){
    // console.log('aa', this);
    if(e.target.nodeName == 'INPUT'){
        let colorInput = document.querySelectorAll('#color-group input');
        let colorLabel = document.querySelectorAll('#color-group label');
        currentSelect.color = e.target.value;
        colorInput.forEach((item, index) => {
            if(item.value == currentSelect.color){
                colorLabel[index].style['borderColor'] = '#0071e3'
                colorLabel[index].style['borderWidth'] = '3px'
                // colorLabel[index].classList.add('btn-border-color-active')
                // https://www.fooish.com/javascript/dom/css.html
            }
            else{
                colorLabel[index].style['borderColor'] = ''
                colorLabel[index].style['borderWidth'] = ''
            }
        })
        // console.log(e.target);
        iphoneData.forEach(item => {
            if(item.phoneType == currentSelect.phoneType){
                let totalColorKeys = Object.keys(item.imageType)
                let totalColorValues = Object.values(item.imageType)
                console.log(totalColorKeys, totalColorValues);
                // console.log(e.target.value);
                let index = totalColorKeys.indexOf(e.target.value)
                // console.log(totalColorValues[index]);
                image.src = totalColorValues[index]
            }
        })
    }
}
function updatePhoneType(e){
    console.log(e.target);
    window.location.hash = ''
    // 錨點 (#xxxxx)
    // console.log(this.id);
    // currentSelect.phoneType = this.id;
    // this 看是哪個物件呼叫這個方法
    // console.log(currentSelect);
    // console.log(e.target.nodeName)
    if(e.target.nodeName == "INPUT"){
        currentSelect.phoneType = e.target.value
        let colorInput = document.querySelectorAll('#type-group input');
        let colorLabel = document.querySelectorAll('#type-group label');
        currentSelect.phoneType = e.target.value;
        colorInput.forEach((item, index) => {
            if(item.value == currentSelect.phoneType){
                colorLabel[index].style['borderColor'] = '#0071e3'
                colorLabel[index].style['borderWidth'] = '3px'
                // colorLabel[index].classList.add('btn-border-color-active')
                // https://www.fooish.com/javascript/dom/css.html
            }
            else{
                colorLabel[index].style['borderColor'] = ''
                colorLabel[index].style['borderWidth'] = ''
            }
        })
        window.document.documentElement.scrollTop = 243
        updateUI()
        updateUIPrice()
    }
}

function updateCapacity(e){
    if(e.target.nodeName == "INPUT"){
        currentSelect.capacity = e.target.value;
        let colorInput = document.querySelectorAll('#capacity-group input');
        let colorLabel = document.querySelectorAll('#capacity-group label');
        currentSelect.capacity = e.target.value;
        colorInput.forEach((item, index) => {
            if(item.value == currentSelect.capacity){
                colorLabel[index].style['borderColor'] = '#0071e3'
                colorLabel[index].style['borderWidth'] = '3px'
                
                // colorLabel[index].classList.add('btn-border-color-active')
                // https://www.fooish.com/javascript/dom/css.html
            }
            else{
                colorLabel[index].style['borderColor'] = ''
                colorLabel[index].style['borderWidth'] = ''
            }
        })
        // console.log(e.target);
        // console.log(currentSelect);
        updateUIPrice()
    }
    
    // console.log(currentSelect);
    
}

function updateUIPrice(){
    iphoneData.forEach(item => {
        if(item.phoneType == currentSelect.phoneType){
            let totalContentvalues = Object.values(item.content)
            totalContentvalues.forEach(item => {
                // console.log(item.capacity);
                // console.log(currentSelect.capacity.split('_')[1]);
                // http://www.eion.com.tw/Blogger/?Pid=1015
                if(item.capacity == currentSelect.capacity){
                    let totalPrice = document.querySelectorAll('.totalPrice');
                    let tax = document.querySelector('#tax');
                    let pricePerMonth = document.querySelector('#pricePerMonth');
                    tax.textContent = parseInt(item.tax).toLocaleString('en-US')
                    pricePerMonth.textContent = parseInt(item.perCost).toLocaleString('en-US')
                    totalPrice.forEach(price => {
                        price.textContent = parseInt(item.price).toLocaleString('en-US')
                    })
                }
            })
        }
    })
}


function updateUI(){
    let Price_128GB = document.querySelector('#Price_128')
    let Price_256GB = document.querySelector('#Price_256')
    let Price_512GB = document.querySelector('#Price_512')
    const Price_capacity = [
        Price_128GB,
        Price_256GB,
        Price_512GB
    ]
    iphoneData.forEach(item => {
        if(item.phoneType == currentSelect.phoneType){
            // console.log(item);
            // 更新容量價格
            let totalContentvalues = Object.values(item.content)
            // console.log(totalContentvalues);
            totalContentvalues.forEach((item, index) => {
                // console.log(item.price);
                // console.log(Price_capacity[0]);
                let priceInt = parseInt(item.price)
                Price_capacity[index].textContent = priceInt.toLocaleString('en-US')
                // https://www.delftstack.com/zh-tw/howto/javascript/javascript-add-commas-to-number/
            })
            // 更新圖片
            if(currentSelect.color == ''){
                console.log(item.imageType.blackImage);
                // console.log(image);
                image.src = item.imageType.blackImage
            }
            else{
                let totalColorKeys = Object.keys(item.imageType)
                let totalColorValues = Object.values(item.imageType)
                // console.log(totalColorKeys);
                // console.log(totalColorValues);
                let index = totalColorKeys.indexOf(currentSelect.color)
                // console.log(index);
                image.src = totalColorValues[index]
            }
        }
    })
}