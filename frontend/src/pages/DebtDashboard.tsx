import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import DebtForm from '../components/DebtForm';
import DebtList from '../components/DebtList';
import SummaryCard from '../components/SummaryCard';

interface Debt {
  id: number;
  name: string;
  amount: number;
  interest_rate: number;
  min_payment?: number;
}

interface DebtFormData {
  name: string;
  amount: string;
  interest_rate: string;
  min_payment: string;
}

interface Summary {
  totalDebt: number;
  debtCount: number;
  monthlyIncome?: number;
}

const API_URL = '/api';

export default function DebtDashboard(): JSX.Element {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [summary, setSummary] = useState<Summary>({ totalDebt: 0, debtCount: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchDebts();
    fetchSummary();
  }, []);

  const fetchDebts = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<Debt[]>(`${API_URL}/debts`);
      setDebts(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load debts');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async (): Promise<void> => {
    try {
      const response = await axios.get<Summary>(`${API_URL}/strategy/overview`);
      setSummary(response.data);
    } catch (err) {
      console.error('Failed to load summary:', err);
    }
  };

  const handleAddDebt = async (debtData: DebtFormData): Promise<void> => {
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

  const handleDeleteDebt = async (id: number): Promise<void> => {
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
