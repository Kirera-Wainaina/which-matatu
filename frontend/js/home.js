window.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo");
    logo.addEventListener(
	"animationend",
	() => {
	    const logoQuestion = document.querySelector("#logo span");
	    logoQuestion.style.animation = "1s hanging forwards";
	})
})
