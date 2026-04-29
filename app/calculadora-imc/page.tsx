import type { Metadata } from 'next'
import ImcApp from '@/components/ImcApp'

export const metadata: Metadata = {
  title: 'Calculadora de IMC — Índice de Massa Corporal',
  description:
    'Calcule seu IMC (Índice de Massa Corporal) de forma rápida e gratuita. ' +
    'Descubra sua classificação — abaixo do peso, peso ideal, sobrepeso ou obesidade.',
}

export default function ImcPage() {
  return (
    <>
      <ImcApp />
      <SeoSection />
    </>
  )
}

function SeoSection() {
  return (
    <article className="bg-zinc-950 border-t border-zinc-800/60">
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12 text-zinc-400">

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">O que é o IMC?</h2>
          <p className="leading-relaxed text-sm">
            O Índice de Massa Corporal (IMC) é uma medida internacional adotada pela Organização
            Mundial da Saúde (OMS) para avaliar se uma pessoa está dentro do peso considerado
            saudável em relação à sua altura. Ele é amplamente utilizado em triagens clínicas,
            pesquisas epidemiológicas e acompanhamento nutricional.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">A fórmula do IMC</h2>
          <p className="leading-relaxed text-sm mb-4">
            O cálculo é simples: divide-se o peso em quilogramas pelo quadrado da altura em metros.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm flex flex-col gap-3">
            <div>
              <p className="text-zinc-500 text-xs mb-1">Fórmula do IMC:</p>
              <p className="text-sky-400 font-semibold">IMC = Peso (kg) / Altura² (m)</p>
            </div>
            <div className="border-t border-zinc-800 pt-3 text-xs text-zinc-500">
              <p>Exemplo: 75 kg / (1,75 m)² = 75 / 3,0625 = <span className="text-zinc-300">24,5 kg/m²</span></p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Tabela de classificação do IMC (adultos)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Classificação</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">IMC (kg/m²)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'Abaixo do peso', range: '< 18,5', color: 'text-sky-400' },
                  { label: 'Peso ideal', range: '18,5 – 24,9', color: 'text-emerald-400' },
                  { label: 'Sobrepeso', range: '25,0 – 29,9', color: 'text-yellow-400' },
                  { label: 'Obesidade grau I', range: '30,0 – 34,9', color: 'text-orange-400' },
                  { label: 'Obesidade grau II', range: '35,0 – 39,9', color: 'text-red-400' },
                  { label: 'Obesidade grau III', range: '≥ 40,0', color: 'text-red-500' },
                ].map(row => (
                  <tr key={row.label} className="border-b border-zinc-800/50">
                    <td className={`py-3 px-4 font-medium ${row.color}`}>{row.label}</td>
                    <td className={`py-3 px-4 text-right tabular-nums ${row.color}`}>{row.range}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Limitações do IMC</h2>
          <p className="leading-relaxed text-sm mb-4">
            O IMC é uma ferramenta de triagem, não de diagnóstico. Ele não diferencia massa muscular
            de gordura, nem considera a distribuição de gordura pelo corpo. Por isso, um atleta com
            muita massa muscular pode ter IMC elevado sem estar com excesso de gordura.
          </p>
          <p className="leading-relaxed text-sm">
            Para crianças, adolescentes e idosos, existem tabelas específicas que consideram a idade
            e o sexo. O IMC padrão é recomendado apenas para adultos entre 18 e 65 anos. Sempre
            consulte um profissional de saúde para uma avaliação completa.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Como manter um IMC saudável</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {[
              { t: 'Alimentação equilibrada', d: 'Priorize alimentos naturais, reduza ultraprocessados e mantenha uma ingestão calórica adequada ao seu nível de atividade.' },
              { t: 'Atividade física regular', d: 'A OMS recomenda pelo menos 150 minutos de atividade moderada por semana para adultos.' },
              { t: 'Hidratação adequada', d: 'Beber água suficiente auxilia no metabolismo e pode reduzir a ingestão calórica total.' },
              { t: 'Acompanhamento profissional', d: 'Nutricionistas, médicos e educadores físicos fornecem orientação personalizada, que vai além de uma calculadora.' },
            ].map(item => (
              <li key={item.t} className="flex gap-3 leading-relaxed">
                <span className="shrink-0 mt-0.5 w-4 h-4 rounded bg-sky-500/15 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span><strong className="text-zinc-200">{item.t}:</strong> {item.d}</span>
              </li>
            ))}
          </ul>
        </section>

      </div>
    </article>
  )
}
