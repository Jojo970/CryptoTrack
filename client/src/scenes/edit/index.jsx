import { Box} from "@mui/material";
import Navbar from "../navbar";
import { useParams } from "react-router-dom";

import EditOrAdd from "../../components/EditOrAdd";




const Edit = () => {
  const { user, id } = useParams();
  
  return (
    <Box>
      <Navbar />
      <EditOrAdd isEdit={true} user={user} _id={id} />
    </Box>
  )
}

export default Edit;