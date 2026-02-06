import { useEffect, useState } from "react";
import "./styles.css";

const TOTAL_PAGES = 168;

function App() {
  const [page, setPage] = useState(
    Number(localStorage.getItem("lastPage")) || 1
  );
  const [inputPage, setInputPage] = useState("");
  const [zoom, setZoom] = useState(1);
  const [dark, setDark] = useState(false);
  const [showThumbs, setShowThumbs] = useState(false);

  // Save last page
  useEffect(() => {
    localStorage.setItem("lastPage", page);
  }, [page]);

  const nextPage = () => setPage(p => Math.min(p + 1, TOTAL_PAGES));
  const prevPage = () => setPage(p => Math.max(p - 1, 1));

  const jumpToPage = () => {
    const num = parseInt(inputPage, 10);
    if (num >= 1 && num <= TOTAL_PAGES) {
      setPage(num);
      setInputPage("");
    } else {
      alert("Please enter a valid page number (1–168)");
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className={`app ${dark ? "dark" : ""}`}>
      <h1>شرابور سائے</h1>

      {/* Controls */}
      <div className="controls">
        <input
          type="number"
          placeholder="صفحہ نمبر"
          value={inputPage}
          onChange={(e) => setInputPage(e.target.value)}
        />
        <button onClick={jumpToPage}>جائیں</button>
        <button onClick={() => setZoom(z => Math.min(z + 0.1, 2))}>＋</button>
        <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.5))}>－</button>
        <button onClick={() => setDark(d => !d)}>🌙</button>
        <button onClick={toggleFullscreen}>⛶</button>
        <button onClick={() => setShowThumbs(t => !t)}>🖼️</button>
      </div>

      {/* Navigation buttons aligned */}
      <div className="nav-buttons">
  <button onClick={nextPage} disabled={page === TOTAL_PAGES}>⬅️</button>
  <button onClick={prevPage} disabled={page === 1}>➡️</button>
</div>


      {/* Main page view */}
      <div className="page-container">
  <img
    className="page-img"
    style={{ transform: `scale(${zoom})` }}
    src={`/pages/${String(page).padStart(4, "0")}.png`}
    alt={`صفحہ ${page}`}
  />
</div>


      {/* Thumbnails */}
      {showThumbs && (
        <div className="thumbnails">
          {Array.from({ length: TOTAL_PAGES }, (_, i) => (
            <img
              key={i}
              src={`/pages/${String(i + 1).padStart(4, "0")}.png`}
              alt={i + 1}
              onClick={() => {
                setPage(i + 1);
                setShowThumbs(false);
              }}
            />
          ))}
        </div>
      )}

      <div className="footer">
        صفحہ {page} / {TOTAL_PAGES}
      </div>
    </div>
  );
}

export default App;
