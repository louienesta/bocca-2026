import { useCallback } from 'react';
import { set, unset, type StringInputProps } from 'sanity';

const legacyColors: Record<string, string> = {
  beige: '#faf4f0',
  white: '#ffffff',
  bordeaux: '#4d1030',
  petroleum: '#2e4a50',
  blue: '#badbff',
};

type Props = StringInputProps & { defaultColor: string };

function CaseBackgroundColorInput({
  defaultColor,
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
        aria-label="Vælg baggrundsfarve"
        style={{ width: '3rem', height: '2.75rem', cursor: 'pointer' }}
      />
      <input
        {...elementProps}
        type="text"
        value={displayValue}
        onChange={handleHexChange}
        readOnly={readOnly}
        placeholder={defaultColor}
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
    </div>
  );
}

export function BeigeCaseBackgroundInput(props: StringInputProps) {
  return <CaseBackgroundColorInput {...props} defaultColor="#faf4f0" />;
}

export function BordeauxCaseBackgroundInput(props: StringInputProps) {
  return <CaseBackgroundColorInput {...props} defaultColor="#4d1030" />;
}
