import { useEffect, useMemo, useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import styles from './InvoiceEditorPage.module.css';
import { invoiceTemplateConfig } from '../config/invoiceTemplate';

const ACCEPTED_PDF_TYPES = new Set(['application/pdf']);

function isPdfFile(file) {
  if (!file) {
    return false;
  }

  return ACCEPTED_PDF_TYPES.has(file.type) || file.name.toLowerCase().endsWith('.pdf');
}

function downloadBlob(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(objectUrl);
}

function buildOutputFilename(inputName) {
  if (!inputName) {
    return 'edited-invoice.pdf';
  }

  const pdfSuffix = /\.pdf$/i;

  if (pdfSuffix.test(inputName)) {
    return inputName.replace(pdfSuffix, '-edited.pdf');
  }

  return `${inputName}-edited.pdf`;
}

async function processInvoicePdf(file, receiverEmail) {
  const { pageIndex, overlayRect, senderEmailPosition, receiverEmailPosition, senderEmail, fontSize, textColor } =
    invoiceTemplateConfig;

  const fileBytes = await file.arrayBuffer();
  const pdfDocument = await PDFDocument.load(fileBytes);
  const pages = pdfDocument.getPages();
  const targetPage = pages[pageIndex];

  if (!targetPage) {
    throw new Error(`The uploaded PDF does not include page ${pageIndex + 1}.`);
  }

  const font = await pdfDocument.embedFont(StandardFonts.Helvetica);
  const sharedTextOptions = {
    size: fontSize,
    font,
    color: rgb(textColor.r, textColor.g, textColor.b),
  };

  targetPage.drawRectangle({
    ...overlayRect,
    color: rgb(1, 1, 1),
  });

  targetPage.drawText(senderEmail, {
    x: senderEmailPosition.x,
    y: senderEmailPosition.y,
    ...sharedTextOptions,
  });

  targetPage.drawText(receiverEmail, {
    x: receiverEmailPosition.x,
    y: receiverEmailPosition.y,
    ...sharedTextOptions,
  });

  const pdfBytes = await pdfDocument.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

function InvoiceEditorPage() {
  const [invoiceFile, setInvoiceFile] = useState(null);
  const [receiverEmail, setReceiverEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedBlob, setProcessedBlob] = useState(null);
  const [processedAt, setProcessedAt] = useState('');

  useEffect(() => {
    document.title = 'Invoice Editor';
  }, []);

  const previewUrl = useMemo(() => {
    if (!processedBlob) {
      return '';
    }

    return URL.createObjectURL(processedBlob);
  }, [processedBlob]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const canProcess = invoiceFile && receiverEmail.trim() && !isProcessing;
  const canDownload = Boolean(processedBlob) && !isProcessing;

  const resetEditor = () => {
    setInvoiceFile(null);
    setReceiverEmail('');
    setErrorMessage('');
    setIsProcessing(false);
    setProcessedBlob(null);
    setProcessedAt('');
  };

  const handleFileChange = (event) => {
    const nextFile = event.target.files?.[0] ?? null;

    setErrorMessage('');
    setProcessedBlob(null);
    setProcessedAt('');

    if (!nextFile) {
      setInvoiceFile(null);
      return;
    }

    if (!isPdfFile(nextFile)) {
      setInvoiceFile(null);
      setErrorMessage('Upload a PDF invoice exported from the bank template.');
      return;
    }

    setInvoiceFile(nextFile);
  };

  const handleProcess = async (event) => {
    event.preventDefault();

    if (!invoiceFile) {
      setErrorMessage('Choose a PDF invoice before processing.');
      return;
    }

    if (!receiverEmail.trim()) {
      setErrorMessage('Enter the receiver email before processing.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');
    setProcessedBlob(null);

    try {
      const nextBlob = await processInvoicePdf(invoiceFile, receiverEmail.trim());
      setProcessedBlob(nextBlob);
      setProcessedAt(new Date().toLocaleString());
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? `Unable to parse or edit this PDF. ${error.message}`
          : 'Unable to parse or edit this PDF.',
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedBlob) {
      return;
    }

    downloadBlob(processedBlob, buildOutputFilename(invoiceFile?.name));
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Internal Tool</p>
          <h1>Browser-Only Invoice Post-Processor</h1>
          <p className={styles.description}>
            Upload the exported bank PDF, apply the fixed layout edits locally in your browser, and
            download the modified file. Nothing is uploaded to a server.
          </p>
        </header>

        <div className={styles.grid}>
          <section className={styles.panel}>
            <form className={styles.form} onSubmit={handleProcess}>
              <label className={styles.field}>
                <span>Invoice PDF</span>
                <input type="file" accept="application/pdf,.pdf" onChange={handleFileChange} />
              </label>

              <label className={styles.field}>
                <span>Sender email</span>
                <input type="email" value={invoiceTemplateConfig.senderEmail} disabled />
              </label>

              <label className={styles.field}>
                <span>Receiver email</span>
                <input
                  type="email"
                  value={receiverEmail}
                  onChange={(event) => setReceiverEmail(event.target.value)}
                  placeholder="receiver@example.com"
                />
              </label>

              <div className={styles.actions}>
                <button type="submit" className={styles.primaryButton} disabled={!canProcess}>
                  {isProcessing ? 'Processing…' : 'Process PDF'}
                </button>
                <button type="button" className={styles.secondaryButton} onClick={handleDownload} disabled={!canDownload}>
                  Download edited PDF
                </button>
                <button type="button" className={styles.ghostButton} onClick={resetEditor}>
                  Reset
                </button>
              </div>
            </form>

            <dl className={styles.meta}>
              <div>
                <dt>Status</dt>
                <dd>{isProcessing ? 'Working' : processedBlob ? 'Ready to download' : 'Waiting for input'}</dd>
              </div>
              <div>
                <dt>Selected file</dt>
                <dd>{invoiceFile?.name ?? 'None'}</dd>
              </div>
              <div>
                <dt>Processed</dt>
                <dd>{processedAt || 'Not yet'}</dd>
              </div>
            </dl>

            {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}
          </section>

          <section className={styles.previewPanel}>
            <div className={styles.previewHeader}>
              <h2>Preview</h2>
              <p>{processedBlob ? 'Processed output' : 'The edited PDF preview appears here after processing.'}</p>
            </div>

            <div className={styles.previewFrame}>
              {previewUrl ? (
                <iframe title="Edited invoice preview" src={previewUrl} className={styles.iframe} />
              ) : (
                <div className={styles.emptyState}>
                  <p>No processed PDF yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default InvoiceEditorPage;
