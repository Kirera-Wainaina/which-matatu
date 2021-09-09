window.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("logo");
    logo.addEventListener(
	"animationend",
	() => {
	    const logoQuestion = document.querySelector("#logo span");
	    logoQuestion.style.animation = "1s hanging forwards";
	})
})

const service = new google.maps.places.AutocompleteService();
const destination = document.getElementById("destination");
destination.addEventListener("input", event => {
    console.log(event.target.value)
    const neKenya = new google.maps.LatLng({ lat: 4.995, lng: 42.764 });
    const swKenya = new google.maps.LatLng({ lat: -5.196, lng: 34.021 });
    service.getPlacePredictions(
	{ input: event.target.value,
	  bounds: new google.maps.LatLngBounds(swKenya, neKenya) },
	(predictions, status) => {
	    console.log(status);
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
		displayPredictions(predictions);
	    }
	});
    removePreviousPredictions();
})

function displayPredictions(predictions) {
    console.log(predictions)
    const fragment = new DocumentFragment();
    const predictionContainer = document.getElementById(
	"destination-prediction-container");
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
