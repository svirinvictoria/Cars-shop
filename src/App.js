import React, { useState, useEffect } from "react";
import { useProxy } from "./hooks/useProxy";
import Cards from "./components/cards/Cards";
import "./App.css";

function App() {
  const proxy = useProxy();
  const [originalList, setOriginalList] = useState([]); //list of objects
  const [mutedList, setMutedList] = useState([]); //list of objects after sorting
  const [searchTarget, setSearchTarget] = useState(""); // search criteria taken from input

  useEffect(() => {
    const listOfObjects = proxy.importCarsPr();
    setOriginalList(listOfObjects);
    setMutedList(listOfObjects);
  }, []);

  //sorting the list by different criteria

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
    const sortByCriteria = listToSort.sort(criteria);//criteria is a parameter, that we pass to SortBy function while calling it inside a button
    //this parameter may be the following callback functions: compareByName/ compareByColor/ compareByYear
    setMutedList(sortByCriteria); //the result of sorting is returned to state (mutedList) to be rerendered
  }

  //searching an item in the list. the search criteria comes from the <input> field.
  function searchHandler(event) {// "catches" the word (search target) we type in th input field
    setSearchTarget(event.target.value);//saves the inserted word inside a state
  }

  function onSearchClickHandler() {
    const listToSort = [...originalList];//creatinga copy of the original array

    let searchText = ""; //checking the inserted ward <currently saved in state (searchTarget)>
    if (searchTarget !== null || searchTarget !== "") { // preventing a search when the input is empty
      searchText = searchTarget.toLowerCase().trim(); //cancels capital letters and extra spaces in the word typed into <input>
    }

    const chosenBranch = listToSort.filter((item) => {
      const nameCriteria = item.name.toLowerCase().trim();//cancels capital letters and extra spaces in item from list
      const colorCriteria = item.color.toLowerCase().trim();
      const yearCriteria = item.manufactured.trim();

      const result = nameCriteria === searchText ||//comparing the item from the list with the word from the input(searchTarget) 
      //after cancelling capital letters and extra spaces.
      colorCriteria === searchText ||
      yearCriteria === searchText ||
      nameCriteria.includes(searchText) || //checking if the item (a car in our list) contains part of the criteria
      colorCriteria.includes(searchText) ||
      yearCriteria.includes(searchText); 

      return result;
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
          <label htmlFor="search">Please insert search criteria </label>
          <input 
            type="text"
            id="search"
            name="search"
            value={searchTarget} //the input must include value, that "catches" the typed words
            onChange={searchHandler} // onChange methods calls a function that saves the typed word into a state(searchTarget)
          />
          <button
            className="btn-find"
            onClick={(event) => { // calling a search function. we must call it inside an anonimous callback, 
              //since the onClick() method can only get EVENT as parameter
              onSearchClickHandler();
            }}
          >
            Search
          </button>
        </div>
        <Cards mutedList={mutedList}></Cards>
      </div>
      <div></div>
    </div>
  );
}

export default App;
