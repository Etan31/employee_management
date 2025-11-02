function PersonalInfoForm() {
  return (
    <div className="form personal-info">
      <label htmlFor="first_name" className="required">First Name</label>
      <input type="text" name="first_name" placeholder="First Name" required />

      <label htmlFor="middle_name" className="required">Middle Name</label>
      <input
        type="text"
        name="middle_name"
        placeholder="Middle Name"
        required
      />

      <label htmlFor="last_name" className="required">Last Name</label>
      <input type="text" name="last_name" placeholder="Last Name" required />

      <fieldset className="dateofbirth">
        <legend>Date of Birth</legend>
        <input
          type="number"
          name="month"
          placeholder="MM"
          aria-label="Month"
          required
        />
        <input
          type="number"
          name="day"
          placeholder="DD"
          aria-label="Day"
          required
        />
        <input
          type="number"
          name="year"
          placeholder="YYYY"
          aria-label="Year"
          required
        />
      </fieldset>

      <label htmlFor="gender"  className="readonly">Gender</label>
      <input type="text" name="gender" placeholder="Gender" readOnly />
    </div>
  );
}

export default PersonalInfoForm;
