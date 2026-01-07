import SearchForm from './components/SearchForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Housing Average Price</h1>
          <p className="text-gray-600">Filter and analyze housing prices by your criteria</p>
        </div>

        {/* Search Form Card */}
        <div className="bg-gray-50 rounded-2xl shadow-sm p-8">
          <SearchForm />
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">Powered by housing market data • MVP version 0.1</p>
        </div>
      </div>
    </div>
  );
}
