import React, { useRef } from 'react';
import { Textarea } from './style';

const PasteImage = ({ onImagePaste }) => {
  const textareaRef = useRef(null);

  const handlePaste = (event) => {
    const clipboardItems = event.clipboardData.items;
    for (const item of clipboardItems) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          onImagePaste(file, e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div>
      <Textarea
        ref={textareaRef}
        onPaste={handlePaste}
        placeholder="Cole a imagem aqui"
      />
    </div>
  );
};

export default PasteImage;