import { act, render, screen, within } from "@testing-library/react";
import LinkedDropdown, { SelectGroup } from "../LinkedDropdown";
import userEvent from "@testing-library/user-event";

const options: SelectGroup[] = [
    {
        value: 'a',
        text: 'A',
        relations: [
            { value: '1', text: '1' },
            { value: '2', text: '2' },
            { value: '3', text: '3' }
        ]
    },
    {
        value: 'b',
        text: 'B',
        relations: [
            { value: '4', text: '4' },
            { value: '5', text: '5' },
            { value: '6', text: '6' }
        ]
    },
    {
        value: 'c',
        text: 'C',
        relations: [
            { value: '7', text: '7' },
            { value: '8', text: '8' },
            { value: '9', text: '9' }
        ]
    },
    {
        value: 'd',
        text: 'D',
        relations: [
            { value: '10', text: '10' },
        ]
    }
]

describe('LinkedDropdown', () => {
    it('Renders the given labels', () => {
        const opt = [
            {
                value: 'a',
                text: 'A',
                relations: []
            }
        ]

        render(
            <LinkedDropdown
                options={opt}
                labels={['First', 'Second']}
            />
        );

        expect(screen.getByLabelText('First')).toBeVisible();
        expect(screen.getByLabelText('Second')).toBeVisible();
    });

    it('The second dropdown is disabled until first selection is made', () => {
        render(
            <LinkedDropdown
                options={options}
                labels={['First', 'Second']}
            />
        );

        expect(screen.getByLabelText('Second')).toHaveAttribute('disabled');

        act(() => {
            userEvent.selectOptions(screen.getByLabelText('First'), ['A'])
        });

        expect(screen.getByLabelText('Second')).not.toHaveAttribute('disabled');
    });

    it('Second dropdown options depend on the first dropdown selection', async () => {
        const options: SelectGroup[] = [
            {
                value: 'a',
                text: 'A',
                relations: [
                    { value: '1', text: '1' },
                    { value: '2', text: '2' },
                    { value: '3', text: '3' }
                ]
            },
            {
                value: 'b',
                text: 'B',
                relations: [
                    { value: '4', text: '4' },
                ]
            },
        ]

        render(
            <LinkedDropdown
                options={options}
                labels={['First', 'Second']}
            />
        );

        act(() => {
            userEvent.selectOptions(screen.getByLabelText('First'), ['A'])
        })

        expect(within(screen.getByLabelText('Second')).queryAllByRole('option').length).toBe(3);

        expect(
            within(screen.getByLabelText('Second')).getByRole('option', { name: '1' })
        ).toBeVisible();

        expect(
            within(screen.getByLabelText('Second')).getByRole('option', { name: '2' })
        ).toBeVisible();

        expect(
            within(screen.getByLabelText('Second')).getByRole('option', { name: '3' })
        ).toBeVisible();

        act(() => {
            userEvent.selectOptions(screen.getByLabelText('First'), ['B']);
        })

        expect(within(screen.getByLabelText('Second')).queryAllByRole('option').length).toBe(1);
        expect(
            within(screen.getByLabelText('Second')).getByRole('option', { name: '4' })
        ).toBeVisible();
    });

    it('onChange is called with the first and second dropdown selection when either dropdown is changed', () => {
        const onChange = jest.fn();

        render(
            <LinkedDropdown
                options={options}
                labels={['First', 'Second']}
                onChange={onChange}
            />
        );

        act(() => {
            userEvent.selectOptions(screen.getByLabelText('First'), ['A']);
            userEvent.selectOptions(screen.getByLabelText('Second'), ['2']);
        });

        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange).toHaveBeenNthCalledWith(1, 'a', undefined);
        expect(onChange).toHaveBeenLastCalledWith('a', '2');
    });
});