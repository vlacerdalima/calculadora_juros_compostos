import type { Metadata } from 'next'
import FinanciamentoApp from '@/components/FinanciamentoApp'

export const metadata: Metadata = {
  title: 'Calculadora de Financiamento SAC e PRICE',
  description:
    'Simule financiamentos imobiliários e de veículos nos sistemas SAC e PRICE. ' +
    'Veja parcelas, total de juros e custo total de forma gratuita e instantânea.',
}

export default function FinanciamentoPage() {
  return (
    <>
      <FinanciamentoApp />
      <SeoSection />
    </>
  )
}

function SeoSection() {
  return (
    <article className="bg-zinc-950 border-t border-zinc-800/60">
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12 text-zinc-400">

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">O que é esta calculadora de financiamento?</h2>
          <p className="leading-relaxed text-sm">
            Nossa calculadora permite simular financiamentos nos dois sistemas de amortização mais
            utilizados no Brasil — SAC e PRICE. Com ela você descobre o valor das parcelas, o total
            pago em juros e o custo total do financiamento antes mesmo de assinar qualquer contrato.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Sistema PRICE (Tabela Price)</h2>
          <p className="leading-relaxed text-sm mb-4">
            No sistema PRICE, todas as parcelas têm o mesmo valor do início ao fim. A parcela fixa
            é calculada pela fórmula de anuidade:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm flex flex-col gap-3">
            <div>
              <p className="text-zinc-500 text-xs mb-1">Parcela fixa (PMT) — fórmula da anuidade:</p>
              <p className="text-orange-400 font-semibold">PMT = PV × i / (1 − (1 + i)^−n)</p>
            </div>
            <div className="border-t border-zinc-800 pt-3 text-xs text-zinc-500 flex flex-col gap-1">
              <p><span className="text-zinc-300">PV</span> = valor financiado (total − entrada)</p>
              <p><span className="text-zinc-300">i</span> = taxa de juros mensal</p>
              <p><span className="text-zinc-300">n</span> = prazo em meses</p>
            </div>
          </div>
          <p className="leading-relaxed text-sm mt-4">
            No início, a maior parte da parcela é composta por juros. Com o tempo, a amortização
            (devolução do principal) cresce e os juros diminuem — mas a parcela permanece constante.
            É o sistema mais comum em financiamentos de imóveis (CEF, Banco do Brasil) e veículos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Sistema SAC (Amortização Constante)</h2>
          <p className="leading-relaxed text-sm mb-4">
            No SAC, a amortização (parte do principal) é sempre a mesma em todas as parcelas.
            Como os juros incidem sobre o saldo devedor que diminui a cada mês, as parcelas
            decrescem ao longo do tempo. A fórmula é simples:
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm flex flex-col gap-3">
            <div>
              <p className="text-zinc-500 text-xs mb-1">Amortização fixa:</p>
              <p className="text-orange-400 font-semibold">Amort = PV / n</p>
            </div>
            <div className="border-t border-zinc-800 pt-3">
              <p className="text-zinc-500 text-xs mb-1">Parcela do mês k:</p>
              <p className="text-orange-400 font-semibold">Parcela(k) = Amort + Saldo(k) × i</p>
            </div>
          </div>
          <p className="leading-relaxed text-sm mt-4">
            A primeira parcela do SAC é sempre maior que a do PRICE, mas o custo total do
            financiamento é menor, pois o saldo devedor cai mais rápido e os juros acumulam menos.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">SAC ou PRICE: qual escolher?</h2>
          <ul className="flex flex-col gap-3 text-sm">
            {[
              { titulo: 'Custo total', desc: 'O SAC sempre resulta em menor custo total, pois amortiza o saldo mais rapidamente, reduzindo a base de cálculo dos juros.' },
              { titulo: 'Parcela inicial', desc: 'O PRICE tem parcela inicial menor, o que facilita a aprovação e o orçamento mensal no início do financiamento.' },
              { titulo: 'Parcelas futuras', desc: 'No SAC as parcelas diminuem com o tempo, favorecendo quem espera aumento de renda no futuro.' },
              { titulo: 'Previsibilidade', desc: 'O PRICE oferece parcelas fixas — ideal para quem precisa de previsibilidade no planejamento financeiro.' },
            ].map(item => (
              <li key={item.titulo} className="flex gap-3 leading-relaxed">
                <span className="shrink-0 mt-0.5 w-4 h-4 rounded bg-orange-500/15 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2 4-4" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span><strong className="text-zinc-200">{item.titulo}:</strong> {item.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Como usar a calculadora de financiamento</h2>
          <ol className="flex flex-col gap-3 text-sm">
            {[
              'Selecione o sistema de amortização (PRICE ou SAC).',
              'Informe o valor total do bem e o valor da entrada.',
              'Defina a taxa de juros mensal ou anual do contrato.',
              'Informe o prazo em meses (ex: 360 para 30 anos).',
              'Analise a 1ª parcela, última parcela, total de juros e custo total.',
              'Use a tabela de parcelas para ver a evolução mês a mês.',
            ].map((item, i) => (
              <li key={i} className="flex gap-3 leading-relaxed">
                <span className="shrink-0 w-6 h-6 rounded-full bg-orange-500/15 text-orange-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>

      </div>
    </article>
  )
}
