import { useEffect, useState } from 'react';
import { Box, Typography, useTheme, Select, MenuItem, IconButton, useMediaQuery } from "@mui/material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';



const EditOrAdd = ({isEdit, user, id }) => {
  const isNonMobile = useMediaQuery("(min-width: 1000px");
  const [cryptoList, setCryptoList] = useState([]);
  const [cryptoName, setCryptoName] = useState('');
  const [cryptoSymbol, setCryptoSymbol] = useState('');
  const [cryptoQuantity, setcryptoQuantity] = useState(0);
  const navigate = useNavigate();

  const theme = useTheme();
  const dark = theme.palette.dark;
  const primaryLight = theme.palette.primary.light;
  const neutralLight = theme.palette.neutral.light;

  const edit = () => {
    axios.put(`http://localhost:8000/api/cryptowatcher/${id}`, {
            cryptoName,
            cryptoQuantity
        }).then(res => {
            navigate(`/crypto-by-user/${user}`);})
            .catch(err => {console.log("Error on submission", err)});
  };

  const add = async () => {
    const getPrice = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=' + cryptoName + '&vs_currencies=usd', {method: "GET"})
    const price = await getPrice.json()
    const cryptoPrice = price[cryptoName].usd

    axios.post('http://localhost:8000/api/cryptowatcher', {
      cryptoName,
      cryptoSymbol,
      cryptoQuantity,
      cryptoPrice
  }, {withCredentials: true}).then(res => {
      navigate(`/crypto-by-user/${user}`)})
      .catch((err) => {
          console.log(err)
      });
  };

  const handleSubmit = async () => {
    if (isEdit) {
      await edit()
    } else {
      await add()
    }
  }




  useEffect(() => {
    if (!isEdit) {
      axios.get('https://api.coingecko.com/api/v3/coins/list')
        .then((res) => {
            setCryptoList(res.data)
        }).catch(err => console.log(err, "error in getting cryptos"))
    } else {
      axios.get(`http://localhost:8000/api/cryptowatcher/${id}`)
        .then((res) => {
            setCryptoName(res.data.CryptoWatcher.cryptoName);
            setcryptoQuantity(res.data.CryptoWatcher.cryptoQuantity);
            console.log(res);
            
        }).catch(err => console.log("Error in getting data",err));
    }
 // eslint-disable-next-line
  },[]);





  return (
    <Box
    m="3em"
    display="grid"
    gap="30px"
    gridTemplateColumns= "repeat(4, minmax(0, 1fr))"
    textAlign="center"
    sx ={{
      "& > div":{ gridColumn: isNonMobile ? undefined : "span 4"}
  }}
    >
      <Box
      sx={{
        gridColumn: "span 4"
    }}
      >
      <Typography
        fontSize="1.5rem"
        color = {dark}
      >
        Crypto Name/Symbol
      </Typography>
        { isEdit ? (
          <Typography>
            {cryptoName}
          </Typography>
        ) 
        :
        (
          <Select
            sx={{
              width: "25%"
            }}
            label="Crypto Name"
            value= {cryptoName}
            onChange = {(e) => {
              setCryptoName(e.target.value.id)
              setCryptoSymbol(e.target.value.symbol)
            }}
          >
            {cryptoList.map((crypto) => {
              return <MenuItem key ={crypto.id} value = {crypto}>{crypto.id} - {crypto.symbol.toUpperCase()}</MenuItem>
            })}
          </Select>
        )}
      </Box>
      <Box
        sx={{
          gridColumn: "span 4"
      }}
      >
      <Typography
        fontSize="1.5rem"
        color = {dark}
      >
        Crypto Quantity
      </Typography>
      <input style={{
        "width": '25%',
        "height": "90%",
        "fontSize": "1.5rem"
      }} type= 'number' step= '0.00000001' value = {cryptoQuantity} onChange = {(e)=>setcryptoQuantity(e.target.value)}/>
      </Box>

      <Box
      sx={{
        gridColumn: "span 4"
    }}>
        <IconButton onClick={(e) => handleSubmit()}>
          <CheckCircleOutlineOutlinedIcon
          color={neutralLight}
          sx = {{
            margin: "1em", 
            fontSize: "2rem",
            "&:hover": {
              color:primaryLight,
              cursor: "pointer"
            }
          }}
          />
        </IconButton>
      </Box>


    </Box>
  )
}

export default EditOrAdd;