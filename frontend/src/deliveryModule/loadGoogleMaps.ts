let isGoogleMapsScriptLoaded = false;

export const loadGoogleMapsScript = (apiKey: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isGoogleMapsScriptLoaded || (window as any).google) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      isGoogleMapsScriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject("Google Maps failed to load.");
    document.head.appendChild(script);
  });
};
