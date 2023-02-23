import './OptionsForm.css';
import Loading from './Loading';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGameOptions, startGame } from '../slices/triviaSlice';

interface category {
    id: number;
    name: string;
}

export default function OptionsForm() {
    const [getCategories, setCategories] = useState<category[]>([]);
    const [getCategory, setCategory] = useState('');
    const [getDifficulty, setDifficulty] = useState('easy');
    const [getQuantity, setQuantity] = useState('15');

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCategories = async () => {
            const url = 'https://opentdb.com/api_category.php';
            const res = await fetch(url);
            const json = await res.json();
            setCategories(json.trivia_categories);
            setCategory(json.trivia_categories[0].id);
        };
        fetchCategories();
    }, []);

    const updateCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const updateDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDifficulty(e.target.value);
    };

    const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = e.target.value;
        setQuantity(quantity);
    };

    const updateGameOptions = () => {
        const options = { getCategory, getDifficulty, getQuantity, running: true };
        dispatch(setGameOptions(options));
        dispatch(startGame());
    };

    if (!getCategories.length)
        return <Loading />;

    return (
        <div>
            <div className={'mb-3'}>
                <select className={'formControl'} onChange={updateCategory} value={getCategory}>
                    {getCategories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={'mb-3'}>
                <select className={'formControl'} onChange={updateDifficulty}>
                    <option value={'easy'}>
                        Easy
                    </option>
                    <option value={'medium'}>
                        Medium
                    </option>
                    <option value={'hard'}>
                        Hard
                    </option>
                </select>
            </div>
            <div className={'mb-3'}>
                <input
                    className={'formControl'}
                    type={'number'}
                    min={0}
                    max={50}
                    placeholder={'Number of questions'}
                    onChange={updateQuantity}
                    value={getQuantity}
                />
            </div>
            <button
                className={'bg-blue-400 hover:bg-blue-500 text-white py-1 px-4 rounded'}
                onClick={() => updateGameOptions()}>
                Start!
            </button>
        </div>
    );
}