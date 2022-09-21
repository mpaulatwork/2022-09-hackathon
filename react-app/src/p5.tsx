import { useCallback, useEffect } from "react"

function addScripts(urls: string[]) {
  return Promise.all(urls.map(url => {
    return new Promise<void>(resolve => {
      const elm = document.createElement('script');
      elm.src = url;
      elm.addEventListener('onload', () => resolve());
    });
  }))
}

export const CameraFrame = (props: {}) => {
  useEffect(() => {
    (async () => {
      await addScripts([
        'https://cdn.jsdelivr.net/npm/p5@1.4.2/lib/p5.min.js',
        'https://cdn.jsdelivr.net/npm/p5@1.4.2/lib/addons/p5.sound.min.js',
      ]);
    })();
  }, []);
}
