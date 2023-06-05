type ButtonProps = {
    id: string;
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  };
  

export default function Button({ id, text, onClick }: ButtonProps) {
    return (
        <button id={id} onClick={onClick}>{text}</button>
    );
}
