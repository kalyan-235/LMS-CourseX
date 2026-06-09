export default function Modal({
  isOpen,
  title,
  children,
  onClose,
  size = "md",
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
    >
      <div
        className={`modal modal-${size}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
