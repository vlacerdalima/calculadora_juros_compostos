import { useState, useEffect, useRef } from 'react'

interface Props {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  className?: string
  required?: boolean
}

function formatBRL(value: number): string {
  if (!value) return ''
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function applyMask(input: string): string {
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

function parseDisplay(masked: string): number {
  if (!masked) return 0
  const num = parseFloat(masked.replace(/\./g, '').replace(',', '.'))
  return isNaN(num) ? 0 : num
}

export default function MoneyInput({ value, onChange, placeholder = '0,00', className, required }: Props) {
  const [display, setDisplay] = useState(() => formatBRL(value))
  const isFocusedRef = useRef(false)

  // Sync display when parent changes the value (e.g. slider)
  useEffect(() => {
    if (!isFocusedRef.current) {
      setDisplay(formatBRL(value))
    }
  }, [value])

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    isFocusedRef.current = true
    e.target.select()
  }

  function handleBlur() {
    isFocusedRef.current = false
    const num = parseDisplay(display)
    onChange(num)
    setDisplay(formatBRL(num))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = applyMask(e.target.value)
    setDisplay(masked)
    onChange(parseDisplay(masked))
  }

  return (
    <input
      type="text"
      inputMode="decimal"
      autoComplete="off"
      value={display}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      required={required}
    />
  )
}
