import { render, screen, within } from "@testing-library/react"
import Select, { SelectItem } from "../Select"

const labelText = 'Choose something';
const placeholderText = 'Select';

describe('Select', () => {
    it('The dropdown is disabled and no options are visible if options is an empty array', () => {
        render(
            <Select
                value={undefined}
                options={[]}
                placeholderText={placeholderText}
                onChange={_ => undefined}
            />
        );

        expect(screen.getByRole('combobox')).toHaveAttribute('disabled');
        expect(screen.queryByText(placeholderText)).toBeNull();
        expect(screen.queryByRole('option')).toBeNull();
    });

    it('Option is select if there is only one option', () => {
        const options: SelectItem[] = [
            { value: 'y', text: 'Yes' }
        ];

        render(
            <Select
                value={options[0].value}
                options={options}
                placeholderText={placeholderText}
                onChange={_ => undefined}
            />
        );

        expect(screen.getByRole('combobox')).toHaveAttribute('disabled');
        expect(screen.getByRole<HTMLOptionElement>('option').selected).toBe(true);
    })

    it('Default option is not present when there is only one option', () => {
        const options: SelectItem[] = [
            { value: 'y', text: 'Yes' }
        ];

        render(
            <Select
                value={options[0].value}
                options={options}
                placeholderText={placeholderText}
                onChange={_ => undefined}
            />
        );

        expect(screen.queryByText(placeholderText)).toBeNull();
        expect(screen.queryAllByRole('option').length).toBe(1);
        expect(screen.getByRole('option', { name: 'Yes' })).toBeVisible();
    });

    it('Correct options are visible when there are mutiple options', () => {
        const options: SelectItem[] = [
            { value: '123', text: 'oneTwoThree' },
            { value: '456', text: 'fourFiveSix' },
            { value: '789', text: 'sevenEightNine' }
        ];

        render(
            <Select
                value={undefined}
                options={options}
                onChange={_ => undefined}
            />
        );

        expect(screen.queryAllByRole('option').length).toBe(options.length);

        for (const a of options) {
            expect(screen.getByRole('option', { name: a.text })).toBeVisible();
        }
    });

    it('Default option is present and hidden when there are multiple options', () => {
        const options: SelectItem[] = [
            { value: '123', text: 'oneTwoThree' },
            { value: '456', text: 'fourFiveSix' }
        ];

        render(
            <Select
                value={undefined}
                options={options}
                placeholderText={placeholderText}
                onChange={_ => undefined}
            />
        );

        expect(
            within(screen.getByRole('combobox')).getByText(placeholderText)
        ).not.toBeVisible();
    });
})