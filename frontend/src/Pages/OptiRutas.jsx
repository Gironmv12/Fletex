import ComingSoon from '../../public/Svg/undraw_under_construction_-46-pa.svg'
const OptiRutas = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Coming Soon</h1>
        <p className="text-lg text-gray-600 mb-8">Muy pronto estaremos de vuelta con esta pagina!</p>
        <div className="flex justify-center">
          <img src={ComingSoon} alt="Coming Soon" className="w-80" />
        </div>
      </div>
    </div>
  );
};

export default OptiRutas;