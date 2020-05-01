import React, { useState, useEffect } from "react";
import { CategoryData, DifficultyData } from "../Data";
import QuizForm from './QuizForm';

function Category() {
  const [cat, setCat] = useState("");
  const [diff, setDiff] = useState("");
  const [questions, setQuestions] = useState([]);
  const [show, setShow] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (cat || diff) {
      fetch(
        `https://opentdb.com/api.php?amount=10&category=${cat}&difficulty=${diff}`
      )
        .then((res) => res.json())
        .then(({ results }) => setQuestions(results))
        .catch((error) => setError(error));
    }
  }, [cat, diff]);

  return (
    <>
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
