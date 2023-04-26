import { ReactElement, useState } from 'react';
import './App.css';
import LinkedDropdown from './components/LinkedDropdown';

export default function App(): ReactElement {
    const ddData = [
        {
            value: 'a',
            text: 'A',
            relations: [
                { value: '1', text: '1'},
                { value: '2', text: '2'},
                { value: '3', text: '3' }
            ]
        },
        {
            value: 'b',
            text: 'B',
            relations: [
                { value: '4', text: '4'},
                { value: '5', text: '5'},
                { value: '6', text: '6' }
            ]
        },
        {
            value: 'c',
            text: 'C',
            relations: [
                { value: '7', text: '7'},
                { value: '8', text: '8'},
                { value: '9', text: '9' }
            ]
        },
        {
            value: 'd',
            text: 'D',
            relations: [
                { value: '10', text: '10'},
                { value: '11', text: '11' }
            ]
        }
    ]

    const [letter, setLetter] = useState<string | undefined>(undefined);
    const [number, setNumber] = useState<string | undefined>(undefined);
  
    function handleDropdownChange(a: string | undefined, b: string | undefined): void {
        setLetter(a);
        setNumber(b);
    }

    const letterDisplay = ddData.find(d => d.value === letter)?.text ?? '';
    const numberDisplay = ddData.find(d => d.value === letter)?.relations.find(r => r.value === number)?.text ?? '';

    return (
        <div>
            <h1>Hello</h1>
            <p><i>Wow!</i> - you chose {letterDisplay} {numberDisplay}</p>
            <LinkedDropdown options={ddData} onChange={handleDropdownChange} />
        </div>
    );
}
