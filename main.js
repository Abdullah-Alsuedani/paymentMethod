
let count = 60;

let validationSection = `

    <div class="validation">
        <h2>قم بتأكيد الدفع</h2>
        <hr>
        <form>
        <input  class='verfic' type='tel' maxlength='3' minlength="3" placeholder="أدخل رمز التأكيد">
        <p>أعد ارسال الرمز ${count}</p>
        <input type='submit' value='أكد الدفع'>
        </form>
    </div>

`

let loader = `
    <div class="loader">
    <div>
`


let contenOfPage = document.querySelector('.contentOfPage .content')

let submitPay = document.querySelector('.submitPay')

let cardNumber = document.querySelector('.cardNumber')
let cardCvv = document.querySelector('.cvv')


let dateYear = document.querySelector('select:first-of-type')
let dateMonth = document.querySelector('select:last-of-type')

let todayYear = new Date().getFullYear();

let todayMonth = new Date().getMonth();



cardNumber.addEventListener('input', function(){
    if(isNaN(Number(cardNumber.value))){
        cardNumber.value = cardNumber.value.slice(0,-1);
    }else{
        cardNumber.value = cardNumber.value
    }
})


cardCvv.addEventListener('input', function(){
    if(isNaN(Number(cardCvv.value))){
        cardCvv.value = cardCvv.value.slice(0,-1);
    }else{
        cardCvv.value = cardCvv.value
    }
})





submitPay.addEventListener('click', function(){
    if(cardNumber.value.length == 16 && cardCvv.value.length == 3){
        if(Number(dateYear.value) == todayYear && Number(dateMonth.value) > todayMonth){
            contenOfPage.innerHTML = loader

            setTimeout(() => {
                contenOfPage.innerHTML = validationSection
                let resend = document.querySelector('.validation p') 
                let myInterval = setInterval(function(){
                count--
                resend.innerHTML = `أعد ارسال الرمز ${count}`
                if(count == 0){
                    clearInterval(myInterval)
                    resend.style.color = "#8b0000"
                    }
                 }, 1000)
            }, 3000);
            
        }else if(Number(dateYear.value) > todayYear){
            contenOfPage.innerHTML = loader
            setTimeout(() => {
                contenOfPage.innerHTML = validationSection
                let resend = document.querySelector('.validation p') 
                let myInterval = setInterval(function(){
                count--
                resend.innerHTML = `أعد ارسال الرمز ${count}`
                if(count == 0){
                    clearInterval(myInterval)
                    resend.style.color = "#8b0000"
                    }
                 }, 1000)
            }, 3000);
        }else{
            alert('أدخل تاريخ صالح')
        }
    }else{
        alert("أدخل المعلومات بشكل صحيح")
    }

    setTimeout(() => {

            let verfic = document.querySelector('.verfic')
            
            verfic.addEventListener('input', function(){
                if(isNaN(Number(verfic.value))){
                    verfic.value = verfic.value.slice(0,-1);
                }else{
                    verfic.value = verfic.value
                }
            })

            let doneBtn = document.querySelector('.validation input[type="submit"]')

            doneBtn.addEventListener('click', function(el){
                el.preventDefault()
                if(verfic.value.length == 3){
                    let sended = false;
                    contenOfPage.innerHTML = loader
                    setTimeout(()=>{
                        if(sended){
                            contenOfPage.innerHTML = `
                                    <div class='done'>
                                        <div class='icon'>
                                            <i class="fa-solid fa-check"></i>
                                        </div>
                                        <p>تمت العملية بنجاح</p>
                                    </div>
                            `
                            document.querySelector(".icon").style.borderColor = '#97e010'
                            document.querySelector('.icon i').style.color = '#97e010'
                        }else{
                            contenOfPage.innerHTML = `
                            <div class='done'>
                                <div class='icon'>
                                    <i class="fa-solid fa-x"></i>
                                </div>
                                <p>لم تتم العملية بنجاح</p>
                            </div>
                    `
                        document.querySelector(".icon").style.borderColor = '#8b0000'
                        document.querySelector('.icon i').style.color = '#8b0000'
                        }
                    }, 3000)
                }else{
                    alert('أدخل كود صحيح')
                }
            })

    }, 3000);


})

