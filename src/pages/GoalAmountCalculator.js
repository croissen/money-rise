import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import html2canvas from 'html2canvas';
import {
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  differenceInYears,
  addDays,
  addYears,
  subDays,
  subYears,
  addMonths,
  subMonths,
} from 'date-fns';
import * as S from './GoalAmountCalculator.styles';
import * as SS from './Styles';
import 'react-datepicker/dist/react-datepicker.css';
import AdsBanner from '../components/AdsBanner';

export default function GoalAmountCalculator() {
  useEffect(() => {
    document.title = '목표금액계산기 - Moneyrise.net';
  }, []);
  const [goalName, setGoalName] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goalDate, setGoalDate] = useState(new Date());
  const [saveUnit, setSaveUnit] = useState('month');
  const [saveAmount, setSaveAmount] = useState(null);
  const [currentAmountOption, setCurrentAmountOption] = useState(10000);
  const [goalAmountOption, setGoalAmountOption] = useState(10000);
  const [selectedDateDelta, setSelectedDateDelta] = useState('1d');
  const [isCalculated, setIsCalculated] = useState(false);
  const [timeUnitInfo, setTimeUnitInfo] = useState('');
  const captureRef = useRef();
  const isAdAvailable = false;

  // 계산된 결과 고정용 (공유용)
  const [calculatedGoalName, setCalculatedGoalName] = useState('');
  const [calculatedGoalAmount, setCalculatedGoalAmount] = useState('');
  const [calculatedSaveUnit, setCalculatedSaveUnit] = useState('');
  const [calculatedSaveAmount, setCalculatedSaveAmount] = useState(null);
  const [calculatedTimeUnitInfo, setCalculatedTimeUnitInfo] = useState('');

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleClick = (e) => {
    e.preventDefault(); // 기본 동작 차단
    const id = e.currentTarget.getAttribute('href').substring(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const amountOptions = [
    { label: '1만원', value: 10000 },
    { label: '10만원', value: 100000 },
    { label: '100만원', value: 1000000 },
    { label: '1000만원', value: 10000000 },
    { label: '1억원', value: 100000000 },
  ];

  const dateDeltaOptions = [
    { label: '1일', value: '1d' },
    { label: '1주일', value: '7d' },
    { label: '1달', value: '1mo' },
    { label: '1년', value: '1y' },
    { label: '5년', value: '5y' },
    { label: '올해', value: 'thisYear' },
  ];

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <S.StyledInput
      ref={ref}
      onClick={onClick}
      value={value}
      readOnly
      style={{
        border: 'none',
        boxShadow: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        margin: '3px 0 0 0',
        width: '120px',
      }}
    />
  ));

  const removeCommas = (str) => (str ? str.replace(/,/g, '') : '');
  const addCommas = (num) => {
    if (!num) return '';
    const str = num.toString();
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleBalanceChange = (setter) => (e) => {
    const raw = removeCommas(e.target.value);
    if (/^\d*$/.test(raw)) {
      setter(raw);
    }
  };

  const addAmount = (setter, current, amount) => {
    const raw = Number(removeCommas(current || '0'));
    const updated = raw + amount;
    setter(String(updated < 0 ? 0 : updated));
  };

  const adjustGoalDate = (operation) => {
    if (!goalDate) return;
    let newDate = new Date(goalDate);
    const value = selectedDateDelta;
    const isAdd = operation === 'add';

    if (value === 'thisYear') {
      const year = new Date().getFullYear();
      newDate = new Date(year, 11, 31);
    } else if (value.endsWith('d')) {
      const days = parseInt(value);
      newDate = isAdd ? addDays(newDate, days) : subDays(newDate, days);
    } else if (value.endsWith('y')) {
      const years = parseInt(value);
      newDate = isAdd ? addYears(newDate, years) : subYears(newDate, years);
    } else if (value.endsWith('mo')) {
      const months = parseInt(value);
      newDate = isAdd ? addMonths(newDate, months) : subMonths(newDate, months);
    }

    setGoalDate(newDate);
  };

  const calculate = (saveUnitParam = saveUnit) => {
    if (!goalDate) {
      alert('목표 날짜를 선택해주세요!');
      return;
    }

    const today = new Date();
    const goal = parseInt(removeCommas(goalAmount), 10);
    const balance = parseInt(removeCommas(currentBalance), 10);
    const leftToSave = goal - balance;

    if (isNaN(goal) || isNaN(balance)) {
      setSaveAmount(null);
      setIsCalculated(false);
      setTimeUnitInfo('');
      return;
    }

    if (leftToSave <= 0) {
      setSaveAmount(0);
      setTimeUnitInfo('');
      setIsCalculated(true);
      setCalculatedGoalName(goalName);
      setCalculatedGoalAmount(goalAmount);
      setCalculatedSaveUnit(saveUnitParam);
      setCalculatedSaveAmount(0);
      setCalculatedTimeUnitInfo('');
      return;
    } else {
      let unitsLeft = 0;
      if (saveUnitParam === 'day') unitsLeft = differenceInDays(goalDate, today) + 1;
      else if (saveUnitParam === 'week') unitsLeft = differenceInWeeks(goalDate, today) + 1;
      else if (saveUnitParam === 'month') unitsLeft = differenceInMonths(goalDate, today) + 1;
      else if (saveUnitParam === 'year') unitsLeft = differenceInYears(goalDate, today) + 1;

      if (unitsLeft <= 0) {
        setSaveAmount(0);
        setTimeUnitInfo('');
        setIsCalculated(true);
        setCalculatedGoalName(goalName);
        setCalculatedGoalAmount(goalAmount);
        setCalculatedSaveUnit(saveUnitParam);
        setCalculatedSaveAmount(0);
        setCalculatedTimeUnitInfo('');
        return;
      }

      const result = Math.ceil(leftToSave / unitsLeft);
      setSaveAmount(result);

      const totalSeconds = Math.floor((goalDate.getTime() - today.getTime()) / 1000);
      const perSecond = totalSeconds > 0 ? leftToSave / totalSeconds : 0;
      const perMinute = perSecond * 60;
      const perHour = perMinute * 60;

      const info = `목표를 달성하려면 시간당 ${Math.ceil(perHour).toLocaleString()}원, ` +
        `분당 ${Math.ceil(perMinute).toLocaleString()}원, ` +
        `초당 ${Math.ceil(perSecond).toLocaleString()}원을 모아야 합니다! 🤤`;

      setTimeUnitInfo(info);
      setIsCalculated(true);

      // 고정용 상태에 저장
      setCalculatedGoalName(goalName);
      setCalculatedGoalAmount(goalAmount);
      setCalculatedSaveUnit(saveUnitParam);
      setCalculatedSaveAmount(result);
      setCalculatedTimeUnitInfo(info);
    }
  };

  const handleDownload = async () => {
    if (!captureRef.current) return;

    const canvas = await html2canvas(captureRef.current, {
      ignoreElements: (element) => element.classList?.contains('no-capture'),
    });

    const link = document.createElement('a');
    link.download = 'goal-savings-result.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  // 공유하기 버튼 클릭시 현재 결과를 포함한 URL 복사
  const handleShare = () => {
    if (!isCalculated) {
      alert('먼저 계산을 해주세요!');
      return;
    }

    const params = new URLSearchParams({
      goalName: calculatedGoalName,
      goalAmount: calculatedGoalAmount,
      saveUnit: calculatedSaveUnit,
      currentBalance: currentBalance || '0',
      goalDate: goalDate.toISOString().split('T')[0], // yyyy-mm-dd
    }).toString();

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params}`;

    navigator.clipboard.writeText(shareUrl)
      .then(() => alert('공유 링크가 복사되었습니다!'))
      .catch(() => alert('복사에 실패했습니다.'));
  };

  // URL 파라미터 읽어서 초기 상태 설정 + 자동 계산
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const goalNameParam = params.get('goalName');
    const goalAmountParam = params.get('goalAmount');
    const saveUnitParam = params.get('saveUnit');
    const currentBalanceParam = params.get('currentBalance');
    const goalDateParam = params.get('goalDate');

    if (goalNameParam) setGoalName(goalNameParam);
    if (goalAmountParam) setGoalAmount(goalAmountParam);
    if (saveUnitParam) setSaveUnit(saveUnitParam);
    if (currentBalanceParam) setCurrentBalance(currentBalanceParam);
    if (goalDateParam) setGoalDate(new Date(goalDateParam));

    if (goalNameParam && goalAmountParam && saveUnitParam && currentBalanceParam && goalDateParam) {
      // 파라미터 다 있으면 계산 자동 실행
      // saveUnit 상태 변경후 바로 계산하면 반영 안될 수 있어서, 직접 파라미터로 넘김
      calculate(saveUnitParam);
    }
  }, []);

  return (
    <>
    <S.Parent>
    {isMobile && isAdAvailable && (
      <SS.AdsArea>
        <AdsBanner />
      </SS.AdsArea>
    )}
    <S.MainWord>-필요하긴 했었는데 직접 하긴 귀찮았는데 뭐 이런걸 다-</S.MainWord>
    <S.Container ref={captureRef}>
      <S.Title>목표 금액 계산기</S.Title>

      <S.Label>목표명</S.Label>
      <div style={{ padding: '0 28px 0 0' }}><S.TitleInput
        type="text"
        placeholder="예: 결혼자금(선택)"
        value={goalName}
        onChange={(e) => setGoalName(e.target.value)}
      /></div>

      <S.Label>현재 잔고</S.Label>
      <S.InputWrapper>
        <S.StyledInput
          type="text"
          placeholder="예: 2,000,000"
          value={addCommas(currentBalance)}
          onChange={handleBalanceChange(setCurrentBalance)}
        />
        <S.MobileOneLine>
          <S.AmountButton onClick={() => addAmount(setCurrentBalance, currentBalance, -currentAmountOption)}>-</S.AmountButton>
          <S.StyledSelect value={currentAmountOption} onChange={(e) => setCurrentAmountOption(Number(e.target.value))}>
            {amountOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </S.StyledSelect>
          <S.AmountButton onClick={() => addAmount(setCurrentBalance, currentBalance, currentAmountOption)}>+</S.AmountButton>
        </S.MobileOneLine>
      </S.InputWrapper>

      <S.Label>목표 금액</S.Label>
      <S.InputWrapper>
        <S.StyledInput
          type="text"
          placeholder="예: 10,000,000"
          value={addCommas(goalAmount)}
          onChange={handleBalanceChange(setGoalAmount)}
        />
        <S.MobileOneLine>
          <S.AmountButton onClick={() => addAmount(setGoalAmount, goalAmount, -goalAmountOption)}>-</S.AmountButton>
          <S.StyledSelect value={goalAmountOption} onChange={(e) => setGoalAmountOption(Number(e.target.value))}>
            {amountOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </S.StyledSelect>
          <S.AmountButton onClick={() => addAmount(setGoalAmount, goalAmount, goalAmountOption)}>+</S.AmountButton>
        </S.MobileOneLine>
      </S.InputWrapper>

      <S.Label>목표 날짜</S.Label>
      <S.InputWrapper>
        <S.CalenderDiv>
          📆
          <DatePicker
            selected={goalDate}
            onChange={setGoalDate}
            dateFormat="yyyy.MM.dd"
            customInput={<CustomInput />}
          />
        </S.CalenderDiv>
        <S.MobileOneLine>
          <S.AmountButton onClick={() => adjustGoalDate('sub')}>-</S.AmountButton>
          <S.StyledSelect value={selectedDateDelta} onChange={(e) => setSelectedDateDelta(e.target.value)}>
            {dateDeltaOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </S.StyledSelect>
          <S.AmountButton onClick={() => adjustGoalDate('add')}>+</S.AmountButton>
        </S.MobileOneLine>
      </S.InputWrapper>

      <S.Label>모으는 단위 선택</S.Label>
      <S.StyledSelect value={saveUnit} onChange={(e) => setSaveUnit(e.target.value)}>
        <option value="day">하루 단위</option>
        <option value="week">1주일 단위</option>
        <option value="month">달 단위</option>
        <option value="year">년 단위</option>
      </S.StyledSelect>

      <S.StyledButton onClick={() => calculate()}>계산하기</S.StyledButton>

      {isCalculated && calculatedSaveAmount !== null && (
        <S.ResultText>
          {calculatedGoalName && (
            <>
              <strong>
                {calculatedGoalName} {addCommas(calculatedGoalAmount)}원을 위해
              </strong>
              <br />
            </>
          )}
          매{' '}
          {calculatedSaveUnit === 'day'
            ? '일'
            : calculatedSaveUnit === 'week'
            ? '주'
            : calculatedSaveUnit === 'month'
            ? '달'
            : '년'}{' '}
          모아야 할 금액 {calculatedSaveAmount.toLocaleString()}원
          <br />
          <S.ResultText2>{calculatedTimeUnitInfo}</S.ResultText2>
        </S.ResultText>
      )}

      {isCalculated && (
        <>
          <S.StyledButton2 className="no-capture" onClick={handleDownload}>
            결과 이미지 다운로드
          </S.StyledButton2>
        </>
      )}
    </S.Container>

    {isMobile && isAdAvailable && (
      <SS.AdsArea>
        <AdsBanner />
      </SS.AdsArea>
    )}

    <S.Container>
      <h1>목차</h1>
        <SS.LiTitle><a href="#how-to" onClick={handleClick}>사용법</a></SS.LiTitle> 
        <SS.LiTitle><a href="#example" onClick={handleClick}>예시</a></SS.LiTitle> 

      
      <h1 id="how-to">사용법</h1>
      목표 금액 계산기는 현재 구매를 목표로 하고 있는 액티브에 대해서 내 자산을 생각해봤을 때 얼마정도가 필요하며,  
      그 필요한 금액을 모으기 위하여 해당 기간동안 일, 주일, 달, 년 단위로 얼마를 꾸준히 모아야 목표를 달성할 수 있을지
      시뮬레이션 해주는 계산기입니다.
      <br/>

      <p><SS.Bold>목표명</SS.Bold>: 돈을 모으기 위한 목표를 적습니다.(선택사항)</p>
      <p><SS.Bold>현재 잔고</SS.Bold>: 
      목표 금액을 모으기 전 나의 현재 잔고를 입력합니다. 드롭다운을 통하여 편하게 해당 원 단위로 금액을 추가 감소 할 수 있습니다.</p>
      <p><SS.Bold>목표 금액</SS.Bold>: 목표에 따른 금액을 입력합니다. 드롭다운을 통하여 편하게 해당 원 단위로 금액을 추가 감소 할 수 있습니다.</p>
      <p><SS.Bold>목표 날짜</SS.Bold>: 목표를 이루기 위한 기한이 금일로부터 언제까지인지를 선택합니다. 달력을 클릭하여 선택할 수도 있고, 드롭다운을 통하여 편하게 선택하실 수 있습니다.
      올해까지라면 드롭다운에 올해를 선택후 + 버튼을 누르시면 설정되며, 내년 말로 하고 싶으시다면 올해 선택 후 +, 1년을 추가하시면 됩니다.</p>
      <p><SS.Bold>모으는 단위 선택</SS.Bold>: 목표 금액을 목표 날짜까지 모으기 위하여 드롭다운에 단위를 기준으로 얼마를 모아야 하는지 알려줍니다.</p>
      <p><SS.Bold>결과 이미지 다운로드</SS.Bold>: 기록한 값을 이미지로 저장하여 활용할 수 있습니다.</p>
       
      
      
      
      
      <h1 id="example">예시</h1>
      <SS.ExempleImg src={`${process.env.PUBLIC_URL}/images/calc-exem1.png`} />

    </S.Container>
    </S.Parent>
    
    {!isMobile && isAdAvailable && (
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
