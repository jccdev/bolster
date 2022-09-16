import { useState } from 'react';
import './App.css';
import axios from 'axios';
import { format as prettyFormat } from 'pretty-format';
import { prettyPrintJson } from 'pretty-print-json';

function App() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [lastScan, setLastScan] = useState<string>(null);
  const [lastScanPretty, setLastScanPretty] = useState<string>(null);
  const [error, setError] = useState<string>(null);

  async function scanUrl() {
    try {
      setLoading(true);
      setLastScan(null);
      setError(null);
      const res = await axios.post('http://localhost:3000/scans', {
        url,
      });

      const clean = res.data;
      delete clean.html_content;
      delete clean.snapshot;
      setLastScanPretty(prettyPrintJson.toHtml(res.data));
    } catch (e) {
      console.error(e);
      setError(prettyFormat(e));
      alert('Error Occured.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <h1>Bolster Scan URL</h1>
      <div>
        <input
          disabled={loading}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type={'text'}
          placeholder={'Enter a url to scan'}
        ></input>
        <button disabled={loading} onClick={() => scanUrl()}>
          Submit
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {lastScanPretty && (
        <div>
          <h3>Last Scan</h3>
          <div style={{ width: 500, height: 500, overflow: 'auto' }}>
            <div dangerouslySetInnerHTML={{ __html: lastScanPretty }}></div>
          </div>
        </div>
      )}

      {error && (
        <div>
          <h3>Error</h3>
          <div style={{ width: 500, height: 500, overflow: 'auto' }}>
            <pre>{error}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
