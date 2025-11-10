import React, { useEffect, useState } from 'react';
import * as S from './AutoNumber.styles';

const allNumbers = Array.from({ length: 45 }, (_, i) => i + 1);

const countRanks = (combination, history) => {
  let rank1 = 0, rank2 = 0, rank3 = 0, rank4 = 0, rank5 = 0;

  history.forEach(round => {
    const winNums = [
      round["번호1"], round["번호2"], round["번호3"],
      round["번호4"], round["번호5"], round["번호6"],
    ];
    const bonus = round["보너스"];

    const matchedCount = combination.filter(n => winNums.includes(n)).length;
    const bonusMatch = combination.includes(bonus);

    if (matchedCount === 6) rank1++;
    else if (matchedCount === 5 && bonusMatch) rank2++;
    else if (matchedCount === 5) rank3++;
    else if (matchedCount === 4) rank4++;
    else if (matchedCount === 3) rank5++;
  });

  return { rank1, rank2, rank3, rank4, rank5 };
};

const getExcludedSet = (history) => {
  const excluded = new Set();

  history.forEach(round => {
    const nums = [
      round["번호1"], round["번호2"], round["번호3"],
      round["번호4"], round["번호5"], round["번호6"]
    ].sort((a, b) => a - b);
    const bonus = round["보너스"];

    excluded.add(nums.join(','));

    for (let i = 0; i < nums.length; i++) {
      const five = [...nums.slice(0, i), ...nums.slice(i + 1)];
      const second = [...five, bonus].sort((a, b) => a - b);
      excluded.add(second.join(','));
    }
  });

  return excluded;
};

const pickValidRandom = (excludedSet, history) => {
  let tries = 0;
  while (tries < 10000) {
    const pool = [...allNumbers];
    const result = [];

    while (result.length < 6) {
      const idx = Math.floor(Math.random() * pool.length);
      result.push(pool.splice(idx, 1)[0]);
    }

    const sortedResult = result.slice().sort((a, b) => a - b);
    const key = sortedResult.join(',');

    if (excludedSet.has(key)) {
      tries++;
      continue;
    }

    const { rank1, rank2, rank3, rank4, rank5 } = countRanks(sortedResult, history);

    if (
      rank1 === 0 &&
      rank2 === 0 &&
      rank3 === 0 &&
      rank4 >= 1 && rank4 <= 2 &&
      rank5 >= 20 && rank5 <= 25
    ) {
      return sortedResult;
    }

    tries++;
  }

  throw new Error('조건에 맞는 번호 조합을 찾을 수 없습니다.');
};

export default function ProAutoNumber() {
  const [lottoHistory, setLottoHistory] = useState([]);
  const [results, setResults] = useState([]);
  const [count, setCount] = useState(1);

  useEffect(() => {
    document.title = '프로 로또 번호 생성기 - Moneyrise.net';

    fetch(`${process.env.PUBLIC_URL}/lotto.json`)
      .then(res => res.json())
      .then(data => setLottoHistory(data))
      .catch(err => console.error('로또 데이터 로딩 실패:', err));
  }, []);

  const handleGenerate = () => {
    if (lottoHistory.length === 0) {
      alert('로또 데이터를 불러오는 중입니다. 잠시만 기다려주세요.');
      return;
    }
    try {
      const excluded = getExcludedSet(lottoHistory);
      const newResults = [];

      for (let i = 0; i < count; i++) {
        const numbers = pickValidRandom(excluded, lottoHistory);
        newResults.push(numbers);
        // 중복 방지를 위해 이번에 뽑은 조합도 제외셋에 추가
        excluded.add(numbers.join(','));
      }
      setResults(newResults);
    } catch (err) {
      alert(err.message);
    }
  };

  const getBallColor = (number) => {
    if (number >= 1 && number <= 10) return '#f1b800';
    if (number >= 11 && number <= 20) return '#3ba9e0';
    if (number >= 21 && number <= 30) return '#e64545';
    if (number >= 31 && number <= 40) return '#666666';
    if (number >= 41 && number <= 45) return '#7fbf00';
    return '#6200ee';
  };

  return (
    <S.Parent>
      <S.Title>💎 프로 로또 번호 생성기 💎</S.Title>

      <label style={{ marginBottom: 20, display: 'block' }}>
        생성 개수:
        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{ marginLeft: 10 }}
        >
          <option value={1}>1세트</option>
          <option value={5}>5세트</option>
          <option value={10}>10세트</option>
        </select>
      </label>

      <S.Button onClick={handleGenerate}>번호 뽑기</S.Button>

      {results.length > 0 && results.map((result, idx) => (
        <S.NumberList key={idx} style={{ marginTop: 15 }}>
          <strong>{idx + 1}번 조합: </strong>
          {result.map(num => (
            <S.NumberBall key={num} bgColor={getBallColor(num)} style={{ marginLeft: 5 }}>
              {num}
            </S.NumberBall>
          ))}
        </S.NumberList>
      ))}
    </S.Parent>
  );
}
