function DropdownInput({
  label,
  name,
  value,
  onChange,
  query,
  setQuery,
  suggestions,
}) {
  return (
    <div className="input-group">
      <label htmlFor={name} className="required">
        {label}
      </label>
      <div className="location-input-container">
        <input
          type="text"
          id={name}
          name={name}
          className="location-input"
          list={`${name}List`}
          placeholder={`Start typing a ${label.toLowerCase()}...`}
          value={value || ""}
          onChange={(e) => {
            onChange(e);
            setQuery(e.target.value);
          }}
          required
        />
        <datalist id={`${name}List`}>
          {suggestions.map((item, index) => (
            <option key={item.id ?? index} value={item.name} />
          ))}
        </datalist>
        
      </div>
    </div>
  );
}

export default DropdownInput;
