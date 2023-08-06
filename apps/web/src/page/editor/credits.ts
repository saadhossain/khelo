import React, {useState, useEffect} from 'react';
const loadCredits = (key:string, maxUsage:number) => {
  try {
    const data = JSON.parse(localStorage.getItem(key) || '{}');
    if (data.date !== new Date().toDateString()) {
      return maxUsage;
    }
    return data.credits || maxUsage;
  } catch (e) {}
  return maxUsage;
};

const saveCredits = (key:string, credits:number) => {
  localStorage.setItem(
    key,
    JSON.stringify({
      date: new Date().toDateString(),
      credits,
    })
  );
};

export const useCredits = (key = 'unknown', maxUsage = 5) => {
  const [credits, setCredits] = useState(() =>
    loadCredits(key, maxUsage)
  );

  useEffect(() => {
    saveCredits(key, credits);
  }, [key, credits]);

  const consumeCredits = (amount = 1) => {
    setCredits((credits:number) => credits - amount);
  };

  return { credits, consumeCredits };
};