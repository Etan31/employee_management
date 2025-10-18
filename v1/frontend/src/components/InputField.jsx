function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  inputClass = "",
  labelClass = "",
  wrapperClass = "",
}) {
  return (
    <div className={wrapperClass}>
      <label className = {labelClass}>
        {label}
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={inputClass}
        />
      </label>
    </div>
  );
}

export default InputField;
