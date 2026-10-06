import Header from './components/Header';
import DebtDashboard from './pages/DebtDashboard';

function App(): JSX.Element {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <DebtDashboard />
      </main>
    </div>
  );
}

export default App;
