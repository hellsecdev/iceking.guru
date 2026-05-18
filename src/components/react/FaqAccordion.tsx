import { useState } from 'react';
import type { FaqItem } from '../../content/faq';

type Props = {
  items: FaqItem[];
};

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-list mx-auto w-full max-w-2xl space-y-3 lg:max-w-3xl">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article
            key={item.question}
            className={`faq-card ${isOpen ? 'faq-card--open' : ''}`}
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <button
              type="button"
              className="faq-card__trigger"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="faq-card__icon" aria-hidden="true">
                {item.emoji}
              </span>
              <span className="faq-card__question">{item.question}</span>
              <span className={`faq-card__toggle ${isOpen ? 'faq-card__toggle--open' : ''}`}>
                <span className="faq-card__toggle-bar" />
                <span className="faq-card__toggle-bar faq-card__toggle-bar--vertical" />
              </span>
            </button>
            <div
              className="faq-card__panel"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className="faq-card__answer">{item.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
