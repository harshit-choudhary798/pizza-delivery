 import axios from 'axios'
 let cartCounter = document.querySelector('#cartCounter')
 let addToCart = document.querySelectorAll('.add-to-cart')

 function updateCart(pizza) {
        axios.post('/update-cart',pizza).then(res=>{
            cartCounter.innerText = res.data.totalQty
            console.log(res);
        })  
 }
 
 addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})
