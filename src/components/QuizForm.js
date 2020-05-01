import React, { useState } from "react";

function Quizform({ questions }) {
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [result, setResult] = useState(0);
  const [display, setDisplay] = useState(true);
 
  const handleSubmit = (event) => {
    event.preventDefault();
    setDisplay(false);
    setResult(answers.filter((e) => e === "correct").length);
  };

  const handleChange = (e, index) => {
    setAnswer(e.target.value);
    setAnswers([
      ...answers.slice(0, index),
      e.target.value,
      ...answers.slice(index + 1),
    ]);
    const inputs = document.querySelectorAll(`.questions${index}`);
    inputs.forEach((e) => {
      e.disabled=true;
      e.parentNode.style.cursor = "not-allowed";
      if (e.checked) {
        if (e.value === "correct") {
          e.parentNode.style.background = "green";
          e.parentNode.style.color = "white";
        } else {
          e.parentNode.style.background = "red";
        }
      } else {
        if (e.value === "correct") {
          e.parentNode.style.background = "green";
          e.parentNode.style.color = "white";
        } else {
          e.parentNode.style.background = "white";
        }
      }
    });
  };
  return (
    <>
      {display && (
        <form onSubmit={handleSubmit}>
          {questions.map((e, index) => (
            <div key={index}>
              <p>{e.question}</p>

              <div class="answers">
                <label class="inputcontainer">
                  <input
                    className={`questions${index}`}
                    type="radio"
                    name={`answer${index}`}
                    value="correct"
                    onChange={(e) => handleChange(e, index)}
                  />
                  {e.correct_answer}
                </label>
                {e.incorrect_answers.map((incorrect) => (
                  <label class="inputcontainer">
                    <input
                      className={`questions${index}`}
                      type="radio"
                      name={`answer${index}`}
                      value="incorrect"
                      onChange={(e) => handleChange(e, index)}
                    />
                    {incorrect}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <input type="submit" value="Submit" className="submitBtn" />
        </form>
      )}
      {!display && <div> Your Result {result}</div>}
    </>
  );
}

export default Quizform;
