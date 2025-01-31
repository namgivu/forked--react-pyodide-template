import { useEffect, useState } from 'react';
import script from './python/main.py';
import logo from './logo.svg';
import './App.css';

const runScript = async (code) => {
  const pyodide = await window.loadPyodide({
    indexURL : 'https://cdn.jsdelivr.net/pyodide/dev/full/'  //TODO how to make it offline
  });

  return await pyodide.runPythonAsync(code);
}

const App = () => {
  const [output, setOutput] = useState("(loading...)");

  useEffect(() => {
    const run = async () => {
      const scriptText = await (await fetch(script)).text();
      const out = await runScript(scriptText);
      setOutput(out);
    }
    run();

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          5 + 7 = {output}
        </p>
      </header>
    </div>
  );
}

export default App;
