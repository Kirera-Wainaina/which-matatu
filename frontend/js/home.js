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
destination.addEventListener("input", getPredictions);

const boardingPoint = document.getElementById("boarding-point");
boardingPoint.addEventListener("input", getPredictions);

function getPredictions(event) {
    const neKenya = new google.maps.LatLng({ lat: 4.995, lng: 42.764 });
    const swKenya = new google.maps.LatLng({ lat: -5.196, lng: 34.021 });
    service.getPlacePredictions(
	{ input: event.target.value,
	  bounds: new google.maps.LatLngBounds(swKenya, neKenya) },
	(predictions, status) => {
	    console.log(status);
	    if (status == google.maps.places.PlacesServiceStatus.OK) {
		const possibleId = "destination";
		console.log(event.target.id)
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
