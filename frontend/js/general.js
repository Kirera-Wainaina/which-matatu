window.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo");
    logo.addEventListener(
	"animationend",
	() => {
	    const logoQuestion = document.querySelector("#logo span");
	    logoQuestion.style.animation = "1s hanging forwards";
	})
})

const matchQuery = window.matchMedia("(max-width: 500px)");
matchQuery.addEventListener("change", handleMenu);

window.addEventListener("DOMContentLoaded", handleMenu);

const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("menu");

function handleMenu() {
    if (matchQuery.matches) {
	menu.style.display = "none";
	menuIcon.style.display = "flex";
    } else {
	menu.style.display = "flex";
	menuIcon.style.display = "none";
    }
}

menuIcon.addEventListener("click", () => {
    menu.style.display = "flex";
});

document.addEventListener("click", event => {
    if (menu.style.display == "flex") {
	menu.style.display = "none";
    }
    if (event.target.id == "menu-icon") {
	menu.style.display = "flex";
    }
});
