import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    for (let i = 0; i <= 10; i++) {
      const inputs = document.querySelectorAll(`.questions${i}`);
      inputs.forEach((e) => {
        if (e.checked) {
          e.parentNode.style.background = 'rgb(114, 52, 95)';
          e.parentNode.style.color = "white";

        } else {
          e.parentNode.style.background = "white";
          e.parentNode.style.color = "black";
        }
      });
    }
  }, [answers]);

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
