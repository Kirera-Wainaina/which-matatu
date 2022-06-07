// Introduce React
const homePageContainer = document.getElementById("home-page-container")
const root = ReactDOM.createRoot(homePageContainer);
root.render(<App />);

function App(props) {
    return (
	<h1>Hello World!</h1>
    );
}
