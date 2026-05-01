import { useState, useEffect } from 'react';

export function useTypewriter(words, typeSpeed = 80, deleteSpeed = 45, pause = 1600) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const isComplete = !isDeleting && text === word;
    const isEmpty = isDeleting && text === '';

    if (isEmpty) {
      setIsDeleting(false);
      setWordIndex(i => (i + 1) % words.length);
      return;
    }

    const delay = isComplete ? pause : isDeleting ? deleteSpeed : typeSpeed;

    const timer = setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
      } else if (isDeleting) {
        setText(t => t.slice(0, -1));
      } else {
        setText(word.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, wordIndex, isDeleting, words, typeSpeed, deleteSpeed, pause]);

  return text;
}
