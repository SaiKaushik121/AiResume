import "../UI/Input.css";

export default function Input({ type, label, name, ...props }) {
  return (
    <div className="input-fields-section">
      <label htmlFor={name}>
        {label}
      </label>
      <input className="input" type={type} id={name} name={name} required {...props} />
    </div>
  );
}
