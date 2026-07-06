export default function AISummaryCard({
  summary,
  loading,
  onAnalyze,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 mt-8 border border-slate-800">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          ✨ AI Business Summary
        </h2>

        <button
          onClick={onAnalyze}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

      </div>

      <div className="mt-5 whitespace-pre-wrap text-gray-300 leading-7">
        {summary}
      </div>

    </div>
  );
}