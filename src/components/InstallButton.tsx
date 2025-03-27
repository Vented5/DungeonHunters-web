import { useState, useEffect } from 'react';

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', () => {});
    };
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      (deferredPrompt as any).userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install');
        }
        setDeferredPrompt(null);
      });
    }
  };

  return (
    deferredPrompt ? <button onClick={handleInstall}>Install App</button> : null
  );
};

export default InstallButton;
