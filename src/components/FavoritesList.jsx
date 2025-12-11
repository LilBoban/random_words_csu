export default function FavoritesList({ favourites }) {
    if (favourites.length === 0) {
        return <p>Ничего нет</p>;
    }

    return (
        <>
            {favourites.map(word => (
                <div key={word.term} className="favorite-item">
                    <strong>{word.term}</strong> {word.definition}
                </div>
            ))}
        </>
    );
}