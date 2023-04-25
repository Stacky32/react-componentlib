import { useMemo, useState } from "react";
import Select from "./Select";
import type { SelectItem } from "./Select";

type SelectGroup = SelectItem & {
    relations: SelectItem[]
}

interface Props {
    options: SelectGroup[];
}

export default function LinkedDropdown({ options }: Props) {
    const [firstValue, setFirstValue] = useState<string | undefined>();
    const [secondValue, setSecondValue] = useState<string | undefined>();

    const firstOptions = useMemo<SelectItem[]>(
        () => options.map(o => ({ value: o.value, text: o.text })),
        [options]
    );

    const secondOptions = useMemo(
        () => options.length === 1
            ? options[0].relations
            : options.find(o => o.value === firstValue)?.relations ?? [],
        [firstValue, options]
    );

    const firstSelection = options.length === 1
        ? options[0].value
        : firstValue;

    const secondSelection = secondOptions.length === 1
        ? secondOptions[0].value
        : secondValue;

    const isFirstDisabled = firstOptions.length <= 1;
    const isSecondDisabled = secondOptions.length <= 1;

    function handleFirstDDChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        setFirstValue(e.target.value);
    }

    function handleSecondDDChange(e: React.ChangeEvent<HTMLSelectElement>): void {
        setSecondValue(e.target.value);
    }

    return (
        <div>
            <div>
                <Select
                    value={firstSelection}
                    options={firstOptions}
                    onChange={handleFirstDDChange}
                    disabled={isFirstDisabled}
                />
            </div>
            <div>
                <Select
                    value={secondSelection}
                    options={secondOptions}
                    onChange={handleSecondDDChange}
                    disabled={isSecondDisabled}
                />
            </div>
        </div>
    );
}