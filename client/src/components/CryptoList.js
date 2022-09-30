import React, { useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client'
import './CryptoList.css'

const CryptoList = (props) => {
    const [cryptos, setCryptos] = useState([]);
    const [socket] = useState(() => io(':8000'));
    const [cryptoList, setCryptoList] = useState('');
    const [otherList, setOtherList] = useState([]);
    const [cryptoPrices, setCryptoPrices] = useState({});
    let newlist = '';
    
    useEffect(() => {
        socket.on('connection', ()=> {
            console.log('Connected to socket')
        });
        axios.get('http://localhost:8000/api/cryptowatcher', {withCredentials: true})
        .then((res) => {
            console.log(res.data)
            setCryptos(res.data.CryptoWatchers);
            
            const lst = [];
            for(let i = 0; i<cryptos.length; i++) {
                let name = cryptos[i].name
                axios.get('https://api.coingecko.com/api/v3/simple/price?ids=' + cryptos[i].cryptoName + '&vs_currencies=usd')
            .then((res) => {
                const newData = res.data[cryptos[i].cryptoName]
                console.log(res.data[cryptos[i].cryptoName].usd)
                const cryptoPrice = res.data[cryptos[i].cryptoName].usd
                axios.put('http://localhost:8000/api/cryptowatcher/' + cryptos[i]._id, {
                    cryptoPrice}).then((res) => console.log(res.data, "price update")).catch(err => console.log('error in updating', err))
                
            }).catch(err => console.log("error in retrieving prices", err))
            }

            
        }).catch(err => console.log(err));

        


        return () => socket.disconnect(true);
    }, []);

    const deleteCrypto = (cryptoID) => {
        axios.delete('http://localhost:8000/api/cryptowatcher/' + cryptoID)
        .then((res) => {
            const newCryptos = cryptos.filter( (crypto) => crypto._id !== cryptoID);
            setCryptos(newCryptos)
            console.log(res)
        }).catch(err => {console.log(err)});

        socket.emit('deleteCrypto', cryptoID)
    }

    socket.on('cryptoDeleted', (deletedCrypto) => {
        setCryptos(cryptos.filter((crypto) => crypto._id !== deletedCrypto))
    })


  return (
    <div className = "container">
        <table>
            <tr>
                <th>Crytpo Name</th>
                <th>Amount Owned</th>
                <th>Actions</th>
                <th>Current Price USD</th>
            </tr>
            {cryptos.map((crypto) => {
                const name = crypto.cryptoName
                return(
                    // eslint-disable-next-line react/jsx-key
                    <tr>
                        <td>{crypto.cryptoName}</td>
                        <td>{crypto.cryptoQuantity}</td>
                        <td>{<Link to = {`/edit/${crypto._id}`}>Edit</Link>} | <button className='action' onClick={() => deleteCrypto(crypto._id)}>Delete</button></td>
                        <td>$ {crypto.cryptoPrice} </td>
                    </tr>
                )
            })}
        </table>
    </div>
  )
}

export default CryptoList;