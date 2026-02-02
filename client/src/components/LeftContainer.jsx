import { useState } from "react";
import style from "../components/LeftContainer.module.css";
import { IoIosAdd } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";

export default function LeftContainer() {
  const [showDialog, setShowDialog] = useState(false);
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([
    { link: "https://localhost:8000/auth/callbacks", status: "Active" },
    { link: "https://mediconnect-02qp.onrender.com", status: "Active" },
  ]);

  const handleAddUrl = async () => {
    if (!url) return;

    // Call backend API to save in DB
    try {
      const res = await fetch("http://localhost:5000/api/urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ link: url }),
      });

      const data = await res.json();
      if (res.ok) {
        // Update local state
        setUrls([...urls, { link: data.link, status: "Pending" }]);
        setUrl("");
        setShowDialog(false);
      } else {
        alert(data.message || "Failed to save URL");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving URL");
    }
  };

  return (
    <>
      <div className={style.topBar}>
        <p>
          Monitors<span>.</span>
        </p>
        <button onClick={() => setShowDialog(true)}>
          <IoIosAdd size={20} />
          New
        </button>
      </div>

      <div className={style.urlContainer}>
        {urls.map((item, i) => (
          <div key={i} className={style.urlCard}>
            <div className={style.blinkerUrl}>
              <p className={style.dot}></p>
              <p>{item.link}</p>
            </div>
            <p className={style.status}>{item.status}</p>
            <div className={style.actionBtn}>
              <TiDeleteOutline size={25} color="red" />
              <FiEdit size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Dialog */}
      {showDialog && (
        <div className={style.dialogOverlay}>
          <div className={style.dialogBox}>
            <h3>Add New URL</h3>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL..."
            />
            <div className={style.dialogActions}>
              <button onClick={() => setShowDialog(false)}>Cancel</button>
              <button onClick={handleAddUrl}>Continue</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
