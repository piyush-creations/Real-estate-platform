import { useState } from 'react';
import {FaRulerCombined,FaRuler,FaMapMarkedAlt,FaExpand,} from 'react-icons/fa';
import './AreaConverter.css';

const conversionRates = {
  bigha: 27225,
  gaj: 9,
  sqft: 1,
  acre: 43560,
};

const AreaConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('bigha');
  const [toUnit, setToUnit] = useState('sqft');
  const [result, setResult] = useState(null);

  const handleConvert = () => {
    if (!inputValue || isNaN(inputValue)) {
      setResult('Enter a valid number');
      return;
    }
    const valueInSqFt = parseFloat(inputValue) * conversionRates[fromUnit];
    const converted = valueInSqFt / conversionRates[toUnit];
    setResult(`${converted.toFixed(2)} ${toUnit}`);
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className="area-pro-container">
      {/* Top decorative icon */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/69/69524.png"
        alt="House Icon"
        className="top-illustration"
      />
      <h2>
        <FaRulerCombined style={{ marginRight: '8px', color: '#3b82f6' }} />
        Area Unit Converter
      </h2>

      <div className="form-group">
        <label>
          <FaExpand style={{ marginRight: '6px' }} />
          Enter Value
        </label>
        <input
          type="number"
          placeholder="e.g. 5"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="unit-row">
        <div className="unit-box">
          <label>
            <FaRuler /> From
          </label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            <option value="bigha">Bigha</option>
            <option value="gaj">Gaj</option>
            <option value="sqft">Square Feet</option>
            <option value="acre">Acre</option>
          </select>
        </div>

        <button
          className="swap-button"
          onClick={handleSwap}
          title="Swap units"
        >
          ⇄
        </button>

        <div className="unit-box">
          <label>
            <FaMapMarkedAlt /> To
          </label>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            <option value="bigha">Bigha</option>
            <option value="gaj">Gaj</option>
            <option value="sqft">Square Feet</option>
            <option value="acre">Acre</option>
          </select>
        </div>
      </div>

      <button className="convert-btn" onClick={handleConvert}>
        Convert
      </button>

      {result && (
        <div className="result-box">
          Result: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
};

export default AreaConverter;
