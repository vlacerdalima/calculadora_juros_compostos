import type { Metadata } from 'next'
import SalarioApp from '@/components/SalarioApp'

export const metadata: Metadata = {
  title: 'Calculadora de Salário Líquido — INSS e IRRF 2024',
  description:
    'Calcule seu salário líquido considerando as tabelas de INSS e IRRF 2024, ' +
    'deduções por dependentes e outros descontos. Resultado detalhado e gratuito.',
}

export default function SalarioPage() {
  return (
    <>
      <SalarioApp />
      <SeoSection />
    </>
  )
}

function SeoSection() {
  return (
    <article className="bg-zinc-950 border-t border-zinc-800/60">
      <div className="max-w-3xl mx-auto px-6 py-16 flex flex-col gap-12 text-zinc-400">

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Como funciona o cálculo do salário líquido?</h2>
          <p className="leading-relaxed text-sm">
            O salário líquido é o valor que o trabalhador recebe após os descontos obrigatórios:
            INSS (previdência social) e IRRF (imposto de renda retido na fonte). A ordem do cálculo
            é importante: primeiro desconta-se o INSS do bruto; o resultado serve de base para o IRRF.
          </p>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 font-mono text-sm mt-4 flex flex-col gap-2">
            <p className="text-zinc-500 text-xs">Sequência do cálculo:</p>
            <p className="text-amber-400">1. INSS = f(Salário Bruto)</p>
            <p className="text-amber-400">2. Base IRRF = Bruto − INSS − Deduções</p>
            <p className="text-amber-400">3. IRRF = f(Base IRRF)</p>
            <p className="text-amber-400">4. Líquido = Bruto − INSS − IRRF − Outros</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Tabela INSS 2024 — Contribuição Progressiva</h2>
          <p className="leading-relaxed text-sm mb-4">
            Desde 2023, o INSS do trabalhador celetista (empregado) é calculado de forma progressiva,
            assim como o imposto de renda. Cada faixa de salário é tributada separadamente.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Faixa salarial</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Alíquota</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { faixa: 'Até R$ 1.412,00', aliq: '7,5%' },
                  { faixa: 'R$ 1.412,01 a R$ 2.666,68', aliq: '9,0%' },
                  { faixa: 'R$ 2.666,69 a R$ 4.000,03', aliq: '12,0%' },
                  { faixa: 'R$ 4.000,04 a R$ 7.786,02', aliq: '14,0%' },
                ].map(row => (
                  <tr key={row.faixa} className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 text-zinc-300">{row.faixa}</td>
                    <td className="py-3 px-4 text-right tabular-nums text-amber-400 font-semibold">{row.aliq}</td>
                  </tr>
                ))}
                <tr>
                  <td className="py-3 px-4 text-zinc-400 text-xs italic" colSpan={2}>
                    Acima de R$ 7.786,02 → contribuição máxima (teto) de R$ 908,86
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">Tabela IRRF 2024 — Imposto de Renda</h2>
          <p className="leading-relaxed text-sm mb-4">
            O IRRF é calculado sobre a base de cálculo (salário bruto − INSS − deduções por
            dependentes). Utiliza-se o método da dedução: aplica-se a alíquota da faixa e subtrai-se
            o valor de dedução correspondente.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Base de cálculo</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Alíquota</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">Dedução</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { faixa: 'Até R$ 2.259,20', aliq: 'Isento', ded: '—' },
                  { faixa: 'R$ 2.259,21 a R$ 2.826,65', aliq: '7,5%', ded: 'R$ 169,44' },
                  { faixa: 'R$ 2.826,66 a R$ 3.751,05', aliq: '15,0%', ded: 'R$ 381,44' },
                  { faixa: 'R$ 3.751,06 a R$ 4.664,68', aliq: '22,5%', ded: 'R$ 662,77' },
                  { faixa: 'Acima de R$ 4.664,68', aliq: '27,5%', ded: 'R$ 896,00' },
                ].map(row => (
                  <tr key={row.faixa} className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 text-zinc-300">{row.faixa}</td>
                    <td className="py-3 px-4 text-right tabular-nums text-amber-400 font-semibold">{row.aliq}</td>
                    <td className="py-3 px-4 text-right tabular-nums text-zinc-400">{row.ded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500 mt-3">
            Fórmula: IRRF = Base × Alíquota − Dedução. Dedução por dependente: R$ 189,59/mês.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">O que são "outros descontos"?</h2>
          <p className="leading-relaxed text-sm">
            Além do INSS e IRRF, o holerite pode conter outros descontos acordados com o empregador
            ou por benefícios recebidos: Vale-Transporte (VT), Vale-Refeição (VR), convênio médico,
            previdência complementar, consignado, sindicato, entre outros. A calculadora permite
            informar este valor para obter o salário líquido real.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-zinc-100 mb-4">O que não está incluído neste cálculo</h2>
          <ul className="flex flex-col gap-2 text-sm list-disc list-inside leading-relaxed">
            <li>FGTS (pago pelo empregador, 8% do bruto — não é desconto do salário)</li>
            <li>13º salário, férias e adicionais noturnos (têm regras de cálculo próprias)</li>
            <li>Contribuição sindical (atualmente optativa)</li>
            <li>Autônomos e MEIs (que têm regime tributário diferente)</li>
          </ul>
          <p className="leading-relaxed text-sm mt-4">
            Para situações complexas, consulte um contador ou o departamento pessoal da sua empresa.
            As tabelas são atualizadas periodicamente — esta calculadora usa os valores vigentes em 2024.
          </p>
        </section>

      </div>
    </article>
  )
}
