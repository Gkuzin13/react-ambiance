import { useState } from 'react';
import AmbientCanvas from './AmbientCanvas';
import './App.css';

function App() {
  const [settings, setSettings] = useState({
    blur: 30,
    scale: 1.05,
    borderRadius: 8,
  });

  return (
    <div className='App'>
      <AmbientCanvas
        borderRadius={settings.borderRadius}
        blur={settings.blur}
        scale={settings.scale}
      >
        <video
          muted
          controls
          height={200}
          src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        ></video>
      </AmbientCanvas>
      <AmbientCanvas
        borderRadius={settings.borderRadius}
        blur={settings.blur}
        scale={settings.scale}
      >
        <div>
          <img src='https://picsum.photos/200/300' alt='' />
        </div>
      </AmbientCanvas>
      <div style={{ color: 'white' }}>
        <div>
          <label>Scale</label>
          <br />
          <input
            type='range'
            min={1}
            max={1.1}
            step={0.01}
            onChange={(e) =>
              setSettings({ ...settings, scale: +e.target.value })
            }
          />
        </div>
        <div>
          <label>Blur</label>
          <br />
          <input
            type='range'
            min={5}
            max={50}
            step={1}
            onChange={(e) =>
              setSettings({ ...settings, blur: +e.target.value })
            }
          />
        </div>
        <div>
          <label>Border Radius</label>
          <br />
          <input
            type='range'
            min={0}
            max={50}
            step={1}
            onChange={(e) =>
              setSettings({ ...settings, borderRadius: +e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
