import { useState } from 'react';
import AmbientImage from './components/AmbientImage';
import AmbientVideo from './components/AmbientVideo';
import './App.css';

function App() {
  const [settings, setSettings] = useState({
    blur: 30,
    scale: 1,
    borderRadius: 20,
    refreshRate: 150,
  });

  return (
    <div className="App">
      <AmbientVideo
        borderRadius={settings.borderRadius}
        blur={settings.blur}
        scale={settings.scale}
        refreshRate={settings.refreshRate}
      >
        <video
          muted
          controls
          height={200}
          loop
          autoPlay
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        ></video>
      </AmbientVideo>
      <AmbientImage
        borderRadius={settings.borderRadius}
        blur={settings.blur}
        scale={settings.scale}
      >
        <div>
          <img src="https://picsum.photos/200/300" alt="" />
        </div>
      </AmbientImage>
      <div style={{ color: 'white' }}>
        <div>
          <label>Scale</label>
          <br />
          <input
            type="range"
            min={1}
            max={1.1}
            step={0.01}
            defaultValue={1}
            onChange={(e) =>
              setSettings({ ...settings, scale: +e.target.value })
            }
          />
        </div>
        <div>
          <label>Blur</label>
          <br />
          <input
            type="range"
            min={5}
            max={50}
            step={1}
            defaultValue={30}
            onChange={(e) =>
              setSettings({ ...settings, blur: +e.target.value })
            }
          />
        </div>
        <div>
          <label>Border Radius</label>
          <br />
          <input
            type="range"
            min={0}
            max={50}
            step={1}
            defaultValue={20}
            onChange={(e) =>
              setSettings({ ...settings, borderRadius: +e.target.value })
            }
          />
        </div>
        <div>
          <label>Refresh Rate</label>
          <br />
          <input
            type="range"
            min={30}
            max={200}
            step={10}
            defaultValue={150}
            onChange={(e) =>
              setSettings({ ...settings, refreshRate: +e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;
