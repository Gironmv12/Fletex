import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

const ReportInventario = () => {
  const [inventario, setInventario] = useState([]);
  const [totalWarehouses, setTotalWarehouses] = useState(0);
  const [uniqueWarehouses, setUniqueWarehouses] = useState(new Set());
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const respuesta = await axios.get('http://localhost:5000/api/reporte/reporteInventarioAlmacenes');
        const datos = respuesta.data;

        // Calcular el total de almacenes, productos y artículos
        const uniqueWarehouses = new Set(datos.map(item => item.id_almacen));
        const totalWarehouses = uniqueWarehouses.size;
        const totalProducts = datos.length;
        const totalItems = datos.reduce((acc, item) => acc + item.cantidad, 0);

        setInventario(datos);
        setTotalWarehouses(totalWarehouses);
        setTotalProducts(totalProducts);
        setTotalItems(totalItems);
        setUniqueWarehouses(uniqueWarehouses);

      } catch (error) {
        console.error('Error al obtener datos de la API', error);
      }
    };

    obtenerDatos();
  }, []);

  // Datos para el gráfico
  const labels = Array.from(uniqueWarehouses).map((id) => {
    const warehouseItems = inventario.filter(item => item.id_almacen === id);
    return warehouseItems[0].nombre_almacen;
  });

  const cantidades = Array.from(uniqueWarehouses).map((id) => {
    const warehouseItems = inventario.filter(item => item.id_almacen === id);
    return warehouseItems.reduce((acc, item) => acc + item.cantidad, 0);
  });

  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Artículos por Almacén',
        data: cantidades,
        backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 mt-4 rounded-lg">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Sistema de Inventario</h1>
          <p className="text-gray-600">Gestión y monitoreo de almacenes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xs font-medium text-gray-500">Total de Almacenes</h3>
            <p className="text-3xl font-bold text-gray-900">{totalWarehouses}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xs font-medium text-gray-500">Total de Productos</h3>
            <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-xs font-medium text-gray-500">Total de Artículos</h3>
            <p className="text-3xl font-bold text-gray-900">{totalItems}</p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from(uniqueWarehouses).map((id_almacen) => {
            const warehouseItems = inventario.filter(item => item.id_almacen === id_almacen);
            const warehouseName = warehouseItems[0].nombre_almacen;
            const totalItemsInWarehouse = warehouseItems.reduce((acc, item) => acc + item.cantidad, 0);

            return (
              <div key={id_almacen} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900">{warehouseName}</h3>
                <p className="text-sm text-gray-600">Total de Artículos: {totalItemsInWarehouse}</p>
                <p className="text-sm text-gray-600">Total de Productos: {warehouseItems.length}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-sm">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Inventario Detallado</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {inventario.map((item) => (
              <div
                key={`${item.id_almacen}-${item.descripcion}`}
                className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-gray-100">
                    <Package className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="font-medium text-gray-900">{item.descripcion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium">
                    {item.cantidad} unidades
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Grafico</h1>
          <p className="text-gray-600">Cantidad de almacenes</p>
        </div>

        <div className='flex justify-center'>
        <div className="w-full max-w-md ">
          <Pie data={dataChart} options={{ responsive: true }} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default ReportInventario;