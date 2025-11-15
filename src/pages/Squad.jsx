// src/pages/Squad.jsx
import React, { useEffect, useState, useRef } from "react";
import * as S from "./Squad.styles";
import html2canvas from "html2canvas";

const mapPlayersToFormationLines = (teamData, formationData) => {
  if (!formationData || !formationData.lines || !Array.isArray(formationData.lines)) return [];

  const lines = formationData.lines;
  const playerMap = new Map();
  teamData.players.forEach(player => {
    if (!playerMap.has(player.position)) playerMap.set(player.position, []);
    playerMap.get(player.position).push({ ...player });
  });

  return lines.map(line => {
    const playersInLine = [];
    line.positions.forEach(pos => {
      const availablePlayers = playerMap.get(pos);
      if (availablePlayers && availablePlayers.length > 0) {
        playersInLine.push(availablePlayers.shift());
      } else {
        playersInLine.push(null);
      }
    });
    return playersInLine;
  });
};

const PlayerCircle = ({ player, teamColor }) => (
  <S.PlayerCircle bgColor={teamColor}>
    <div className="player-ball">
      <S.PlayerNumber>{player.number}</S.PlayerNumber>
    </div>
    <S.PlayerName>{player.name}</S.PlayerName>
  </S.PlayerCircle>
);

const EmptySpot = () => (
  <S.EmptySpot>
    <div className="empty-ball"></div>
    <div className="empty-name-space"></div>
  </S.EmptySpot>
);

const Squad = () => {
  const [allTeamsData, setAllTeamsData] = useState(null);
  const [formations, setFormations] = useState(null);
  const [loadingError, setLoadingError] = useState(false);
  const [homeTeamInput, setHomeTeamInput] = useState('');
  const [awayTeamInput, setAwayTeamInput] = useState('');
  const [currentHomeTeam, setCurrentHomeTeam] = useState(null);
  const [currentAwayTeam, setCurrentAwayTeam] = useState(null);

  // FieldContainer 참조
  const fieldRef = useRef(null);

  useEffect(() => {
    Promise.all([
      fetch(process.env.PUBLIC_URL + "/squad.json").then(res => res.json()),
      fetch(process.env.PUBLIC_URL + "/formation.json").then(res => res.json())
    ])
      .then(([squadsJson, formationJson]) => {
        setAllTeamsData(squadsJson.teams);
        setFormations(formationJson);
      })
      .catch(error => {
        console.error("JSON 파일 로딩 에러:", error);
        setLoadingError(true);
      });
  }, []);

  const normalizeTeamName = (name) => name.trim().replace(/\s/g, '').toLowerCase();

  const handleShowSquad = () => {
    if (!allTeamsData || !formations) {
      alert("데이터 로딩 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    const normalizedHomeInput = normalizeTeamName(homeTeamInput);
    const normalizedAwayInput = normalizeTeamName(awayTeamInput);

    const normalizedTeamsMap = {};
    for (const teamKey in allTeamsData) {
      if (Object.hasOwnProperty.call(allTeamsData, teamKey)) {
        normalizedTeamsMap[normalizeTeamName(teamKey)] = allTeamsData[teamKey];
      }
    }

    const homeData = normalizedTeamsMap[normalizedHomeInput];
    const awayData = normalizedTeamsMap[normalizedAwayInput];

    if (!homeData || !awayData) {
      if (!homeData) alert(`홈팀 '${homeTeamInput}'을(를) 찾을 수 없습니다.`);
      if (!awayData) alert(`어웨이팀 '${awayTeamInput}'을(를) 찾을 수 없습니다.`);
      setCurrentHomeTeam(null);
      setCurrentAwayTeam(null);
      return;
    }

    setCurrentHomeTeam({ ...homeData, teamName: Object.keys(allTeamsData).find(key => normalizeTeamName(key) === normalizedHomeInput) });
    setCurrentAwayTeam({ ...awayData, teamName: Object.keys(allTeamsData).find(key => normalizeTeamName(key) === normalizedAwayInput) });
  };

  // 다운로드 함수
  const handleDownloadSquad = () => {
    if (!fieldRef.current) return;

    html2canvas(fieldRef.current, { scale: 2 }).then(canvas => {
      const link = document.createElement("a");
      link.download = `${currentHomeTeam.teamName}_vs_${currentAwayTeam.teamName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  };

  if (loadingError) return <div>파일 로딩 중 에러 발생. squad.json과 formation.json 확인.</div>;
  if (!allTeamsData || !formations) return <div>모든 팀 데이터 로딩중...</div>;

  const showSquadDisplay = currentHomeTeam && currentAwayTeam;

  let homeArrangedLines = [];
  let awayLinesForDisplay = [];

  if (showSquadDisplay) {
    const homeFormationData = formations[currentHomeTeam.formation];
    if (homeFormationData) homeArrangedLines = mapPlayersToFormationLines(currentHomeTeam, homeFormationData);

    const awayFormationData = formations[currentAwayTeam.formation];
    let awayArrangedLines = [];
    if (awayFormationData) awayArrangedLines = mapPlayersToFormationLines(currentAwayTeam, awayFormationData);

    let awayGKLine = null;
    awayArrangedLines.forEach(line => {
      if (line && line.some(p => p && p.position === 'GK')) awayGKLine = line;
      else if (line) awayLinesForDisplay.unshift([...line].reverse());
    });
    if (awayGKLine) awayLinesForDisplay.push(awayGKLine);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      {/* 입력 폼 */}
      <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f0f0f0', borderRadius: '8px', marginBottom: '20px', width: '100%', maxWidth: '480px', boxSizing: 'border-box' }}>
        <h2>스쿼드 시뮬레이터</h2>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="homeTeam">홈팀 이름: </label>
          <input
            id="homeTeam"
            type="text"
            value={homeTeamInput}
            onChange={(e) => setHomeTeamInput(e.target.value)}
            placeholder="예: 레알 마드리드"
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '70%' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="awayTeam">어웨이팀 이름: </label>
          <input
            id="awayTeam"
            type="text"
            value={awayTeamInput}
            onChange={(e) => setAwayTeamInput(e.target.value)}
            placeholder="예: 마요르카"
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', width: '70%' }}
          />
        </div>
        <button
          onClick={handleShowSquad}
          style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          스쿼드 보기
        </button>
      </div>

      {showSquadDisplay ? (
        <>
          <S.FieldContainer ref={fieldRef} bgImage={currentHomeTeam.bgImage || ""}>
            <S.TeamNameDisplay side="home" align="left">{currentHomeTeam.teamName}</S.TeamNameDisplay>
            <S.FormationDisplay side="home" align="right">{currentHomeTeam.formation}</S.FormationDisplay>

            {homeArrangedLines.map((line, idx) => (
              <S.LineupContainer key={`home-line-${idx}`}>
                {line.map((player, pIdx) => player ? <PlayerCircle key={pIdx} player={player} teamColor={currentHomeTeam.teamColor} /> : <EmptySpot key={pIdx} />)}
              </S.LineupContainer>
            ))}

            <S.VsText>vs</S.VsText>

            {awayLinesForDisplay.map((line, idx) => (
              <S.LineupContainer key={`away-line-${idx}`}>
                {line.map((player, pIdx) => player ? <PlayerCircle key={pIdx} player={player} teamColor={currentAwayTeam.teamColor} /> : <EmptySpot key={pIdx} />)}
              </S.LineupContainer>
            ))}

            <S.TeamNameDisplay side="away" align="left">{currentAwayTeam.teamName}</S.TeamNameDisplay>
            <S.FormationDisplay side="away" align="right">{currentAwayTeam.formation}</S.FormationDisplay>
          </S.FieldContainer>

          <button
            onClick={handleDownloadSquad}
            style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            스쿼드 이미지 다운로드
          </button>
        </>
      ) : (
        <div style={{ textAlign: 'center', color: '#666', marginTop: '50px' }}>
          위에서 팀 이름을 입력하고 '스쿼드 보기' 버튼을 눌러주세요!
        </div>
      )}
    </div>
  );
};

export default Squad;
