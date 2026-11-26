import { useCallback } from 'react';
import { set, unset, type StringInputProps } from 'sanity';

const legacyColors: Record<string, string> = {
  beige: '#faf4f0',
  white: '#ffffff',
  bordeaux: '#4d1030',
  petroleum: '#2e4a50',
  blue: '#badbff',
};

type Props = StringInputProps & {
  defaultColor: string;
  label: string;
  allowAutomatic?: boolean;
};

function CaseColorInput({
  defaultColor,
  label,
  allowAutomatic = false,
  elementProps,
  onChange,
  readOnly,
  value,
}: Props) {
  const displayValue = legacyColors[value || ''] || value || '';
  const pickerValue = /^#[0-9a-f]{6}$/i.test(displayValue)
    ? displayValue
    : defaultColor;

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(set(event.currentTarget.value.toLowerCase()));
    },
    [onChange],
  );

  const handleHexChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.currentTarget.value;
      onChange(nextValue ? set(nextValue) : unset());
    },
    [onChange],
  );

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <input
        type="color"
        value={pickerValue}
        onChange={handleColorChange}
        disabled={readOnly}
        aria-label={label}
        style={{ width: '3rem', height: '2.75rem', cursor: 'pointer' }}
      />
      <input
        {...elementProps}
        type="text"
        value={displayValue}
        onChange={handleHexChange}
        readOnly={readOnly}
        placeholder={allowAutomatic ? 'Automatisk' : defaultColor}
        spellCheck={false}
        style={{
          boxSizing: 'border-box',
          flex: 1,
          minWidth: 0,
          height: '2.75rem',
          padding: '0.5rem 0.75rem',
          border: '1px solid #aaa',
          borderRadius: '0.25rem',
          backgroundColor: 'transparent',
          color: 'inherit',
          font: 'inherit',
        }}
      />
      {allowAutomatic && value && (
        <button
          type="button"
          onClick={() => onChange(unset())}
          disabled={readOnly}
        >
          Automatisk
        </button>
      )}
    </div>
  );
}

export function BeigeCaseBackgroundInput(props: StringInputProps) {
  return (
    <CaseColorInput
      {...props}
      defaultColor="#faf4f0"
      label="Vælg baggrundsfarve"
    />
  );
}

export function BordeauxCaseBackgroundInput(props: StringInputProps) {
  return (
    <CaseColorInput
      {...props}
      defaultColor="#4d1030"
      label="Vælg baggrundsfarve"
    />
  );
}

export function CaseTextColorInput(props: StringInputProps) {
  return (
    <CaseColorInput
      {...props}
      defaultColor="#4d1030"
      label="Vælg tekstfarve"
      allowAutomatic
    />
  );
}
