function OrganizationalInfoForm({ formData, onChange }) {
  return (
    <div className="form organizational-info">
      <label htmlFor="department" className="required">
        Department
      </label>
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={onChange}
        required
      />

      <label htmlFor="position" className="required">
        Position
      </label>
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={onChange}
        required
      />

      <label htmlFor="employment_status" className="required">
        Employment Status
      </label>
      <input
        type="text"
        name="employment_status"
        placeholder="Employment Status"
        value={formData.employment_status}
        onChange={onChange}
        required
      />

      <fieldset className="joined_date">
        <legend>Joined Date</legend>
        <input
          type="number"
          name="joined_month"
          placeholder="MM"
          aria-label="Month"
          value={formData.joined_month}
          onChange={onChange}
          required
        />
        <input
          type="number"
          name="joined_day"
          placeholder="DD"
          aria-label="Day"
          value={formData.first_day}
          onChange={onChange}
          required
        />
        <input
          type="number"
          name="joined_year"
          placeholder="YYYY"
          aria-label="Year"
          value={formData.joined_year}
          onChange={onChange}
          required
        />
      </fieldset>
    </div>
  );
}

export default OrganizationalInfoForm;
