require('dotenv').config(); // .env 적용을 위해 추가
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;
const lottoDbPath = process.env.DB_LOTTO_PATH || './lotto.db';
const qnaDbPath = process.env.DB_QNA_PATH || './qna.db';

// CORS 설정 (필요에 따라 origin 제한 가능)
app.use(cors());

// JSON 바디 파싱 미들웨어
app.use(express.json());

// SQLite DB 연결 (읽기/쓰기 모드)
const db = new sqlite3.Database(path.resolve(lottoDbPath), sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('❌ lotto.db 연결 실패:', err.message);
    process.exit(1);
  }
  console.log('✅ lotto.db 연결 성공');
});

// 로또 전체 기록 조회 API
app.get('/api/lotto-history', (req, res) => {
  const query = `SELECT * FROM lotto_result ORDER BY 회차 DESC`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('❌ lotto_result 조회 오류:', err.message);
      return res.status(500).json({ error: 'DB 조회 실패' });
    }
    res.json(rows);
  });
});

// 로또 번호 추가 API
app.post('/api/lotto-add', (req, res) => {
  const { 회차, 번호1, 번호2, 번호3, 번호4, 번호5, 번호6, 보너스 } = req.body;

  if (!회차 || !번호1 || !번호2 || !번호3 || !번호4 || !번호5 || !번호6 || !보너스) {
    return res.status(400).json({ error: '필수 항목이 누락되었습니다.' });
  }

  const query = `
    INSERT INTO lotto_result (회차, 번호1, 번호2, 번호3, 번호4, 번호5, 번호6, 보너스)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [회차, 번호1, 번호2, 번호3, 번호4, 번호5, 번호6, 보너스], function(err) {
    if (err) {
      console.error('❌ lotto_result 삽입 오류:', err.message);
      return res.status(500).json({ error: 'DB 삽입 실패' });
    }
    res.json({ message: '로또 번호가 성공적으로 추가되었습니다.', id: this.lastID });
  });
});

// ------------------------------
// QnA 문의 게시판 API (qna.db)
// ------------------------------

// QnA용 DB 연결
const qnaDb = new sqlite3.Database(path.resolve(qnaDbPath), sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('❌ qna.db 연결 실패:', err.message);
    return;
  }
  console.log('✅ qna.db 연결 성공');
});

// 전체 문의 목록 조회
app.get('/api/qna', (req, res) => {
  const query = `SELECT * FROM qna ORDER BY created_at DESC`;
  qnaDb.all(query, [], (err, rows) => {
    if (err) {
      console.error('❌ QnA 조회 실패:', err.message);
      return res.status(500).json({ error: 'DB 조회 실패' });
    }
    res.json(rows);
  });
});

// 문의 등록 (질문)
app.post('/api/qna', (req, res) => {
  const { title, q } = req.body;

  if (!title || !q) {
    return res.status(400).json({ error: '제목과 질문은 필수입니다.' });
  }

  const query = `INSERT INTO qna (title, q) VALUES (?, ?)`;

  qnaDb.run(query, [title, q], function(err) {
    if (err) {
      console.error('❌ QnA 등록 실패:', err.message);
      return res.status(500).json({ error: 'DB 삽입 실패' });
    }
    res.json({ message: '문의가 등록되었습니다.', id: this.lastID });
  });
});

// 관리자 답변 등록
app.post('/api/qna/:id/answer', (req, res) => {
  const { a } = req.body;
  const { id } = req.params;

  if (!a) {
    return res.status(400).json({ error: '답변을 입력해주세요.' });
  }

  const query = `UPDATE qna SET a = ? WHERE id = ?`;

  qnaDb.run(query, [a, id], function(err) {
    if (err) {
      console.error('❌ 답변 등록 실패:', err.message);
      return res.status(500).json({ error: 'DB 업데이트 실패' });
    }
    res.json({ message: '답변이 등록되었습니다.', updated: this.changes });
  });
});

// 문의 삭제 API
app.delete('/api/qna/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM qna WHERE id = ?`;

  qnaDb.run(query, [id], function(err) {
    if (err) {
      console.error('❌ 문의 삭제 실패:', err.message);
      return res.status(500).json({ error: '삭제 실패' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: '삭제할 문의를 찾을 수 없습니다.' });
    }
    res.json({ message: '문의가 삭제되었습니다.' });
  });
});

// 서버 실행 (0.0.0.0 바인딩 시 외부접속 가능)
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 서버 실행 중: http://0.0.0.0:${PORT}`);
});
