import React, { useState, useMemo } from "react";
import allFaqs from "../../assets/allFaq";

function Faq() {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleAnswer = (id) => {
    setExpandedItems((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const renderedQuestions = useMemo(
    () =>
      allFaqs.map((faq, index) => {
        const id = `faq-${index}`;
        const isExpanded = expandedItems[id] || false;

        const handleToggle = () => toggleAnswer(id);

        return (
          <div className="questionBox" key={id}>
            <div className="question" onClick={handleToggle}>
              {faq.question}
            </div>
            <div className={`answer ${isExpanded ? "show" : ""}`}>{faq.answer}</div>
          </div>
        );
      }),
    [allFaqs, expandedItems]
  );

  return (
    <div className="faqPage">
      <h1>FAQs</h1>
      {renderedQuestions}
    </div>
  );
}

export default Faq;
