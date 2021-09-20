const headElement = document.querySelector("head");
const script = document.createElement("script");
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAjL0Jw5llxuZBtiJUwv2BFTuPeHt_CXQQ&libraries=places&callback=initMap";
headElement.appendChild(script);

window.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo");
    logo.addEventListener(
	"animationend",
	() => {
	    const logoQuestion = document.querySelector("#logo span");
	    logoQuestion.style.animation = "1s hanging forwards";
	})
})

let service;
window.addEventListener("load", () => {
    service = new google.maps.places.AutocompleteService();
    const destination = document.getElementById("destination");
    destination.addEventListener("input", getPredictions);

    const boardingPoint = document.getElementById("boarding-point");
    boardingPoint.addEventListener("input", getPredictions);
});

function getPredictions(event) {
    const neKenya = new google.maps.LatLng({ lat: 4.995, lng: 42.764 });
    const swKenya = new google.maps.LatLng({ lat: -5.196, lng: 34.021 });
    service.getPlacePredictions(
	{ input: event.target.value,
	  bounds: new google.maps.LatLngBounds(swKenya, neKenya) },
	(predictions, status) => {
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
		const possibleId = "destination";
		if (event.target.id == possibleId) {
		    displayPredictions(
			predictions,
			document.getElementById("destination-prediction-container"));
		} else {
		    displayPredictions(
			predictions,
			document.getElementById("boarding-prediction-container"));
		}
	    }
	});
    removePreviousPredictions();
    
}

function displayPredictions(predictions, predictionContainer) {
    const fragment = new DocumentFragment();
    predictions.forEach(prediction => {
	const pEl = document.createElement("p");
	pEl.textContent = prediction.description;
	pEl.dataset.placeId = prediction.place_id;
	pEl.classList.add("prediction");
	pEl.addEventListener("click", handlePredictionClick)
	fragment.appendChild(pEl);
    });
    predictionContainer.appendChild(fragment);
}

function removePreviousPredictions() {
    const predictions = document.querySelectorAll(".prediction");
    predictions.forEach(
	prediction => prediction.parentNode.removeChild(prediction))
}

function handlePredictionClick(event) {
    console.log(event.target.dataset.placeId)
}

function initMap() {
    const options = {
	center: { lat: -1.2793, lng: 36.821 },
	zoom: 10
    };
    const map = new google.maps.Map(document.getElementById("map"), options);
}

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
    console.log("menu clicked");
    menu.style.display = "flex";
});
