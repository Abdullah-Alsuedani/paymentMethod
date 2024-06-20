
let count = 60;

let visaSection = `
         <div class="form-section">
                <h2>الدفع ببطاقة الفيزا</h2>
                <hr>
                <form action="" method="get">
                    <div class="inputdiv">
                        <span><i class="fa-brands fa-cc-visa"></i></span>
                        <input class="cardNumber" type="tel" inputmode="numeric" 
                        autocomplete="cc-number" maxlength="16" minlength="16"
                        placeholder="رقم البطاقة" required>
                    </div>
                    <div class="inputcont">
                        <div class="inputdiv">
                            <span><i class="fa-solid fa-lock"></i></span>
                            <input class="cvv" type="password"  inputmode="numeric" maxlength="3" minlength="3" placeholder="cvv" required>
                        </div>
                        <div class="inputdiv">
                            <span><i class="fa-solid fa-calendar"></i></span>
                            <select name="">
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                <option value="2031">2031</option>
                                <option value="2032">2032</option>
                                <option value="2033">2033</option>
                                <option value="2034">2034</option>
                                <option value="2035">2035</option>
                                <option value="2036">2036</option>
                            </select>
                            <select name="">
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                    </div>
                    <input class="submitPay" type="submit" value="ادفع">
                </form>
            </div>

`

let validationSection = `

    <div class="validation">
        <h2>قم بتأكيد الدفع</h2>
        <hr>
        <form>
        <input  class='verfic' type='tel' maxlength='8' minlength="3" placeholder="أدخل رمز التأكيد">
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

let headOfContent = document.querySelector('.contentOfPage .content .headOfContent')

let userName = 'أحمد الخطيب'
let helloMsg = `<h2>مرحبا بك ${userName}</h2>`
headOfContent.innerHTML = helloMsg


let todayYear = new Date().getFullYear();

let todayMonth = new Date().getMonth();

let Money = document.querySelector('.money')

let hiBtn = document.querySelector('.hiBtn')


function valid(el){
    el.addEventListener('input', function(){
        if(isNaN(Number(el.value))){
            el.value = el.value.slice(0,-1);
        }else{
            el.value = el.value
        }
    })
}


valid(Money)

hiBtn.addEventListener('click', function(){
        if(Money.value.length > 0){
            contenOfPage.innerHTML = loader
        setTimeout(()=>{
            contenOfPage.innerHTML = visaSection
            let dateYear = document.querySelector('select:first-of-type')
            let dateMonth = document.querySelector('select:last-of-type')
            let submitPay = document.querySelector('.submitPay')
            let cardNumber = document.querySelector('.cardNumber')
            let cardCvv = document.querySelector('.cvv')


            valid(cardNumber);
            valid(cardCvv);


            submitPay.addEventListener('click', function(el){
                el.preventDefault()
                if(cardNumber.value.length == 16 && cardCvv.value.length == 3){
                    if(Number(dateYear.value) == todayYear && Number(dateMonth.value) > todayMonth || Number(dateYear.value) > todayYear){
                        contenOfPage.innerHTML = loader
            
                        setTimeout(() => {
                            contenOfPage.innerHTML = validationSection
                            let verfic = document.querySelector('.verfic')
                            valid(verfic)
                            let resend = document.querySelector('.validation p') 
                                    let myInterval = setInterval(function(){
                                    count--
                                    resend.innerHTML = `أعد ارسال الرمز ${count}`
                                    if(count == 0){
                                        clearInterval(myInterval)
                                        resend.style.color = "#8b0000"
                                        }
                                    }, 1000)
                            
                                setTimeout(() => {
                

                        
                                    let doneBtn = document.querySelector('.validation input[type="submit"]')
                        
                                    doneBtn.addEventListener('click', function(el){
                                        el.preventDefault()
                                        if(verfic.value.length >= 3 && verfic.value.length <= 8){
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
                        }, 3000);
                    }else{
                        alert('أدخل تاريخ صالح')
                    }
                }else{
                    alert("أدخل المعلومات بشكل صحيح")
                }
            
            
            
            })
        }, 3000)
    }else{
        alert('أدخل رقم صحيح')
    }
})




