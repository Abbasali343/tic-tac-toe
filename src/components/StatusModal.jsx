import "../assets/css/StatusModal.css";

export default function StatusModal({ status, closeModal }) {
  return (
    <>
      <div className="backdrop"></div>
      <div className="status-modal">
        <h1 className="status-heading">{status}</h1>
        <button className="close" onClick={() => closeModal()}>
          Close
        </button>
      </div>
    </>
  );
}
