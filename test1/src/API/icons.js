import { useEffect } from 'react';
import axios from 'axios';

function useLoadMaterialIcons() {
  useEffect(() => {
    // Replace with the URL of the Material Icons stylesheet
    const materialIconsUrl = 'https://fonts.googleapis.com/icon?family=Material+Icons';

    // Fetch the Material Icons stylesheet
    axios.get(materialIconsUrl)
      .then((response) => {
        // Create a <style> element and insert the stylesheet content
        const styleElement = document.createElement('style');
        styleElement.innerHTML = response.data;

        // Insert the <style> element into the <head> section
        document.head.appendChild(styleElement);
      })
      .catch((error) => {
        console.error('Error loading Material Icons:', error);
      });
  }, []);
}

export default useLoadMaterialIcons;
