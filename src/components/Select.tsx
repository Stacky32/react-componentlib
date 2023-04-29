export type SelectItem = {
    value: string;
    text: string;
}

interface Props {
    value: string | undefined;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    options: SelectItem[];
    label?: string | undefined;
    placeholderText?: string | undefined;
    disabled?: boolean;
}

export default function Select({
    value,
    onChange,
    options,
    label,
    placeholderText,
    disabled
}: Props) {
    return (
        <label>{label || null}
            <select
                value={value}
                onChange={onChange}
                aria-label={label}
                disabled={disabled || options.length <= 1}
            >
                {options.length > 1 ? (
                    <option key='default' style={{ display: 'none' }} value={undefined}>{placeholderText || 'Select'}</option>
                ) : null}

                {options.map(o => (
                    <option key={o.value} value={o.value}>{o.text}</option>
                ))}
            </select>
        </label>
    )
}