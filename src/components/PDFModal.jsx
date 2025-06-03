import React from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function PDFModal({ open, onClose, pdfUrl, title }) {
  if (!open) return null;
  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={e => e.stopPropagation()}>
        <div className="pdf-modal-header">
          <span>{title}</span>
          <button onClick={onClose} className="pdf-modal-close">×</button>
        </div>
        <div className="pdf-modal-body">
          <Document file={pdfUrl} loading="Loading PDF...">
            <Page pageNumber={1} />
          </Document>
        </div>
      </div>
    </div>
  );
} 