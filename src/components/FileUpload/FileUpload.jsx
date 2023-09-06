import React, { useState } from 'react';

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
      // Handle the server's response as needed
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="container">
      <h2>File Upload</h2>
      <div className="form-group">
        <input type="file" className="form-control-file" onChange={handleFileChange} />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
