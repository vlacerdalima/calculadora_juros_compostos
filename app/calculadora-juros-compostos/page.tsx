import type { Metadata } from 'next'
import CalculatorApp from '@/components/CalculatorApp'

export const metadata: Metadata = {
  title: 'Calculadora de Juros Compostos',
  description:
    'Calcule juros compostos com aportes mensais, simule investimentos e visualize ' +
    'o crescimento do seu patrimônio. Ferramenta gratuita e fácil de usar.',
  openGraph: {
    title: 'Calculadora de Juros Compostos — Gratuita',
    description:
      'Simule investimentos com juros compostos, defina aportes mensais e veja ' +
      'seu patrimônio crescer ao longo do tempo.',
    type: 'website',
  },
}

export default function CalculadoraPage() {
  return (
    <>
      <CalculatorApp />
      <SeoSection />
    </>
  )
}

function SeoSection() {
  return (
    <article className="bg-zinc-950 border-t border-zinc-800/60">
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12 text-zinc-400">

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">
            O que é a Calculadora de Juros Compostos?
          </h2>
          <p className="leading-relaxed text-sm">
            Nossa calculadora de juros compostos é uma ferramenta gratuita que permite simular
            o crescimento de um investimento ao longo do tempo, levando em conta um valor inicial,
            aportes mensais e uma taxa de juros fixa. Os resultados são atualizados em tempo real
            conforme você ajusta os parâmetros, tornando fácil explorar diferentes cenários de
            investimento sem precisar de planilhas ou fórmulas complexas.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">
            A Fórmula dos Juros Compostos
          </h2>
          <p className="leading-relaxed text-sm mb-5">
            Os juros compostos funcionam aplicando a taxa sobre o saldo total acumulado a cada
            período — não apenas sobre o capital inicial. Isso gera o efeito de{' '}
            <strong className="text-zinc-200">"juros sobre juros"</strong>, que acelera
            exponencialmente o crescimento do patrimônio quanto maior for o prazo.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm text-zinc-300 flex flex-col gap-4">
            <div>
              <p className="text-zinc-500 text-xs mb-2">Saldo mensal com aporte M, taxa mensal i e n meses:</p>
              <p className="text-emerald-400 font-semibold">Saldo(n) = (Saldo(n−1) + M) × (1 + i)</p>
            </div>
            <div className="border-t border-zinc-800 pt-4">
              <p className="text-zinc-500 text-xs mb-2">Conversão de taxa anual (a) para mensal:</p>
              <p className="text-indigo-400 font-semibold">i_mensal = (1 + a)^(1/12) − 1</p>
            </div>
          </div>
          <p className="leading-relaxed text-sm mt-4">
            A calculadora realiza essa conversão automaticamente quando você seleciona a opção
            de taxa anual, garantindo que os cálculos sejam sempre precisos independente do
            período informado.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">
            Como usar a calculadora
          </h2>
          <ol className="flex flex-col gap-4 text-sm">
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-xs font-bold">1</span>
              <div>
                <strong className="text-zinc-200">Valor inicial:</strong>{' '}
                informe o capital que você já possui ou pretende investir de uma vez. Pode ser zero
                caso queira simular apenas aportes mensais.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-xs font-bold">2</span>
              <div>
                <strong className="text-zinc-200">Aporte mensal:</strong>{' '}
                defina quanto você adicionará ao investimento todo mês. Aportes regulares
                potencializam o efeito dos juros compostos ao longo do tempo.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
              <div>
                <strong className="text-zinc-200">Período:</strong>{' '}
                escolha a duração do investimento em meses ou anos. O prazo é um dos fatores
                mais importantes nos juros compostos — quanto maior, maior o impacto exponencial.
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-xs font-bold">4</span>
              <div>
                <strong className="text-zinc-200">Taxa de juros:</strong>{' '}
                informe a taxa mensal ou anual. A taxa anual é convertida automaticamente para
                mensal usando a fórmula de equivalência de taxas, então você pode usar a taxa
                que o seu investimento informa diretamente.
              </div>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">
            Funcionalidades da calculadora
          </h2>
          <ul className="flex flex-col gap-3 text-sm">
            {[
              { titulo: 'Gráfico interativo', desc: 'Área empilhada mostrando a evolução do patrimônio mês a mês, com a separação visual entre o total investido e os juros gerados.' },
              { titulo: 'Cards de resumo animados', desc: 'Exibe patrimônio final, total investido, juros gerados e rentabilidade percentual com transições suaves ao atualizar os valores.' },
              { titulo: 'Tabela de detalhamento', desc: 'Alterne entre visualização anual e mensal para ver o saldo, total investido e juros acumulados em cada período.' },
              { titulo: 'Sliders interativos', desc: 'Ajuste os valores rapidamente com sliders ou digitando diretamente no campo. Os resultados atualizam em tempo real.' },
              { titulo: 'Modo claro e escuro', desc: 'Alterne entre os temas claro e escuro conforme sua preferência, com transições suaves de cores.' },
              { titulo: 'Conversão automática de taxa', desc: 'Informe a taxa anual e a calculadora converte para mensal automaticamente usando a fórmula matemática correta.' },
            ].map((item) => (
              <li key={item.titulo} className="flex gap-3 leading-relaxed">
                <span className="shrink-0 mt-0.5 w-4 h-4 rounded bg-emerald-500/15 flex items-center justify-center">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1 4l2 2 4-4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span><strong className="text-zinc-200">{item.titulo}:</strong> {item.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">
            Por que os juros compostos são tão poderosos?
          </h2>
          <p className="leading-relaxed text-sm mb-4">
            Albert Einstein teria chamado os juros compostos de{' '}
            <em className="text-zinc-300">"a oitava maravilha do mundo"</em>. A razão é simples:
            a cada período, os juros incidem não apenas sobre o capital inicial, mas também sobre
            os juros já acumulados. Isso cria um crescimento exponencial que acelera com o tempo.
          </p>
          <p className="leading-relaxed text-sm mb-4">
            Quanto mais cedo você começa a investir, maior é o tempo que o capital tem para crescer.
            Mesmo aportes mensais modestos, mantidos de forma disciplinada por décadas, podem
            resultar em um patrimônio muito superior ao total que você efetivamente investiu —
            graças ao efeito dos juros sobre juros.
          </p>
          <p className="leading-relaxed text-sm">
            Use esta calculadora para comparar diferentes cenários: veja o impacto de aumentar
            o aporte mensal, de começar mais cedo, ou de buscar investimentos com taxas um pouco
            maiores. Pequenas diferenças nos parâmetros geram grandes diferenças no longo prazo.
          </p>
        </section>

      </div>
    </article>
  )
}
