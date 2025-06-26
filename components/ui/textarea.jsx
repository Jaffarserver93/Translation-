export function Textarea({ value, onChange, readOnly = false, placeholder, className = '' }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      placeholder={placeholder}
      className={`rounded-xl p-3 resize-none ${className}`}
    />
  );
}
