import { useState, Fragment } from "react";
// import { bookables } from "../../static.json";
import { data } from "../../data";
import { FaArrowRight } from "react-icons/fa";

export default function BookablesList() {
  const [group, setGroup] = useState("Kit");

  const bookables = data.bookables;
  const bookablesInGroup = bookables.filter((b) => b.group === group); // bookables.filter((b) => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(0);
  const groups = [...new Set(bookables.map((b) => b.group))];

  const bookable = bookablesInGroup[bookableIndex];
  const [hasDetails, setHasDetails] = useState(false);

  function changeBookable(selectedIndex) {
    setBookableIndex(selectedIndex);
    // console.log(selectedIndex);
  }

  function nextBookable() {
    setBookableIndex((i) => (i + 1) % bookablesInGroup.length);
  }

  return (
    <>
      <div>
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>
        <ul className="bookables">
          {bookablesInGroup.map((b, i) => (
            <li
              style={{ listStyle: "none", marginTop: "2px" }}
              key={b.title}
              className={i === bookableIndex ? "selected" : null}
            >
              <button
                className="btn"
                onClick={() => {
                  changeBookable(i);
                }}
              >
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>

      {bookable && (
        <div>
          <div className="bookable-details">
            <div className="item">
              <div className="item-header">
                <h2>{bookable.title}</h2>
                <span className="controls">
                  <label>
                    <input
                      type="checkbox"
                      checked={hasDetails}
                      onChange={() => setHasDetails((has) => !has)}
                    />
                    Show Details
                  </label>
                </span>
              </div>
              <p>{bookable.notes}</p>

              {hasDetails && (
                <div className="item-details">
                  <h3>Availability</h3>
                  <div className="bookable-availability">
                    <ul>
                      {bookable.days.sort().map((d) => (
                        <li key={d}>{data.days[d]}</li>
                      ))}
                    </ul>
                    <ul>
                      {bookable.sessions.map((s) => (
                        <li key={s}>{data.sessions[s]}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
