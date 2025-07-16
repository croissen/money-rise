import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import * as S from './AutoNumber.styles';
import * as SS from './Styles';
import AdsBanner from '../components/AdsBanner';

const allNumbers = Array.from({ length: 45 }, (_, i) => i + 1);


const phrases = {
  1: ['인생은 한방이지!', '아메리카노 한번 안먹지 뭐'],
  5: ['5000원이 원툴이긴 해', '1개로는 아쉽지'],
  10: ['대박이 날 것 같구나', '10번이면 되지 않을까'],
  100: ['여기서 터지면 진짜 전설이다', '진짜 한 번만 줘도 됩니다']
};

const getBallColor = (number) => {
  if (number >= 1 && number <= 10) return '#f1b800';
  if (number >= 11 && number <= 20) return '#3ba9e0';
  if (number >= 21 && number <= 30) return '#e64545';
  if (number >= 31 && number <= 40) return '#666666';
  if (number >= 41 && number <= 45) return '#7fbf00';
  return '#6200ee';
};

export default function AutoNumber() {
  useEffect(() => {
    document.title = '로또번호 채굴 - Moneyrise.net';
  }, []);
  const [setCount, setSetCount] = useState(1);
  const [resultSets, setResultSets] = useState([]);
  const [phrase, setPhrase] = useState('');
  const captureRef = useRef();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  const [inputNumbers, setInputNumbers] = useState(Array(6).fill(''));
  const [matchResult, setMatchResult] = useState('');

  const [lastRound, setLastRound] = useState(null);
  const [lastWinningNumbers, setLastWinningNumbers] = useState([]);
  const [lastBonusNumber, setLastBonusNumber] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // DB에서 가져온 로또 데이터 상태
  const [lottoHistory, setLottoHistory] = useState([]);

  // 캡쳐 시 버튼 숨기기용 상태
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    setPhrase(getRandomPhrase(1));

    // API로부터 DB 데이터 불러오기
    fetch(`${API_BASE_URL}/api/lotto-history`)
      .then(res => res.json())
      .then(data => {
        setLottoHistory(data);

        if (data.length > 0) {
          const latest = data.reduce((max, cur) => (cur["회차"] > max["회차"] ? cur : max), data[0]);
          setLastRound(latest["회차"]);
          setLastWinningNumbers([
            latest["번호1"],
            latest["번호2"],
            latest["번호3"],
            latest["번호4"],
            latest["번호5"],
            latest["번호6"],
          ]);
          setLastBonusNumber(latest["보너스"]);
        }
      })
      .catch(err => {
        console.error('로또 데이터 로딩 실패:', err);
      });
  }, []);

  const getRandomPhrase = (count) => {
    const arr = phrases[count] || [];
    if (arr.length === 0) return '';
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const pickRandomSix = (arr) => {
    const copy = [...arr];
    const picked = [];
    while (picked.length < 6 && copy.length > 0) {
      const idx = Math.floor(Math.random() * copy.length);
      picked.push(copy.splice(idx, 1)[0]);
    }
    return picked;
  };

  const handleDraw = () => {
    const existingSets = new Set();

    lottoHistory.forEach((round) => {
      const firstPrize = [
        round["번호1"],
        round["번호2"],
        round["번호3"],
        round["번호4"],
        round["번호5"],
        round["번호6"],
      ].sort((a, b) => a - b);
      existingSets.add(firstPrize.join(','));

      const firstPrizeNumbers = firstPrize;
      const bonusNumber = round["보너스"];

      for (let i = 0; i < firstPrizeNumbers.length; i++) {
        const fiveNums = firstPrizeNumbers.filter((_, idx) => idx !== i);
        const twoPrizeCombo = [...fiveNums, bonusNumber].sort((a, b) => a - b);
        existingSets.add(twoPrizeCombo.join(','));
      }
    });

    const newResultSets = [];
    for (let i = 0; i < setCount; i++) {
      let picked;
      let key;
      let tries = 0;

      do {
        picked = pickRandomSix(allNumbers).sort((a, b) => a - b);
        key = picked.join(',');
        tries++;
        if (tries > 1000) {
          alert('추천 가능한 번호 조합이 부족합니다.');
          return;
        }
      } while (existingSets.has(key));

      newResultSets.push(picked);
    }
    setResultSets(newResultSets);
  };

  const handleNumberInput = (index, value) => {
    if (value === '') {
      const updated = [...inputNumbers];
      updated[index] = '';
      setInputNumbers(updated);
      setMatchResult('');
      return;
    }

    if (!/^\d+$/.test(value)) return;

    const num = Number(value);
    if (num < 1 || num > 45) return;

    const updated = [...inputNumbers];
    updated[index] = value;

    if (value.length >= 2) {
      const isDuplicate = updated.some((v, i) => i !== index && Number(v) === num);
      if (isDuplicate) return;
    }

    setInputNumbers(updated);

    if (updated.every(v => /^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 45)) {
      checkCombination(updated.map(Number));
    } else {
      setMatchResult('');
    }
  };

  const handleInputFocus = (index) => {
    const updated = [...inputNumbers];
    updated[index] = '';
    setInputNumbers(updated);
    setMatchResult('');
  };

  const checkCombination = (input) => {
    let first = 0, second = 0, third = 0, fourth = 0, fifth = 0;

    lottoHistory.forEach(round => {
      const winNums = [
        round["번호1"], round["번호2"], round["번호3"],
        round["번호4"], round["번호5"], round["번호6"]
      ];
      const bonus = round["보너스"];
      const match = input.filter(n => winNums.includes(n)).length;
      const bonusMatch = input.includes(bonus);

      if (match === 6) first++;
      else if (match === 5 && bonusMatch) second++;
      else if (match === 5) third++;
      else if (match === 4) fourth++;
      else if (match === 3) fifth++;
    });

    setMatchResult(`이 조합은 1등 ${first}번, 2등 ${second}번, 3등 ${third}번, 4등 ${fourth}번, 5등 ${fifth}번 당첨되었습니다.`);
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (!successful) alert('복사에 실패했습니다.');
    } catch (err) {
      alert('복사에 실패했습니다.');
    }
    document.body.removeChild(textArea);
  };

  const handleCopy = () => {
    const textToCopy = resultSets.map((set) => set.join(' ')).join('\n');
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(textToCopy)
          .then(() => alert('번호가 클립보드에 복사되었습니다!'))
          .catch(() => fallbackCopyTextToClipboard(textToCopy));
      } else {
        fallbackCopyTextToClipboard(textToCopy);
      }
    } catch {
      fallbackCopyTextToClipboard(textToCopy);
    }
  };

  const handleCopyInput = () => {
    if (!inputNumbers.every(v => /^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 45)) {
      alert('6개의 번호를 모두 올바르게 입력해주세요.');
      return;
    }
    const textToCopy = inputNumbers.join(' ');
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      navigator.clipboard.writeText(textToCopy)
        .then(() => alert('입력한 번호가 클립보드에 복사되었습니다!'))
        .catch(() => fallbackCopyTextToClipboard(textToCopy));
    } else {
      fallbackCopyTextToClipboard(textToCopy);
    }
  };

  const handleDownloadImage = async () => {
    if (!captureRef.current) return;
    try {
      setIsCapturing(true);
      await new Promise(r => setTimeout(r, 100));
      const canvas = await html2canvas(captureRef.current);
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'lotto_numbers.png';
      link.click();
    } catch {
      alert('이미지 저장에 실패했습니다.');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleDownloadInputImage = async () => {
    if (!captureRef.current) return;
    try {
      setIsCapturing(true);
      await new Promise(r => setTimeout(r, 100));
      const canvas = await html2canvas(captureRef.current);
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = 'input_lotto_numbers.png';
      link.click();
    } catch {
      alert('이미지 저장에 실패했습니다.');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleChangeCount = (e) => {
    const value = Number(e.target.value);
    setSetCount(value);
    setPhrase(getRandomPhrase(value));
  };

  return (
    <>
    {isMobile && (
      <SS.AdsArea>
        <AdsBanner />
      </SS.AdsArea>
    )}
    <S.Parent>
      <S.MainWord>-한번도 안 나온 번호로 시도하면 언젠가는 되지 않을까-</S.MainWord>

      {lastRound && lastWinningNumbers.length === 6 && (
        <S.LastWinningContainer>
          <S.LastWinningTitle>지난 로또 당첨 번호: {lastRound}회차</S.LastWinningTitle>
          <S.LastWinningNumbers>
            {lastWinningNumbers.map((num) => (
              <S.NumberBall key={num} bgColor={getBallColor(num)}>
                {num}
              </S.NumberBall>
            ))}
            <S.Bonus>+</S.Bonus>
            <S.NumberBall bgColor="#9c27b0">{lastBonusNumber}</S.NumberBall>
          </S.LastWinningNumbers>
        </S.LastWinningContainer>
      )}

      <S.Container ref={captureRef}>
        <S.Title>로또번호 채굴</S.Title>
        <S.EmptyBox1/>
        <S.Title>🔴역대 한 번도 안 나온 번호 추천🟡</S.Title>
        <S.Row>
          <S.RandomPhrase>{phrase}</S.RandomPhrase>
          <S.Chepter1Right>
            <S.StyledSelect value={setCount} onChange={handleChangeCount}>
              {[1, 5, 10, 100].map((num) => (
                <option key={num} value={num}>
                  {num}회
                </option>
              ))}
            </S.StyledSelect>
            <S.Button onClick={handleDraw}>번호뽑기</S.Button>
          </S.Chepter1Right>
        </S.Row>

        {resultSets.length > 0 && !isCapturing && (
          <S.ButtonDiv>
            <S.StyledButton2 onClick={handleCopy}>숫자복사</S.StyledButton2>
            <S.StyledButton2 onClick={handleDownloadImage}>사진 저장</S.StyledButton2>
          </S.ButtonDiv>
        )}

        {resultSets.map((set, idx) => (
          <S.NumberList key={idx}>
            {set.map((num) => (
              <S.NumberBall key={num} bgColor={getBallColor(num)}>
                {num}
              </S.NumberBall>
            ))}
          </S.NumberList>
        ))}

        <S.EmptyBox2/>
        <S.Title>이 번호는 역대 몇 번 당첨이 되었을까?</S.Title>
        <S.NumberList>
          {inputNumbers.map((val, idx) => (
            <S.InputBall
              key={idx}
              type="number"
              min="1"
              max="45"
              value={val}
              bgColor={val ? getBallColor(Number(val)) : '#ddd'}
              onChange={(e) => handleNumberInput(idx, e.target.value)}
              onFocus={() => handleInputFocus(idx)}
            />
          ))}
        </S.NumberList>

        {inputNumbers.every(v => /^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 45) && !isCapturing && (
          <S.ButtonDiv>
            <S.StyledButton2 onClick={handleCopyInput}>숫자 복사</S.StyledButton2>
            <S.StyledButton2 onClick={handleDownloadInputImage}>사진 저장</S.StyledButton2>
          </S.ButtonDiv>
        )}

        <S.MatchResult>{matchResult}</S.MatchResult>
      </S.Container>

 	  {isMobile && (
      <SS.AdsArea>
        <AdsBanner />
      </SS.AdsArea>
    )}
    

    <S.Container>
      <h1>목차</h1>
        <SS.LiTitle><a href="#percent">로또 당첨확률</a></SS.LiTitle> 
        <SS.LiTitle><a href="#info">설명</a></SS.LiTitle> 
        <SS.LiTitle><a href="#num1">역대 한 번도 안 나온 번호 추천</a></SS.LiTitle> 
        <SS.LiTitle><a href="#num2">이 번호는 역대 몇 번 당첨이 되었을까?</a></SS.LiTitle> 
        <SS.LiTitle><a href="#example">예시</a></SS.LiTitle> 

      <h1 id="percent">로또 당첨확률</h1>
      <SS.ExempleImg src="/images/lotto.png" alt="Logo" />
      실질적 당첨 확률은 무려 이렇게 낮지만 우리는 가능성을 올릴 수 있습니다.

      <h1 id="info">설명</h1>
      로또번호 채굴기는 흔한 로또 번호 생성기와 유사하지만 차별성도 분명히 있습니다.
      <br/>당첨되기 위한 경우의 수는 무려 8,145,060 이지만 이제까지 1등에 당첨된 수가 중복으로 당첨된 점이 없다는 점을 우리가 알아야 합니다. 
      얼마 안되지만 그렇게 된다면 거진 1200의 확률은 벗어날 수 있다는 것이겠죠. 한 번호만 틀린 보너스의 2등 상황까지 제외를 하고 생각한다면 
      확률은 더욱 올라가게 됩니다. 
      <br/>저희 사이트에는 당첨확률에만 집중하고 금액은 기재하지 않았습니다. 당첨이 되지 않는다면 해당 금액은 중요하지 않기 때문입니다.
        

      <h1 id="num1">역대 한 번도 <br/>안 나온 번호 추천</h1>
      역대 당첨번호 중 1등과 보너스인 2등의 조합을 제외하고 번호를 생성하는 번호 생성기입니다.
      번호는 1회, 5회, 10회, 100회를 한번에 생성할 수 있으며, 복사 시 1 2 3 4 5 6 이런식으로 복사가 됩니다.
      사진으로도 저장을 하실 수 있습니다.
      100회를 생성하게 될 때 스압에 주의하시기 바랍니다. 
      100회가 max인 이유는 한번에 구매할 수 있는 비용이 10만원 한도이기 때문입니다😄 

      <h1 id="num2">이 번호는 역대 <br/>몇 번 당첨이 되었을까?</h1>
      6개의 번호를 기입하게 되면 해당 조합이 역대 로또에서 몇등에 몇번 당첨하게 되었는지 알려주는 만들고도 뿌듯한 기능입니다. 
      어떻게 활용하는가에 따라 굉장한 도움이 될거라고 생각됩니다.
       
      <h1 id="example">예시</h1>
      <SS.ExempleImg src="/images/lotto-exem1.png" alt="Logo" />
      저는 현재 아직까지 번호 직접입력해서 2등을 본적이 한번도 없습니다..😅
      


    </S.Container>
    
    </S.Parent>

	   
    {!isMobile && (
      <SS.AdWrapper>
        <SS.AdsArea>
          <AdsBanner />
        </SS.AdsArea>
        <SS.AdsArea>
          <AdsBanner />
        </SS.AdsArea>
      </SS.AdWrapper>
    )}


    </>
  );
}
