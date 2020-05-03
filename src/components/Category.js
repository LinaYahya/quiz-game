import React, { useState } from "react";
import ReactLoading from "react-loading";
import { CategoryData, DifficultyData } from "../Data";
import QuizForm from "./QuizForm";
import rightImage from "../img/1610-Brain-Games-Study-workout.jpg";

function Category() {
  const [cat, setCat] = useState("9");
  const [diff, setDiff] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(true);
  const [showNotice, setShowNotice] = useState(false);
  const [error, setError] = useState(null);

  // // this function to handle the answers coming from the api so the correct and incorrect answers would be in one array
  const handleAnswers = (arr) =>
    arr.map((e) => {
      const l = e.incorrect_answers.map((r) => {
        return ["incorrect", r];
      });
      return [{ q: [["correct", e.correct_answer], ...l] }];
    });

  // // this to reset the answers randomly so the correct answer wouldnt be at the same index
  const randomArrayElements = (data, question, length) => {
    let newArr = [];
    for (let i = 0; i < length; i++) {
      let num = Math.floor(Math.random() * question.length);
      let name = question[num];
      newArr.push(name);
      question.splice(num, 1);
    }
    return [{ question: data.question }, ...newArr];
  };

  const getQuestions = (cat, diff) => {
    setLoading(true);
    fetch(
      `https://opentdb.com/api.php?amount=10&category=${cat}&difficulty=${diff}`
    )
      .then((res) => {
        setLoading(false);
        return res.json();
      })

      .then(({ results }) =>
        handleAnswers(results).map((e, index) =>
          randomArrayElements(results[index], e[0].q, e[0].q.length)
        )
      )
      .then((data) => setQuestions(data))
      .catch((error) => setError(error));
  };

  return (
    <>
      {loading && <ReactLoading type="spinningBubbles" className="loading" />}
      {show && (
        <div className="category-container">
          <img className="left-img" src={rightImage} alt="brain Games" />

          <div className="rightside">
            <h2 className="title">
              Have your quiz right now!
              <span> select category and difffuculty of your quiz</span>
            </h2>
            <form className="form-container">
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
                    setShowNotice(true);
                    setShow(false);
                    e.preventDefault();
                  }}
                >
                  Go To Questions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showNotice & !loading ? (
        <div className="msg-container">
          <div className="msg-container__msg">
            Once you answer the question, you can't edit it, So take your time{" "}
          </div>
          <button
            className="submitBtn"
            type="button"
            onClick={(e) => {
              setShow(true);
              setShowNotice(false);
            }}
          >
            {" "}
            Back
          </button>
          <button
            className="submitBtn"
            type="button"
            onClick={(e) => {
              setShow(false);
              setShowNotice(false);
            }}
          >
            {" "}
            Start Quiz Now
          </button>
         
        </div>
      ) : null}
      {!show & !error & !showNotice ? <QuizForm questions={questions} /> : null}
    </>
  );
}
export default Category;
