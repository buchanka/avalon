import React from 'react';
import { useState } from "react";
import api from "../services/api";

export default function UploadAvatar() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
        // Шаг 1: получить CSRF токен (в куке XSRF-TOKEN)
        await api.get("/sanctum/csrf-cookie");

        // Шаг 2: загрузка аватара
        await api.post("/api/user/upload-avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        });

        alert("Аватар загружен успешно");
    } catch (err) {
        console.error("Ошибка при загрузке аватара:", err);
        setError("Не удалось загрузить аватар");
    } finally {
        setLoading(false);
    }
};

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Загружается..." : "Загрузить аватар"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
