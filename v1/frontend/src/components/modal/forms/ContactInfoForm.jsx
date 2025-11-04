function ContactInfoForm({ formData, onChange }) {
  return (
    <div className="form contact-info">

      <label htmlFor="phone_number" className="required">
        Phone Number
      </label>
      <input
        type="text"
        name="phone_number"
        placeholder="Phone number"
        value={formData.phone_number}
        onChange={onChange}
        required
      />

      <label htmlFor="location" className="required">
        Location
      </label>
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={onChange}
        required
      />
    </div>
  );
}

export default ContactInfoForm;
