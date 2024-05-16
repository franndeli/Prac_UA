import React, { useState, useRef, useEffect } from 'react';

const AdjustableSelect = ({ options, defaultText }) => {
  const [width, setWidth] = useState('auto');
  const [selectedValue, setSelectedValue] = useState('');
  const selectRef = useRef(null);

  const adjustWidth = () => {
    const selectElement = selectRef.current;
    const tempDiv = document.createElement('div');
    tempDiv.style.position = 'absolute';
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.fontFamily = getComputedStyle(selectElement).fontFamily;
    tempDiv.style.fontSize = getComputedStyle(selectElement).fontSize;
    tempDiv.style.padding = getComputedStyle(selectElement).padding;

    document.body.appendChild(tempDiv);

    const selectedText = selectedValue ? selectElement.options[selectElement.selectedIndex].text : defaultText;
    tempDiv.innerHTML = selectedText;

    const newWidth = tempDiv.offsetWidth;
    setWidth(`${newWidth + 20}px`);
    document.body.removeChild(tempDiv);
  };

  useEffect(() => {
    adjustWidth();
  }, [selectedValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    adjustWidth();
  };

  return (
    <div className="select_container" style={{ width }}>
      <select
        className="select_de_tipos"
        ref={selectRef}
        style={{ width }}
        onChange={handleChange}
        value={selectedValue}
      >
        <option value="" disabled hidden>{defaultText}</option>
        {options.map(option => (
          <option key={option.id} value={option.id}>{option.nombre}</option>
        ))}
      </select>
    </div>
  );
};

export default AdjustableSelect;
