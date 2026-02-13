import { motion } from "framer-motion";

const QuestionCard = ({ question, onAnswer }) => {
  if (!question) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* QUESTION BOX */}
      <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
        <h2
          className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      </div>

      {/* ANSWERS */}
      <div className="grid gap-3">
        {question.all_answers.map((ans, i) => {
          const label = String.fromCharCode(65 + i); // A B C D

          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onAnswer(ans)}
              className="flex gap-3 items-start w-full text-left px-5 py-3 rounded-xl bg-white border border-gray-200 shadow-sm hover:bg-indigo-600 hover:text-white transition"
            >
              <span className="font-bold">{label}.</span>
              <span dangerouslySetInnerHTML={{ __html: ans }} />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
