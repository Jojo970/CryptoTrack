import { Box} from "@mui/material";
import Navbar from "../navbar";
import { useParams } from "react-router-dom";

import EditOrAdd from "../../components/EditOrAdd";




const Add = () => {
  const { user } = useParams();
  
  return (
    <Box>
      <Navbar />
      <EditOrAdd isEdit={false} user={user} _id={null} />
    </Box>
  )
}

export default Add;