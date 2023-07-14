import React, { useState, useEffect } from "react";
import { useProxy } from "./hooks/useProxy";
import Cards from "./components/cards/Cards";
import "./App.css";

function App() {
  const proxy = useProxy();
  const [originalList, setOriginalList] = useState([]); //list of objects
  const [mutedList, setMutedList] = useState([]); //list of objects after sorting
  const [searchTarget, setSearchTarget] = useState(""); //target of search taken from input

  useEffect(() => {
    const listOfObjects = proxy.importCarsPr();
    setOriginalList(listOfObjects);
    setMutedList(listOfObjects);
  }, []);

  function compareByName(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  function compareByColor(a, b) {
    if (a.color < b.color) {
      return -1;
    }
    if (a.color > b.color) {
      return 1;
    }
    return 0;
  }

  function compareByYear(a, b) {
    if (a.manufactured - b.manufactured < 0) {
      return -1;
    }
    if (a.manufactured - b.manufactured > 0) {
      return 1;
    }
    return 0;
  }

  function sortBy(criteria) {
    const listToSort = [...mutedList];
    const sortByCriteria = listToSort.sort(criteria);
    setMutedList(sortByCriteria);
  }

  function searchHandler(event) {
    setSearchTarget(event.target.value);
  }

  console.log(searchTarget);

  function checkBy() {
    const listToSort = [...originalList];
    const chosenBranch = listToSort.filter((item) => {
      return (
        item.name === searchTarget ||
        item.color === searchTarget ||
        item.manufactured === searchTarget
      );
    });
    setMutedList(chosenBranch);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Cars Shop</p>
      </header>
      <div>

      <button
          className="btn"
          onClick={(event) => {
            sortBy(compareByName);
          }}
        >
          Sort by Name
        </button>

        <button
          className="btn"
          onClick={(event) => {
            sortBy(compareByColor);
          }}
        >
          Sort by Color
        </button>

        <button
          className="btn"
          onClick={(event) => {
            sortBy(compareByYear);
          }}
        >
          Sort by Year
        </button>
        <div>
          <label htmlFor="search">What are you looking for? </label>
          <input
            type="text"
            id="search"
            name="search"
            value={searchTarget}
            onChange={searchHandler}
          />
          <button
            className="btn-find"
            onClick={(event) => {
              checkBy();
            }}
          >
            Search
          </button>
        </div>
        <Cards mutedList={mutedList}></Cards>
      </div>
      <div>
       
      </div>
    </div>
  );
}

export default App;
