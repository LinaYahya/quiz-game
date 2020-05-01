import React, { useState, useEffect } from "react";
import ReactLoading from 'react-loading';
import { CategoryData, DifficultyData } from "../Data";
import QuizForm from './QuizForm';

function Category() {
  const [cat, setCat] = useState("9");
  const [diff, setDiff] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [error, setError] = useState(null);


  const getQuestions = (cat, diff) => {
    setLoading(true);
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${cat}&difficulty=${diff}`
      )
      .then((res) =>{
        setLoading(false);
        return res.json();
      })
      .then(({ results }) => setQuestions(results))
      .catch((error) => setError(error));
  }

  return (
    <>
    {loading && <ReactLoading type="spinningBubbles" className="loading" />}
    {show &&
      <form
        className="form-container"
      >
        <div className="quation-type">
          <div className="type-container">
            <label htmlFor="category">Select category: </label>
            <select
              id="category"
              name={cat}
              onChange={(e) => setCat(e.target.value)}
            >
              {CategoryData.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="type-container">
            <label htmlFor="difficulty"> select difficulty</label>
            <select
              id="difficulty"
              name={diff}
              onChange={(e) => setDiff(e.target.value)}
            >
              {DifficultyData.map((dif, index) => (
                <option key={index} value={dif}>
                  {dif}
                </option>
              ))}
            </select>
          </div>
          <button
            className="submitBtn"
            type="submit"
            onClick={(e) => {
              getQuestions(cat, diff);
              setShow(!show);
              e.preventDefault();
            }}
          >
            Go To Questions{" "}
          </button>
        </div>
      </form>
}
      {!show& !error && <QuizForm questions={questions} />}
      
    </>
  );
}
export default Category;
