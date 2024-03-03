
import { preconnect } from 'react-dom';  

  

function Preconnect() {  
  console.log('www')
  preconnect("https://example.com");
}

export default Preconnect;