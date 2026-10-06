import { useState, useEffect } from 'react';
import axios from 'axios';
import DebtForm from '../components/DebtForm';
import DebtList from '../components/DebtList';
import SummaryCard from '../components/SummaryCard';

const API_URL = '/api';

export default function DebtDashboard() {
  const [debts, setDebts] = useState([]);
  const [summary, setSummary] = useState({ totalDebt: 0, debtCount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDebts();
    fetchSummary();
  }, []);

  const fetchDebts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/debts`);
      setDebts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load debts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${API_URL}/strategy/overview`);
      setSummary(response.data);
    } catch (err) {
      console.error('Failed to load summary:', err);
    }
  };

  const handleAddDebt = async (debtData) => {
    try {
      await axios.post(`${API_URL}/debts`, debtData);
      fetchDebts();
      fetchSummary();
      setError('');
    } catch (err) {
      setError('Failed to add debt');
      console.error(err);
    }
  };

  const handleDeleteDebt = async (id) => {
    if (window.confirm('Are you sure you want to delete this debt?')) {
      try {
        await axios.delete(`${API_URL}/debts/${id}`);
        fetchDebts();
        fetchSummary();
      } catch (err) {
        setError('Failed to delete debt');
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCard
          title="Total Debt"
          value={`$${summary.totalDebt.toFixed(2)}`}
          icon="💳"
          color="red"
        />
        <SummaryCard
          title="Debts"
          value={summary.debtCount}
          icon="📊"
          color="blue"
        />
        <SummaryCard
          title="Monthly Income"
          value={`$${(summary.monthlyIncome || 0).toFixed(2)}`}
          icon="💰"
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <DebtForm onSubmit={handleAddDebt} />
        </div>
        <div className="lg:col-span-2">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (
            <DebtList debts={debts} onDelete={handleDeleteDebt} />
          )}
        </div>
      </div>
    </div>
  );
}
