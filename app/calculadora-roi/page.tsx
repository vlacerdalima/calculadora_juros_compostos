import type { Metadata } from 'next'
import RoiApp from '@/components/RoiApp'

export const metadata: Metadata = {
  title: 'Calculadora de ROI — Retorno sobre Investimento',
  description:
    'Calcule o ROI (Return on Investment) de forma rápida: informe o valor investido ' +
    'e a receita total e veja o percentual de retorno e o lucro líquido.',
}

export default function RoiPage() {
  return (
    <>
      <RoiApp />
      <SeoSection />
    </>
  )
}

function SeoSection() {
  return (
    <article className="bg-zinc-950 border-t border-zinc-800/60">
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12 text-zinc-400">

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">O que é ROI?</h2>
          <p className="leading-relaxed text-sm">
            ROI (Return on Investment, ou Retorno sobre Investimento) é uma das métricas mais
            usadas no mundo dos negócios e das finanças. Ela mede a eficiência de um investimento
            ao comparar o lucro gerado com o capital empregado. Um ROI positivo indica que a
            iniciativa gerou mais do que custou; um ROI negativo indica prejuízo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">A fórmula do ROI</h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm flex flex-col gap-3">
            <div>
              <p className="text-zinc-500 text-xs mb-1">Lucro líquido:</p>
              <p className="text-indigo-400 font-semibold">Lucro = Receita Total − Valor Investido</p>
            </div>
            <div className="border-t border-zinc-800 pt-3">
              <p className="text-zinc-500 text-xs mb-1">ROI percentual:</p>
              <p className="text-indigo-400 font-semibold">ROI (%) = (Lucro / Investimento) × 100</p>
            </div>
            <div className="border-t border-zinc-800 pt-3 text-xs text-zinc-500">
              <p>Exemplo: Investiu R$ 10.000, recebeu R$ 15.000</p>
              <p className="mt-1">Lucro = R$ 5.000 | ROI = (5.000 / 10.000) × 100 = <span className="text-emerald-400">+50%</span></p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Onde o ROI é aplicado?</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {[
              { t: 'Marketing digital', d: 'Medir o retorno de campanhas de anúncios, e-mail marketing ou redes sociais.' },
              { t: 'Investimentos financeiros', d: 'Comparar o desempenho de ações, fundos, CDBs ou outros ativos.' },
              { t: 'Projetos e startups', d: 'Avaliar se um projeto ou novo produto gerou retorno sobre o capital inicial.' },
              { t: 'Imóveis', d: 'Calcular o retorno de uma reforma ou de uma propriedade adquirida para locação.' },
              { t: 'Treinamento corporativo', d: 'Medir se o investimento em capacitação gerou ganhos de produtividade.' },
            ].map(item => (
              <li key={item.t} className="flex gap-3 leading-relaxed">
                <span className="shrink-0 mt-0.5 w-4 h-4 rounded bg-indigo-500/15 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span><strong className="text-zinc-200">{item.t}:</strong> {item.d}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Limitações do ROI</h2>
          <p className="leading-relaxed text-sm mb-4">
            O ROI é uma métrica poderosa, mas tem limitações importantes que devem ser consideradas:
          </p>
          <ul className="flex flex-col gap-3 text-sm list-disc list-inside leading-relaxed">
            <li>Não considera o tempo: um ROI de 50% em 10 anos é muito diferente de 50% em 1 ano.</li>
            <li>Ignora o custo de oportunidade — comparar com alternativas de investimento é essencial.</li>
            <li>Pode ser manipulado pela definição de o que entra como "receita" ou "custo".</li>
            <li>Não captura riscos envolvidos ou a volatilidade do retorno.</li>
          </ul>
          <p className="leading-relaxed text-sm mt-4">
            Para análises mais completas, combine o ROI com outras métricas como TIR (Taxa Interna
            de Retorno), VPL (Valor Presente Líquido) e payback period.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">O que é um bom ROI?</h2>
          <p className="leading-relaxed text-sm">
            Não existe um número universal. Um ROI "bom" depende do setor, do risco, do prazo
            e do custo de oportunidade. Em investimentos financeiros, superar a Selic (taxa básica
            de juros do Brasil) ou o CDI é um referencial comum. Em marketing, ROI acima de 400%
            (ou 5× o valor investido) é frequentemente citado como saudável. Em projetos corporativos,
            qualquer ROI positivo já pode justificar a iniciativa, dependendo dos objetivos estratégicos.
          </p>
        </section>

      </div>
    </article>
  )
}
