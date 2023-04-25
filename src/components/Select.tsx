export type SelectItem = {
    value: string;
    text: string;
}

interface Props {
    value: string | undefined;
    onChange: React.ChangeEventHandler<HTMLSelectElement>;
    options: SelectItem[];
    disabled?: boolean;
}

export default function Select({ value, onChange, options, disabled }: Props) {
    return (
        <select
            value={value}
            onChange={onChange}
            disabled={disabled}
        >
            {options.length !== 1 ? (
                <option key='default' style={{ display: 'none' }} value={undefined}>Select</option>
            ) : null}

            {options.map(o => (
                <option key={o.value} value={o.value}>{o.text}</option>
            ))}
        </select>
    )
}