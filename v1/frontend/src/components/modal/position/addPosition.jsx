import Modal from "../Modal";
import IcPlus from "../../../icons/ic-plus.svg";
import IcWork from "../../../icons/ic-work.svg";
export default function addPosition({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className="modal-header">
        <div className="left">
          <img src={IcWork} alt="event" />
          <div className="header-text">
            <h2>Add New Position</h2>
            <p>Fill in the data below to add position</p>
          </div>
        </div>
        <button onClick={onClose}>
          <img src={IcPlus} alt="close" className="btn-close" />
        </button>
      </header>
    </Modal>
  );
}
