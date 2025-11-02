function OrganizationalInfoForm() {
  return (
    <div className="form organizational-info">
      <label htmlFor="department" className="required">Department</label>
      <input type="text" name="department" placeholder="Department" required />

      <label htmlFor="position" className="required">Position</label>
      <input type="text" name="position" placeholder="Position" required />

      <label htmlFor="employment_status" className="required">Employment Status</label>
      <input
        type="text"
        name="employment_status"
        placeholder="Employment Status"
        required
      />

      <fieldset className="joined_date">
        <legend>Joined Date</legend>
        <input
          type="number"
          name="joined_month"
          placeholder="MM"
          aria-label="Month"
          required
        />
        <input
          type="number"
          name="joined_day"
          placeholder="DD"
          aria-label="Day"
          required
        />
        <input
          type="number"
          name="joined_year"
          placeholder="YYYY"
          aria-label="Year"
          required
        />
      </fieldset>
    </div>
  );
}

export default OrganizationalInfoForm;
