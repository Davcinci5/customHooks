import './App.css';
import IndexedDB from './components/IndexedDB'
import UseIndexedDB  from '../src/components/IndexedDB'

function App() {
  return (
    <div className="App">
        <IndexedDB name={'test'} keyPath={'id'} hook={UseIndexedDB}/>
    </div>
  );
}

export default App;
