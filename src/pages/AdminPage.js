import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000';
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hasAuthenticatedRef = useRef(false);

  const [formData, setFormData] = useState({
    회차: '',
    번호1: '', 번호2: '', 번호3: '', 번호4: '', 번호5: '', 번호6: '',
    보너스: ''
  });
  const [message, setMessage] = useState('');
  const [qnaList, setQnaList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 🔐 인증 로직 (1회만 실행)
  useEffect(() => {
    if (hasAuthenticatedRef.current) return;
    hasAuthenticatedRef.current = true;

    const authenticate = () => {
      const first = prompt('좋아하는 음식은?');
      if (first !== process.env.REACT_APP_PASSWORD_FIRST) {
        alert('아직 개발중인 페이지입니다.');
        navigate('/');
        return;
      }

      const second = prompt('우리집 강아지 이름은?');
      if (second !== process.env.REACT_APP_PASSWORD_SECOND) {
        alert('아직 개발중인 페이지입니다.');
        navigate('/');
        return;
      }

      setIsAuthenticated(true);
      fetchQnaList();
    };

    authenticate();
  }, [navigate]);

  const fetchQnaList = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/qna`);
      setQnaList(res.data);
    } catch (error) {
      console.error('문의 목록 불러오기 실패', error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (!formData[key] || isNaN(Number(formData[key]))) {
        setMessage(`${key}가 올바르지 않습니다.`);
        return;
      }
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/lotto-add`, {
        회차: Number(formData.회차),
        번호1: Number(formData.번호1),
        번호2: Number(formData.번호2),
        번호3: Number(formData.번호3),
        번호4: Number(formData.번호4),
        번호5: Number(formData.번호5),
        번호6: Number(formData.번호6),
        보너스: Number(formData.보너스)
      });
      setMessage(res.data.message);
      setFormData({
        회차: '',
        번호1: '', 번호2: '', 번호3: '', 번호4: '', 번호5: '', 번호6: '',
        보너스: ''
      });
    } catch (error) {
      setMessage('추가 중 오류 발생');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/api/qna/${id}`);
      alert('문의가 삭제되었습니다.');
      fetchQnaList();
    } catch (error) {
      alert('삭제 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  // 🔒 인증 전에는 아무것도 안 보임
  if (!isAuthenticated) return null;

  // 📄 페이지네이션 처리
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = qnaList.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(qnaList.length / itemsPerPage);

  return (
    <div style={{ padding: 20 }}>
      <h2>관리자 - 로또 번호 추가</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
        {['회차', '번호1', '번호2', '번호3', '번호4', '번호5', '번호6', '보너스'].map((name) => (
          <input
            key={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={name}
            style={{ marginRight: 5 }}
          />
        ))}
        <button type="submit">추가하기</button>
      </form>
      <p>{message}</p>

      <h2>문의 목록</h2>
      {qnaList.length === 0 && <p>문의가 없습니다.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {currentItems.map(({ id, title, q, a, created_at }) => (
          <li key={id} style={{ border: '1px solid #ddd', marginBottom: 15, padding: 15 }}>
            <strong>제목: {title}</strong><br />
            <small>작성일: {new Date(created_at).toLocaleString()}</small>
            <p>내용: {q}</p>
            <button
              onClick={() => handleDelete(id)}
              style={{ marginTop: 10, backgroundColor: 'red', color: 'white' }}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      {/* 페이지네이션 */}
      {qnaList.length > itemsPerPage && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{ marginRight: 10 }}
          >
            이전
          </button>
          <span>{currentPage} / {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ marginLeft: 10 }}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
