import React from 'react';
import { defaultProps } from 'recompose';

export function GenClient(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [response, setResponse] = useState([]);

    //const payload = props.payload;
    const ticker = props.ticker;
    const interval = props.interval;
    const url = "https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/" + {ticker} + "/" + {interval};

   
  
    useEffect(() => {
      fetch(url, {
        method: 'GET',
        headers: {
          "x-rapidapi-host": "yahoo-finance15.p.rapidapi.com",
          "x-rapidapi-key": "126bfc9c2dmsh8f0b0ab05eac01fp1a710bjsna04479d10daf"
        },
      }
        )
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setResponse(result);
          },
       
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Data is loading...</div>;
    } else {
      return (
        <ul>
          {response}
        </ul>
      );
    }
  }

  