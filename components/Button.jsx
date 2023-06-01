export default function Button({ id, text, onClick }) {
    return (
        <button id={id} onClick={onClick ? onClick : undefined}>{text}</button>
    );
}
