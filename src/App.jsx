import { useState, useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Search, Loader2, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function App() {
    const [url, setUrl] = useState('https://www.camara.cl/diputados/detalle/mociones.aspx?prmID=948');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch(`${API_URL}/api/v1/proyectos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            if (!response.ok) throw new Error('Error al conectar con la API');

            const data = await response.json();
            console.log(data);
            setResult(data);
        } catch (err) {
            setError(err.message || 'Ocurrió un error desconocido');
        } finally {
            setLoading(false);
        }
    };

    const chartData = useMemo(() => {
        if (!result) return null;

        const counts = {};
        result.data.forEach(p => {
            const estado = p.estado || 'Desconocido';
            counts[estado] = (counts[estado] || 0) + 1;
        });

        const labels = Object.keys(counts);
        const dataValues = Object.values(counts);

        const bgColors = labels.map(l => {
            const low = l.toLowerCase();
            if (low.includes('publicado')) return 'rgba(34, 197, 94, 0.6)'; // Verde
            if (low.includes('tramitación')) return 'rgba(59, 130, 246, 0.6)'; // Azul
            if (low.includes('archivado')) return 'rgba(107, 114, 128, 0.6)'; // Gris
            if (low.includes('rechazado') || low.includes('inadmisible')) return 'rgba(239, 68, 68, 0.6)'; // Rojo
            return 'rgba(234, 179, 8, 0.6)'; // Amarillo
        });

        return {
            labels,
            datasets: [{
                label: 'Proyectos',
                data: dataValues,
                backgroundColor: bgColors,
                borderColor: bgColors.map(c => c.replace('0.6', '1')),
                borderWidth: 1,
            }]
        };
    }, [result]);

    return (
        <div className="min-h-screen p-8 max-w-7xl mx-auto font-sans text-slate-800">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-slate-900 mb-2">🏛️ Visor Legislativo</h1>
                <p className="text-slate-500">Analiza la actividad de tus diputados en tiempo real</p>
            </header>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
                <form onSubmit={handleSubmit} className="flex gap-4">
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Pega la URL de la ficha del diputado aquí..."
                        className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 transition"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Search size={20} />}
                        {loading ? 'Analizando...' : 'Analizar'}
                    </button>
                </form>
                {error && <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}
            </div>

            {loading && (
                <div className="text-center py-20">
                    <Loader2 className="w-16 h-16 animate-spin mx-auto text-blue-500 mb-4" />
                    <p className="text-lg text-slate-600">El scraper está trabajando... esto puede tomar unos segundos.</p>
                </div>
            )}

            {result && chartData && (
                <div className="animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase">Total Proyectos</h3>
                            <p className="text-4xl font-bold text-slate-800 mt-2">{result.total}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 md:col-span-2">
                            <h3 className="text-sm font-semibold text-slate-500 uppercase">Periodos Parlamentarios</h3>
                            <p className="text-lg font-medium text-slate-800 mt-2">{result.diputado.periodos}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm h-96">
                            <h3 className="text-lg font-bold mb-4">Estado de los Proyectos</h3>
                            <div className="h-full pb-8">
                                <Bar data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm h-96 flex flex-col items-center">
                            <h3 className="text-lg font-bold mb-4">Distribución</h3>
                            <div className="h-64 w-64">
                                <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
                        <div className="p-6 border-b border-slate-200 bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-800">Detalle de Mociones</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-500 border-b">
                                <tr>
                                    <th className="p-4 font-semibold">Año</th>
                                    <th className="p-4 font-semibold">Boletín</th>
                                    <th className="p-4 font-semibold">Título</th>
                                    <th className="p-4 font-semibold">Estado</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                {result.data.map((p, i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition">
                                        <td className="p-4 font-medium text-slate-600">{p.año}</td>
                                        <td className="p-4 text-blue-600 font-mono">{p.boletin}</td>
                                        <td className="p-4 text-slate-800 max-w-md">{p.titulo}</td>
                                        <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${p.estado.includes('Publicado') ? 'bg-green-100 text-green-800' :
                            p.estado.includes('Archivado') ? 'bg-gray-100 text-gray-800' :
                                p.estado.includes('tramitación') ? 'bg-blue-100 text-blue-800' :
                                    'bg-yellow-100 text-yellow-800'}`}>
                          {p.estado}
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;