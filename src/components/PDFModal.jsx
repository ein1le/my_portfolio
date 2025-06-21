import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFModal({ open, onClose, pdfUrl, pdfUrls, title }) {
  const [error, setError] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [tabIdx, setTabIdx] = useState(0);
  const containerRef = useRef();

  // Reset tab and error when modal opens or pdfUrls/pdfUrl changes
  useEffect(() => {
    setTabIdx(0);
    setError(null);
  }, [open, pdfUrls, pdfUrl]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // Lock width before rendering pages
  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        const width = Math.floor(containerRef.current.getBoundingClientRect().width);
        setContainerWidth(width);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [open]);

  if (!open) return null;
  // Support both single and multiple PDFs
  const pdfList = pdfUrls && pdfUrls.length ? pdfUrls : pdfUrl ? [pdfUrl] : [];
  const activePdf = pdfList[tabIdx] || null;

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-content" onClick={e => e.stopPropagation()}>
        <div className="pdf-modal-header">
          <span>{title}</span>
          <button onClick={onClose} className="pdf-modal-close">×</button>
        </div>
        {/* Tab bar if multiple PDFs */}
        {pdfList.length > 1 && (
          <div className="flex gap-2 mb-3 border-b border-border pb-1">
            {pdfList.map((url, idx) => (
              <button
                key={url}
                className={`px-3 py-1 rounded-t text-sm font-medium transition-colors duration-150 ${tabIdx === idx ? 'bg-accent2 text-background' : 'bg-background text-accent2 hover:bg-accent2/20'}`}
                onClick={() => { setTabIdx(idx); setError(null); setNumPages(null); }}
              >
                PDF {idx + 1}
              </button>
            ))}
          </div>
        )}
        <div className="pdf-modal-body" ref={containerRef}>
          {error && (
            <div style={{ color: 'red', marginBottom: 12 }}>
              Error loading PDF: {error.message || String(error)}
            </div>
          )}
          {activePdf && (
            <Document
              file={activePdf}
              loading="Loading PDF..."
              onLoadError={setError}
              onSourceError={setError}
              onPassword={setError}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {numPages && containerWidth && Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={index + 1}
                  pageNumber={index + 1}
                  width={containerWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ))}
            </Document>
          )}
        </div>
      </div>
    </div>
  );
} 