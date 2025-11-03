function OrganizationalInfoForm({ formData, onChange }) {
  return (
    <div className="form organizational-info">
      <label htmlFor="department_id" className="required">
        Department
      </label>
      <input
        type="text"
        name="department_id"
        placeholder="Department"
        value={formData.department_id}
        onChange={onChange}
        required
      />

      <label htmlFor="position_id" className="required">
        Position
      </label>
      <input
        type="text"
        name="position_id"
        placeholder="Position"
        value={formData.position_id}
        onChange={onChange}
        required
      />

      <label htmlFor="manager_id" className="required">
        Manager
      </label>
      <input
        type="text"
        name="manager_id"
        placeholder="Manager"
        value={formData.manager_id}
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
