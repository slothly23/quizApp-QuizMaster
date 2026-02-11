const QuestionCard = ({ question, onAnswer }) => {
  if (!question) return null;

  return (
    <div>
      <h2>{question.question}</h2>

      {/* pilihan jawaban */}
      {question.all_answers.map((ans, i) => (
        <button key={i} onClick={() => onAnswer(ans)}>
          {ans} ---
        </button>
        
      ))}
    </div>
  );
};

export default QuestionCard;
