// Paquetes.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Truck, Clock, Check } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Paquetes = () => {
  const [stats, setStats] = useState([]);
  const [totalEnvios, setTotalEnvios] = useState(0);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await axios.get('http://localhost:5000/api/reporte/reportePaquetesPorEstado');
        const datos = respuesta.data;

        // Calcular el total de envíos
        const total = datos.reduce((acc, item) => acc + item.cantidad, 0);
        setTotalEnvios(total);

        // Agregar colores e íconos según el estado
        const datosConEstilos = datos.map((item) => {
          let color = '';
          let bgColor = '';
          let icon = null;

          switch (item.estado) {
            case 'en tránsito':
              color = 'text-blue-500';
              bgColor = 'bg-blue-100';
              icon = Truck;
              break;
            case 'preparado':
              color = 'text-amber-500';
              bgColor = 'bg-amber-100';
              icon = Clock;
              break;
            case 'entregado':
              color = 'text-green-500';
              bgColor = 'bg-green-100';
              icon = Check;
              break;
            default:
              color = 'text-gray-500';
              bgColor = 'bg-gray-100';
              icon = Clock;
          }

          return { ...item, color, bgColor, icon };
        });

        setStats(datosConEstilos);

      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    obtenerDatos();
  }, []);

  const labels = stats.map((item) => item.estado);
  const cantidades = stats.map((item) => item.cantidad);

  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Paquetes por Estado',
        data: cantidades,
        backgroundColor: stats.map((item) => item.color),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mt-4">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Panel de Entregas</h1>
          <p className="text-gray-600">Monitoreo en tiempo real del estado de envíos</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.estado}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${item.bgColor}`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <span className="text-4xl font-bold text-gray-900">{item.cantidad}</span>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">
                    {item.estado}
                  </h3>
                  <div className="mt-2 flex items-center">
                    <div className="flex-grow bg-gray-200 h-1 rounded-full">
                      <div
                        className={`h-1 rounded-full ${item.color.replace('text', 'bg')}`}
                        style={{
                          width: `${(item.cantidad / totalEnvios) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-500">
                      {Math.round((item.cantidad / totalEnvios) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Resumen Total</h2>
            <span className="text-gray-500">Total: {totalEnvios} envíos</span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full flex">
              {stats.map((item) => (
                <div
                  key={item.estado}
                  className={`${item.color.replace('text', 'bg')} h-full`}
                  style={{ width: `${(item.cantidad / totalEnvios) * 100}%` }}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-4 justify-center">
            {stats.map((item) => (
              <div key={item.estado} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${item.color.replace('text', 'bg')}`} />
                <span className="ml-2 text-sm text-gray-600 capitalize">{item.estado}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <div className='w-full max-w-lg'>
          <Bar data={dataChart} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default Paquetes;