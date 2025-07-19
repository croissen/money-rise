import React, { useState, useEffect } from 'react';

export default function LottoHistory() {
  const [lottoHistory, setLottoHistory] = useState([]);
  const [resultByRound, setResultByRound] = useState([]);

  const [filter2, setFilter2] = useState('');
  const [filter3, setFilter3] = useState('');
  const [filter4, setFilter4] = useState('');
  const [filter5, setFilter5] = useState('');

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/lotto.json`)
      .then((res) => res.json())
      .then((data) => setLottoHistory(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (lottoHistory.length === 0) return;

    const results = lottoHistory.map((currentRound) => {
      const currentNumbers = [
        currentRound.번호1,
        currentRound.번호2,
        currentRound.번호3,
        currentRound.번호4,
        currentRound.번호5,
        currentRound.번호6,
      ];
      const currentBonus = currentRound.보너스;

      let count2 = 0,
        count3 = 0,
        count4 = 0,
        count5 = 0;

      lottoHistory.forEach((round) => {
        const winningNumbers = [
          round.번호1,
          round.번호2,
          round.번호3,
          round.번호4,
          round.번호5,
          round.번호6,
        ];
        const bonusNumber = round.보너스;

        const matchedCount = currentNumbers.filter((n) => winningNumbers.includes(n)).length;
        const bonusMatch = currentNumbers.includes(bonusNumber);

        if (matchedCount === 6) {
          // 1등 제외
        } else if (matchedCount === 5 && bonusMatch) {
          count2++;
        } else if (matchedCount === 5) {
          count3++;
        } else if (matchedCount === 4) {
          count4++;
        } else if (matchedCount === 3) {
          count5++;
        }
      });

      return {
        round: currentRound.회차,
        numbers: currentNumbers,
        bonus: currentBonus,
        rank2: count2,
        rank3: count3,
        rank4: count4,
        rank5: count5,
      };
    });

    results.sort((a, b) => b.round - a.round);
    setResultByRound(results);
  }, [lottoHistory]);

  const filteredResults = resultByRound.filter((result) => {
    return (
      (filter2 === '' || result.rank2 === Number(filter2)) &&
      (filter3 === '' || result.rank3 === Number(filter3)) &&
      (filter4 === '' || result.rank4 === Number(filter4)) &&
      (filter5 === '' || result.rank5 === Number(filter5))
    );
  });

  return (
    <div>
      <h1>역대 회차별 당첨 번호와 당첨 횟수 (2~5등)</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>
          2등 당첨 횟수: 
          <input
            type="number"
            value={filter2}
            onChange={(e) => setFilter2(e.target.value)}
            style={{ margin: '0 10px' }}
          />
        </label>
        <label>
          3등 당첨 횟수: 
          <input
            type="number"
            value={filter3}
            onChange={(e) => setFilter3(e.target.value)}
            style={{ margin: '0 10px' }}
          />
        </label>
        <label>
          4등 당첨 횟수: 
          <input
            type="number"
            value={filter4}
            onChange={(e) => setFilter4(e.target.value)}
            style={{ margin: '0 10px' }}
          />
        </label>
        <label>
          5등 당첨 횟수: 
          <input
            type="number"
            value={filter5}
            onChange={(e) => setFilter5(e.target.value)}
            style={{ margin: '0 10px' }}
          />
        </label>
      </div>

      <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>회차</th>
            <th>당첨 번호 (6개)</th>
            <th>보너스 번호</th>
            <th>2등 당첨 횟수</th>
            <th>3등 당첨 횟수</th>
            <th>4등 당첨 횟수</th>
            <th>5등 당첨 횟수</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map(({ round, numbers, bonus, rank2, rank3, rank4, rank5 }) => (
            <tr key={round}>
              <td>{round} 회</td>
              <td>{numbers.join(', ')}</td>
              <td>{bonus}</td>
              <td>{rank2}</td>
              <td>{rank3}</td>
              <td>{rank4}</td>
              <td>{rank5}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
