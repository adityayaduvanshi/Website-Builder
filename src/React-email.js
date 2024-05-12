import React, { useRef, useState } from 'react';

import EmailEditor, { EditorRef, EmailEditorProps } from 'react-email-editor';
import sample from './sample.json';

// Styles
const buttonStyles = {
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '8px',
  fontWeight: 'bold',
};

export const ReactEmail = (props) => {
  const [preview, setPreview] = useState(false);
  const [ischeckIn, setIsCheckIn] = useState(false);
  const emailEditorRef = useRef(null);

  const downloadFile = (fileName, data) => {
    const blob = new Blob([data], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  };
  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data) => {
      const { design, html } = data;
      downloadFile('template.html', html);
      console.log('exportHtml', html, design);
    });
  };

  const togglePreview = () => {
    const unlayer = emailEditorRef.current?.editor;

    if (preview) {
      unlayer?.hidePreview();
      setPreview(false);
    } else {
      unlayer?.showPreview('desktop');
      setPreview(true);
    }
  };
  const checkIn = () => {
    const unlayer = emailEditorRef.current?.editor;
    const currentUrl = window.location.href;
    const demoUrl = `${currentUrl}demo`;
    unlayer?.exportHtml((data) => {
      const { html } = data;
      const previewWindow = window.open(demoUrl, '_blank');
      previewWindow.addEventListener('load', () => {
        previewWindow.document.open();
        previewWindow.document.write(html);
        previewWindow.document.close();
      });
    });
  };
  const onReady = (unlayer) => {
    //  TODO
  };
  const onDesignLoad = (data) => {
    console.log('onDesignLoad', data);
  };

  const onLoad = (unlayer) => {
    console.log('onLoad', unlayer);
    unlayer.addEventListener('design:loaded', onDesignLoad);
    unlayer.loadDesign(sample);
  };
  return (
    <div>
      <div
        style={{
          width: '100vw',
          background: 'black',
          display: 'flex',
          //   padding: '0.2rem 0',

          justifyContent: 'end',
        }}
      >
        <div>
          <button onClick={checkIn} style={buttonStyles}>
            Open in new tab
          </button>
          <button onClick={togglePreview} style={buttonStyles}>
            {preview ? 'Hide' : 'Show'} Preview
          </button>
          <button onClick={exportHtml} style={buttonStyles}>
            Export HTML
          </button>
        </div>
      </div>

      <EmailEditor
        options={{
          displayMode: 'web',
          appearance: {
            theme: 'modern_dark',
          },
          devices: ['desktop', 'mobile', 'tablet'],
          customJS: [
            'https://cdnjs.cloudflare.com/ajax/libs/qrious/4.0.2/qrious.min.js',
            'https://examples.unlayer.com/examples/qr-custom-tool/qrTool.js',
          ],
          source: { name: 'Aditya' },
        }}
        onLoad={onLoad}
        minHeight={'95vh'}
        ref={emailEditorRef}
        onReady={onReady}
      />
    </div>
  );
};
