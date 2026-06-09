import { useState } from "react";
import "../css/pdfmodal.css";

export default function PDFModal({
  pdfFile,
  pdfTitle,
  onClose,
}) {

  const [scale, setScale] = useState(1);

  return (
    <div className="pdf-modal-overlay">
      <div className="pdf-modal-container">
        
        {/* HEADER */}
        <div className="pdf-modal-header">
          <h2>{pdfTitle}</h2>
          <button
            className="pdf-close-btn"
            onClick={onClose}
            title="Close PDF"
          >
            ✕
          </button>
        </div>

        {/* CONTROLS */}
        <div className="pdf-modal-controls">
          <button
            className="pdf-zoom-btn"
            onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
            title="Zoom Out"
          >
            − Zoom Out
          </button>
          <span className="pdf-zoom-level">
            {Math.round(scale * 100)}%
          </span>
          <button
            className="pdf-zoom-btn"
            onClick={() => setScale(s => Math.min(2, s + 0.1))}
            title="Zoom In"
          >
            + Zoom In
          </button>
          <a
            href={pdfFile}
            download
            className="pdf-download-btn"
            title="Download PDF"
          >
            ⬇ Download
          </a>
        </div>

        {/* PDF VIEWER */}
        <div className="pdf-modal-content">
          <iframe
            src={`${pdfFile}#toolbar=0`}
            title={pdfTitle}
            className="pdf-iframe"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "top center",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
