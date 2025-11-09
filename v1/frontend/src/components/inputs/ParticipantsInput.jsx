function ParticipantsInput({ label, name, value, onChange, query, setQuery, suggestions }) {
  const handleChange = (e) => {
    const typedValue = e.target.value;
    setQuery(typedValue);

    // Check if user typed or selected a valid name from suggestions
    const selectedUser = suggestions.find(
      (item) => item.username === typedValue
    );

    if (selectedUser) {
      // ✅ valid selection, update both username and user_id
      onChange({
        target: {
          name,
          value: {
            username: selectedUser.username,
            user_id: selectedUser.user_id,
          },
        },
      });
    } else {
      // user is still typing — no valid match yet
      onChange({
        target: {
          name,
          value: {
            username: typedValue,
            user_id: null,
          },
        },
      });
    }
  };

  return (
    <div className="input-group">
      <label htmlFor={name} className="required">{label}</label>
      <div className="location-input-container">
        <input
          type="text"
          value={value?.username || ""}
          onChange={handleChange}
          list="participants-list"
        />
        <datalist id="participants-list">
          {suggestions.map((item) => (
            <option key={item.user_id} value={item.username} />
          ))}
        </datalist>
      </div>
    </div>
  );
}

export default ParticipantsInput;
