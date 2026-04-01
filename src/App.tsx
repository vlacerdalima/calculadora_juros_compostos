import { useState } from 'react'
import Form from './components/Form'
import Chart from './components/Chart'
import { calcularJurosCompostos } from './utils/calcular'
import type { PontoMensal, Parametros } from './utils/calcular'

export default function App() {
  const [dados, setDados] = useState<PontoMensal[]>([])

  function handleCalcular(params: Parametros) {
    setDados(calcularJurosCompostos(params))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Calculadora de Juros Compostos</h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="w-full lg:w-72 shrink-0">
          <Form onCalcular={handleCalcular} />
        </div>

        <div className="flex-1 min-w-0">
          {dados.length > 0 ? (
            <Chart dados={dados} />
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center gap-3 h-full min-h-[300px]">
              <svg className="w-12 h-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              <p className="text-gray-400 text-sm">Preencha os parâmetros e clique em <strong>Calcular</strong> para ver o gráfico</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
