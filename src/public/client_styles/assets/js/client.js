const login = document.querySelector('.open-login') 
const sign_up =document.querySelector('.open-signup') 
const cart =document.querySelector('.header__cart-icon') 
const notify =document.querySelector('.open-login-noti') 
const modal =document.querySelector('.modal') 
const modals =document.querySelector('.modal-logup') 
const modalClose =document.querySelector('.modal-close') 
const modalsClose =document.querySelector('.modals-close') 
function show() {
modal.classList.add('open') } 
function shows() {
modals.classList.add('open') } login.addEventListener('click', show)
sign_up.addEventListener('click', shows) 
cart.addEventListener('click',show) 
notify.addEventListener('click', show) 
function hideshow() {
modal.classList.remove('open') } modalClose.addEventListener('click',
hideshow) 
function hideshows() { modals.classList.remove('open') }
modalsClose.addEventListener('click', hideshows)


var li=document.getElementsByClassName('header__search-option-item')
li[0].addEventListener('click',l0_click)
li[1].addEventListener('click',l1_click) 
function l0_click(){
li[0].classList.add('header__search-option-item--active')
li[1].classList.remove('header__search-option-item--active') } 
function l1_click(){ li[1].classList.add('header__search-option-item--active')
li[0].classList.remove('header__search-option-item--active') }

