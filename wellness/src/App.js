import "./App.css";
import { useState } from "react";
import MeditationTimer from "./meditationTimer/MeditationTimer";
import { useWakeLock } from "react-screen-wake-lock";
import "semantic-ui-css/semantic.min.css";
import DevDataModal from "./DevDataModal";
import { Button } from "semantic-ui-react";

function App() {
  const {
    isSupported,
    release: releaseWakeLock,
    request: acquireWakeLock,
  } = useWakeLock();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      <MeditationTimer
        onComplete={releaseWakeLock}
        onPause={releaseWakeLock}
        onPlay={acquireWakeLock}
      />
      <DevDataModal
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        wakeLockIsSupported={isSupported}
        buildName={
          (process.env.REACT_APP_BUILD &&
            process.env.REACT_APP_BUILD.substring(0, 7)) ||
          "dev"
        }
      >
        <div className="devDataButton">
          <Button
            icon="info"
            size="tiny"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </DevDataModal>
    </div>
  );
}

export default App;
