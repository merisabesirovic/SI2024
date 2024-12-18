import React, { useState } from "react";
import styled from "styled-components";
type Props = {};

const RegisterCompany = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledWrapper>
      <form className="form">
        <p className="form-title">Registrujte se kao preduzeće</p>
        <div className="input-container">
          <input placeholder="Unesite ime preduzeća" type="text" required />
        </div>
        <div className="input-container">
          <input placeholder="PIB" type="text" required />
        </div>
        <div className="input-container">
          <input placeholder="Unesite broj telefona" type="tel" required />
        </div>
        <div className="input-container">
          <input
            placeholder="Ime i prezime odgovornog lica"
            type="text"
            required
          />
        </div>
        <div className="input-container">
          <select required>
            <option value="" disabled selected>
              Izaberite kategoriju
            </option>
            <option value="hotel">Hotel</option>
            <option value="restaurant">Restoran</option>
            <option value="cafe">Kafić</option>
          </select>
        </div>
        <div className="input-container">
          <input placeholder="Unesite poslovni email" type="email" required />
        </div>
        <div className="input-container">
          <input
            placeholder="Unesite šifru"
            type={showPassword ? "text" : "password"}
            required
          />
          <span onClick={togglePasswordVisibility}>
            <svg
              stroke="currentColor"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div>
        <button className="submit" type="submit">
          Submit
        </button>
        <p className="signup-link">
          Već imate nalog? <a href="/login">Ulogujte se ovde.</a>
        </p>
      </form>
    </StyledWrapper>
  );
};
const StyledWrapper = styled.div`
  font-family: "Figtree", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9f9f9;

  .form {
    background-color: #fff;
    margin-top: 20px;
    display: block;
    padding: 1.5rem;
    max-width: 400px;
    width: 100%;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  .form-title {
    font-family: "IBM Plex Mono", monospace;
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 600;
    text-align: center;
    color: #e43b39;
    margin-bottom: 1rem;
  }

  .input-container {
    position: relative;
    margin-bottom: 1rem;
  }

  .input-container input,
  .input-container select {
    font-family: "Figtree", sans-serif;
    background-color: #fff;
    padding: 0.75rem;
    font-size: 1rem;
    line-height: 1.5rem;
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    outline: none;
  }

  .input-container span {
    display: grid;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.75rem;
    padding: 0.5rem;
    place-content: center;
    cursor: pointer;
  }

  .input-container span svg {
    color: #9ca3af;
    width: 1.25rem;
    height: 1.25rem;
  }

  .submit {
    display: block;
    padding: 0.75rem;
    background-color: #e43b39;
    color: #ffffff;
    font-family: "IBM Plex Mono", monospace;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    width: 100%;
    border-radius: 0.5rem;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;
  }

  .submit:hover {
    background-color: #c2312f;
  }

  .signup-link {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-align: center;
    margin-top: 1rem;
  }

  .signup-link a {
    text-decoration: underline;
    color: #e43b39;
  }
`;

export default RegisterCompany;
