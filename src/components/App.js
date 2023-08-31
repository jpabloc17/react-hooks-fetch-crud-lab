import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function handleNewQuestion(newQuestionData) {
    setQuestions([...questions, newQuestionData]);
  }

  function handleDeleteQuestion(questionToDelete) {
    const updateQuestions = questions.filter(
      (question) => question.id !== questionToDelete.id
    );
    setQuestions(updateQuestions);
  }

  function handleUpdateQuestion(updateQuestion) {
    const updateQuestions = questions.map((question) => {
      if (question.id === updateQuestion.id) {
        return updateQuestion;
      }
      return question;
    });
    setQuestions(updateQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onHandleNewQuestion={handleNewQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
