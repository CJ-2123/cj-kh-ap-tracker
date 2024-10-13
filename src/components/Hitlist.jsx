import React, { useState, useEffect } from "react";
import hitlist from "../data/hitlist.js";

function Tracker() {
  const [imageStyles, setImageStyles] = useState({});
  const [iconCounts, setIconCounts] = useState({});

  // Initialize item counts and styles
  useEffect(() => {
    const initialStyles = {};
    const initialCounts = {};

    hitlist.forEach(({ id, opacity, filter }) => {
      initialStyles[id] = { opacity, filter };
      initialCounts[id] = 0;
    });

    setImageStyles(initialStyles);
    setIconCounts(initialCounts);
  }, []);

  // Toggle styling of items and incrementing/decrementing items in the tracker when clicked/scrolled
  function handleOpacityToggle(id, increment) {
    if (increment) {
      if (iconCounts[id] < hitlist.find((item) => item.id === id).max) {
        // Check if count is less than max
        setImageStyles((prevStyles) => ({
          ...prevStyles,
          [id]: {
            opacity: 1,
            filter: "none",
          },
        }));
        setIconCounts((prevCounts) => ({
          ...prevCounts,
          [id]: prevCounts[id] + 1,
        }));
      }
    } else if (!increment && iconCounts[id] > 1) {
      // Check is count greater than 1 on decrement
      setImageStyles((prevStyles) => ({
        ...prevStyles,
        [id]: {
          opacity: 1,
          filter: "none",
        },
      }));
      setIconCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] - 1,
      }));
    } else if (!increment && iconCounts[id] === 1) {
      // Fade image if count is 1 and decrementing
      setImageStyles((prevStyles) => ({
        ...prevStyles,
        [id]: {
          opacity: 0.5,
          filter: "grayscale(75%)",
        },
      }));
      setIconCounts((prevCounts) => ({
        ...prevCounts,
        [id]: prevCounts[id] - 1,
      }));
    }
  }

  const rows = [];

  // First row has 4 columns
  rows.push(hitlist.slice(0, 4));

  // Remaining rows have 7 columns
  for (let i = 4; i < hitlist.length; i += 7) {
    rows.push(hitlist.slice(i, i + 7));
  }

  // Get mouse wheel scrolling value
  function handleWheel(event, id) {
    const increment = event.deltaY < 0; // Scroll up
    handleOpacityToggle(id, increment);
    //event.preventDefault(); // Prevent default scrolling behavior
  }

  // Get mouse click value
  function handleClick(event, id) {
    const increment = event.button === 0; // left click
    //const isRightClick = event.button === 2; // right click
    handleOpacityToggle(id, increment);
  }

  // Create item tracker
  return (
    <div className="tracker">
      <div>
        <table>
          {/* First row with 4 columns */}
          <tr>
            {rows[0].map(({ id, src, max }) => (
              <td className="tracker-item" key={id}>
                <img
                  id={id}
                  style={imageStyles[id]}
                  src={src}
                  onMouseDown={(e) => handleClick(e, id)}
                  onWheel={(e) => handleWheel(e, id)}
                  onContextMenu={(e) => e.preventDefault()}
                />
                {hitlist.find((item) => item.id === id).max > 1 && (
                  <span className="count tracker-count">
                    {iconCounts[id] > 0 ? iconCounts[id] : ""}
                  </span>
                )}
              </td>
            ))}
          </tr>

          {/* Remaining rows with 7 columns */}
          {rows.slice(1).map((row, rowIndex) => (
            <React.Fragment key={rowIndex + 1}>
              <tr key={rowIndex + 1}>
                {row.map(({ id, src, max }) => (
                  <td className="tracker-item" key={id}>
                    <img
                      id={id}
                      style={imageStyles[id]}
                      src={src}
                      onMouseDown={(e) => handleClick(e, id)}
                      onWheel={(e) => handleWheel(e, id)}
                      onContextMenu={(e) => e.preventDefault()}
                    />
                    {hitlist.find((item) => item.id === id).max > 1 && (
                      <span className="count tracker-count">
                        {iconCounts[id] > 0 ? iconCounts[id] : ""}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
              {rowIndex === 7 && (
                <tr>
                  <td colSpan={7}>
                    <hr />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </table>
      </div>
    </div>
  );
}

export default Tracker;
