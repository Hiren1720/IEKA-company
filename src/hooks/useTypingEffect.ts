import { useEffect, useState } from "react";

const words = [
  "Next-Gen Organizations",
  "Enterprise Solutions",
  "Innovative Global Startups",
  "Fast-Growing Businesses",
];

export const useTypingEffect = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        setText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      let speed = isDeleting ? 40 : 85;

      if (!isDeleting && charIndex === currentWord.length) {
        speed = 1600;
        isDeleting = true;
      }

      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 450;
      }

      timeout = setTimeout(type, speed);
    };

    type();

    return () => clearTimeout(timeout);
  }, []);

  return text;
};