import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

function App() {

  const [crypto, setCrypto] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  
  useEffect(() => {
    let ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    ws.onmessage = (event) => {
    setCrypto(JSON.parse(event.data));
    setIsLoading(false);
    };

    ws.onopen = () => {
      console.log('connected');
    }

    ws.onclose = () => {
      console.log('disconnected');
    }
    
  }, []);

  console.log(crypto);

  return (
    <div className="App">
      <header className="App-header">
        
        {isLoading ? <p>Loading...</p> : crypto.map(item => (
            <table>
            <thead>
            <tr>
              <th>Name</th>
              <th>Price </th>
              <th>Quote Asset Volume</th>
              <th>Price Change (%)</th>
            </tr>
            </thead>
            <tr>
              <td>Name : {item.s},</td>
              <td>Price : ${item.c},</td>
              <td>Quote Asset Volume: {item.q}</td>
              <td>Price Change : {item.p}%</td>
              
              
            </tr>
              
            </table> 
          ))}
        )
        
            
    
          
            
        

      </header>
        
      
    </div>
  );
}

export default App;
