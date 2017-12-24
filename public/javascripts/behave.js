checkB.onclick=function () {
    checkB.querySelector(".circle").classList.add('active');
    dolog.classList.add('show');
}
checkB.querySelector(".circle").addEventListener("transitionend",function (event) {
    checkB.querySelector(".circle").classList.remove('active')
});



