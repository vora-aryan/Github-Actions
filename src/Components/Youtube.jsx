/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const BACKEND = "http://localhost:4000";

function App() {
  const [url, setUrl] = useState("");
  const [formats, setFormats] = useState(null);

  const fetchFormats = async () => {
    if (!url) return alert("Please enter a URL");

    try {
      const res = await axios.get(`${BACKEND}/formats`, { params: { url } });
      setFormats(res.data);
    } catch (err) {
      alert("Failed to fetch formats");
    }
  };

  const download = (itag) => {
    window.open(
      `${BACKEND}/download?url=${encodeURIComponent(url)}&itag=${itag}`
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>YouTube Downloader</h2>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
        style={{ width: "300px" }}
      />
      <button onClick={fetchFormats}>Fetch Formats</button>

      {formats && (
        <div style={{ marginTop: 20 }}>
          <h3>{formats.title}</h3>

          <h4>Video (MP4)</h4>
          <ul>
            {formats.video.map((v) => (
              <li key={v.itag}>
                {v.quality} - {v.mime}
                <button onClick={() => download(v.itag)}>Download</button>
              </li>
            ))}
          </ul>

          <h4>Audio (MP3)</h4>
          <ul>
            {formats.audio.map((a) => (
              <li key={a.itag}>
                {a.quality} - {a.mime}
                <button onClick={() => download(a.itag)}>Download</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
