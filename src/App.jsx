import {useState, useEffect} from 'react';
import './App.css';
import {strangeWords} from "./data/words.js";

function App() {
    const [randomWord, setRandomWord] = useState(null);
    const [favourites, setFavourites] = useState(() => {
        const saved = localStorage.getItem('strangeWordsFavourites');
        return saved ? JSON.parse(saved) : [];
    });


    useEffect(() => {
        localStorage.setItem('strangeWordsFavourites',JSON.stringify(favourites))
    }, [favourites]);

    const onGetWordClicked = () => {
        const randomWord = strangeWords[Math.floor(Math.random() * strangeWords.length)];
        setRandomWord(randomWord);
    }

    const onFavouriteAddClicked = () => {
        const isAlreadyAdded = favourites.some(item => item.term === randomWord.term);
        if (!isAlreadyAdded) {
            setFavourites([...favourites, randomWord]);

        } else {
            console.log("Слово уже есть в избранном");
        }
    }
    return (
        <div className="App">
            <section className="current-word">
                <h1>Мини-энциклопедия рандомных странных слов</h1>
                {!randomWord ? (
                    <button onClick={onGetWordClicked}>Случайное слово🔀</button>
                ) : (
                    <>
                        <p>Ваше слово: <strong>{randomWord.term}</strong></p>
                        <p>Что оно означает: {randomWord.definition}</p>
                        <button onClick={onGetWordClicked}>Случайное слово🔀</button>
                        <button onClick={onFavouriteAddClicked}>В избранное ❤️</button>
                    </>
                )}
            </section>

            <section className="favorites-section">
                <h2>Мои избранные слова ({favourites.length})</h2>
                {favourites.length === 0 ? (
                    <p>Ничего нет</p>
                ) : (
                    favourites.map(word => (
                        <div key={word.term} className="favorite-item">
                            <strong>{word.term}:</strong> {word.definition}
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}

export default App;