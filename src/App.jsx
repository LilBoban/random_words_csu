import {useState, useEffect} from 'react';
import './App.css';
import {strangeWords} from "./data/words.js";
import FavoritesList from "./components/FavoritesList.jsx";

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
            alert("Слово уже есть в избранном")
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
                <h2>Избранное ({favourites.length})</h2>
                <FavoritesList favourites={favourites} />
            </section>
        </div>
    );
}

export default App;