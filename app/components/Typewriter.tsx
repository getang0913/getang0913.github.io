"use client";

import { useEffect, useState } from "react";

export function Typewriter({ words }: { words: string[] }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const complete = length === word.length;
    const empty = length === 0;
    const delay = complete && !deleting ? 1500 : deleting ? 42 : 78;

    const timer = window.setTimeout(() => {
      if (complete && !deleting) {
        setDeleting(true);
        return;
      }

      if (empty && deleting) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
        return;
      }

      setLength((current) => current + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, length, wordIndex, words]);

  return (
    <span className="typewriter" aria-label={words.join(", ")}>
      <span aria-hidden="true">{words[wordIndex].slice(0, length)}</span>
      <span className="typewriter-caret" aria-hidden="true" />
    </span>
  );
}
