import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GoalAmountCalculator from './pages/GoalAmountCalculator';
import AutoNumber from './pages/AutoNumber';
import EmptyPage from './pages/EmptyPage';
import AdsPage from './pages/AdsPage';
import GlobalStyle from './styles/GlobalStyle';
import GoldenItems from './pages/GoldenItems';
import LottoHistory from './pages/LottoHistory';

export default function App() {
  return (
    <Router>
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/goal-amount-calculator" element={<GoalAmountCalculator />} />
          <Route path="/auto-number" element={<AutoNumber />} />
          <Route path="/lotto-history" element={<LottoHistory />} />
          <Route path="/golden-items" element={<GoldenItems />} />
          <Route path="/empty-page" element={<EmptyPage />} />
          <Route path="/ads" element={<AdsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
