import { useState } from 'react';
import AmbientImage from '@/components/AmbientImage';
import AmbientVideo from '@/components/AmbientVideo';
import './App.css';

function App() {
  const [settings, setSettings] = useState({
    blur: 20,
    scale: 1.075,
    borderRadius: 16,
    refreshRate: 150,
    opacity: 0.75,
  });

  const randomImageMap = [...Array(8).keys()];

  return (
    <div className="App">
      <AmbientVideo
        borderRadius={settings.borderRadius}
        blur={settings.blur}
        scale={settings.scale}
        refreshRate={settings.refreshRate}
        opacity={settings.opacity}
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
      {randomImageMap.map((key) => {
        return (
          <AmbientImage
            key={key}
            borderRadius={settings.borderRadius}
            blur={settings.blur}
            scale={settings.scale}
            opacity={settings.opacity}
          >
            <div>
              <img
                src={`https://loremflickr.com/300/200?random=${key}`}
                alt={'alt'}
              />
            </div>
          </AmbientImage>
        );
      })}
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
          <label>Opacity</label>
          <br />
          <input
            type="range"
            min={0.2}
            max={1}
            step={0.1}
            defaultValue={0.5}
            onChange={(e) =>
              setSettings({ ...settings, opacity: +e.target.value })
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
