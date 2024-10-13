import Tracker from "./Tracker.jsx";
import Hitlist from "./Hitlist.jsx";

function Home() {
  // Open popout window for item tracker
  function handleOpenPopout() {
    window.open(
      "#/tracker",
      "_blank",
      "toolbar=no,resizeable=yes,width=250,height=700"
    );
  }

  function handleOpenPopoutHitlist() {
    window.open(
      "#/hitlist",
      "_blank",
      "toolbar=no,resizeable=yes,width=300,height=350"
    );
  }

  // Create tracker
  return (
    <div>
      <div className="tracker">
        <Tracker></Tracker>
        <div>
          <button className="popout-button" onClick={handleOpenPopout}>
            Popout Tracker
          </button>
        </div>
        <Hitlist></Hitlist>
        <div>
          <button className="popout-button" onClick={handleOpenPopoutHitlist}>
            Popout Hit List
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
