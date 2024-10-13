import React, { useState, useEffect } from "react";
import items from "../data/items.js";

function Tracker() {
  const [imageStyles, setImageStyles] = useState({});
  const [iconCounts, setIconCounts] = useState({});

  // Initialize item counts and styles
  useEffect(() => {
    const initialStyles = {};
    const initialCounts = {};

    items.forEach(({ id, opacity, filter }) => {
      initialStyles[id] = { opacity, filter };
      initialCounts[id] = 0;
    });

    setImageStyles(initialStyles);
    setIconCounts(initialCounts);
  }, []);

  // Toggle styling of items and incrementing/decrementing items in the tracker when clicked/scrolled
  function handleOpacityToggle(id, increment) {
    if (increment) {
      if (iconCounts[id] < items.find((item) => item.id === id).max) {
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

  // Limit tracker to 6 columns
  const rows = [];
  for (let i = 0; i < items.length; i += 6) {
    rows.push(items.slice(i, i + 6));
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
          {rows.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <tr key={rowIndex}>
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
                    {items.find((item) => item.id === id).max > 1 && (
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
                  </td>{" "}
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
