import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as S from './Qna.styles';

export default function Qna() {
  const [title, setTitle] = useState('');
  const [question, setQuestion] = useState('');
  const [inquiries, setInquiries] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const inquiriesPerPage = 5;

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';

  useEffect(() => {
    document.title = '건의 및 칭찬 - Moneyrise.net';
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/qna`);
      setInquiries(res.data);
    } catch (err) {
      console.error('❌ 문의 불러오기 실패:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !question) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const confirmed = window.confirm('등록하시겠습니까?');
    if (!confirmed) return;

    try {
      await axios.post(`${API_BASE_URL}/api/qna`, {
        title,
        q: question,
      });
      setTitle('');
      setQuestion('');
      fetchInquiries();
      setCurrentPage(1); // 최신 글 등록 시 1페이지로 이동
      alert('등록이 완료되었습니다.');
    } catch (err) {
      console.error('❌ 문의 등록 실패:', err);
      alert('등록 실패!');
    }
  };


  // 🔽 페이지네이션 관련 처리
  const sortedInquiries = [...inquiries]; // 최신순
  const indexOfLast = currentPage * inquiriesPerPage;
  const indexOfFirst = indexOfLast - inquiriesPerPage;
  const currentInquiries = sortedInquiries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedInquiries.length / inquiriesPerPage);

  return (
    <S.Container>
      <S.Title>건의나 칭찬을 올려주세요!</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.Input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <S.TextArea
          placeholder="ex) 이런 컨텐츠가 필요해요! 이부분 수정해주세요!! 이런건 제가 하기 너무 귀찮은데 만들어주세요!!!🤤 이야 이런거 필요했는데 정말 대단해요!!!!"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <S.Button type="submit">문의 등록</S.Button>
        <div>(빠른 시일 내에 회신 후 건의라면 수용할 수 있도록 노력할 것이며, 칭찬이라면 더욱 성장하도록 노력 하겠습니다!😎)</div>
      </S.Form>
    </S.Container>
  );
}
