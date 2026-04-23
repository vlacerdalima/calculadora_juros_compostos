import { useState } from 'react'

interface Props {
  value: string
  onChange: (value: string) => void
  className?: string
  required?: boolean
}

// Aplica a máscara "X.XXX,XX" a cada keystroke
function applyMask(input: string): string {
  // Remove separadores de milhar existentes para trabalhar só com dígitos e vírgula
  const withoutDots = input.replace(/\./g, '')
  const commaIdx = withoutDots.indexOf(',')

  let intStr: string
  let decStr: string | null = null

  if (commaIdx === -1) {
    intStr = withoutDots.replace(/\D/g, '')
  } else {
    intStr = withoutDots.slice(0, commaIdx).replace(/\D/g, '')
    decStr = withoutDots.slice(commaIdx + 1).replace(/\D/g, '').slice(0, 2)
  }

  if (!intStr && decStr === null) return ''

  const intFormatted = intStr ? Number(intStr).toLocaleString('pt-BR') : '0'
  return decStr === null ? intFormatted : `${intFormatted},${decStr}`
}

function toNumericString(masked: string): string {
  if (!masked) return '0'
  const num = parseFloat(masked.replace(/\./g, '').replace(',', '.'))
  return isNaN(num) ? '0' : String(num)
}

function initDisplay(value: string): string {
  const num = parseFloat(value)
  if (!num) return ''
  return num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function MoneyInput({ value, onChange, className, required }: Props) {
  const [display, setDisplay] = useState(() => initDisplay(value))

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.select()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = applyMask(e.target.value)
    setDisplay(masked)
    onChange(toNumericString(masked))
  }

  function handleBlur() {
    // Garante 2 casas decimais ao sair do campo
    const num = parseFloat(toNumericString(display))
    if (num > 0) {
      setDisplay(num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
    }
  }

  return (
    <input
      type="text"
      inputMode="decimal"
      autoComplete="off"
      value={display}
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="0,00"
      className={className}
      required={required}
    />
  )
}
