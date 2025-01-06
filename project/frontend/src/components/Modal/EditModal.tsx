import React from "react";
import "./EditModa.css";

type EditModalProps = {
  title: string;
  name: string;
  description: string;
  longitude: string;
  latitude: string;
  category: string;
  onSave: () => void;
  onClose: () => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  setLongitude: React.Dispatch<React.SetStateAction<string>>;
  setLatitude: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const EditModal: React.FC<EditModalProps> = ({
  title,
  name,
  description,
  longitude,
  latitude,
  category,
  onSave,
  onClose,
  setName,
  setDesc,
  setLongitude,
  setLatitude,
  setCategory,
}) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{title}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave();
          }}
        >
          <div>
            <label>Naziv</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Opis</label>
            <textarea
              value={description}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div>
            <label>Geografska dužina</label>

            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
          <div>
            <label>Geografska širina</label>

            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="category">Kategorija</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="islamic">Islamski spomenik</option>
              <option value="christian">Hrišćanski spomenik</option>
              <option value="natural">Spomenik prirode</option>
              <option value="hotel">Hotel</option>
              <option value="restaurants">Restoran</option>
              <option value="cafe">Kafić</option>
              <option value="historic">Istorijski spomenik</option>
            </select>
          </div>
          <div className="btns">
            <button type="submit">Sačuvaj</button>
            <button onClick={onClose}>Odustani</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
