const QuestionCard = ({ question, onAnswer }) => {
  if (!question) return null;

  return (
    <div className="space-y-6">
      <h2
        className="text-xl font-semibold text-gray-800"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      <div className="grid gap-4">
        {question.all_answers.map((ans, i) => (
          <button
            key={i}
            onClick={() => onAnswer(ans)}
            className="bg-gray-100 hover:bg-indigo-600 hover:text-white transition duration-200 px-4 py-3 rounded-xl text-left font-medium"
            dangerouslySetInnerHTML={{ __html: ans }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
