function ContactInfoForm() {
  return (
    <div className="form contact-info">
      <label htmlFor="email"  className="readonly">Email</label>
      <input type="text" name="email" placeholder="Email" readOnly />

      <label htmlFor="phone" className="required">Phone Number</label>
      <input type="text" name="phone" placeholder="Phone number" required />

      <label htmlFor="location" className="required">Location</label>
      <input type="text" name="location" placeholder="Location" required />
    </div>
  );
}

export default ContactInfoForm;
