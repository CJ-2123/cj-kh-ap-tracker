import Tracker from "./Tracker.jsx";

function Home() {
  // Open popout window for item tracker
  function handleOpenPopout() {
    window.open(
      "#/tracker",
      "_blank",
      "toolbar=no,resizeable=yes,width=250,height=700"
    );
  }

  // Create checklist on left and tracker on right
  return (
    <div>
      <div className="tracker">
        <Tracker></Tracker>
        <div>
          <button className="popout-button" onClick={handleOpenPopout}>
            Popout Tracker
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
