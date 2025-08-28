export default function FraseCard({ frase, accentColor }) {
  return (
    <blockquote style={{ borderLeft: `5px solid ${accentColor}` }}>
      <p>{frase.texto}</p>
      <cite>- {frase.autor}</cite>
    </blockquote>
  );
}
