function PersonalInfoForm({ formData, onChange }) {
  return (
    <div className="form personal-info">
      <label htmlFor="first_name" className="required">
        First Name
      </label>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={onChange}
        required
      />

      <label htmlFor="middle_name" className="required">
        Middle Name
      </label>
      <input
        type="text"
        name="middle_name"
        placeholder="Middle Name"
        value={formData.middle_name}
        onChange={onChange}
        required
      />

      <label htmlFor="last_name" className="required">
        Last Name
      </label>
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={onChange}
        required
      />

      <fieldset className="dateofbirth">
        <legend>Date of Birth</legend>
        <input
          type="number"
          name="month"
          placeholder="MM"
          aria-label="Month"
          value={formData.month}
          onChange={onChange}
          required
        />
        <input
          type="number"
          name="day"
          placeholder="DD"
          aria-label="Day"
          value={formData.day}
          onChange={onChange}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="YYYY"
          aria-label="Year"
          value={formData.year}
          onChange={onChange}
          required
        />
      </fieldset>

      <label htmlFor="gender" className="readonly">
        Gender
      </label>
      <input type="text" name="gender" placeholder="Gender" value={formData.gender || ""}
      onChange={onChange} readOnly />
    </div>
  );
}

export default PersonalInfoForm;
