import React from "react";
import "../asset/style/Formsection.css";

const FormSection = () => {
  return (
    <div className="form-container">
      <div className="form-section">
        <div className="form-card">
          <div className="form-header">
            <input type="radio" name="trip-type" id="pickup" checked readOnly />
            <label htmlFor="pickup">Pick - Up</label>
          </div>
          <div className="form-fields">
            <div className="field">
              <label>Locations</label>
              <select>
                <option>Select your city</option>
              </select>
            </div>
            <div className="field">
              <label>Date</label>
              <select>
                <option>Select your date</option>
              </select>
            </div>
            <div className="field">
              <label>Time</label>
              <select>
                <option>Select your time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="switch-icon">
          <button>
            <span>&#8595;</span>
          </button>
        </div>

        <div className="form-card">
          <div className="form-header">
            <input type="radio" name="trip-type" id="dropoff" />
            <label htmlFor="dropoff">Drop - Off</label>
          </div>
          <div className="form-fields">
            <div className="field">
              <label>Locations</label>
              <select>
                <option>Select your city</option>
              </select>
            </div>
            <div className="field">
              <label>Date</label>
              <select>
                <option>Select your date</option>
              </select>
            </div>
            <div className="field">
              <label>Time</label>
              <select>
                <option>Select your time</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSection;
