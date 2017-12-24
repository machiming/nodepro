checkB.onclick=function () {

}
checkB.querySelector(".circle").addEventListener("transitionend",function (event) {
    checkB.querySelector(".circle").classList.remove('active')
});



