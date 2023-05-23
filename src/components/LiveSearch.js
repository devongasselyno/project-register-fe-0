import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios';
// import { Autocomplete } from '@mui/material/Autocomplete';
import { Box } from '@mui/system';
import { Autocomplete } from '@mui/material';


const LiveSearch = () => {
  const [prospects, setProspects] = useState([])

  useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`http://127.0.0.1:8080/api/prospect/read`)
          console.log("Response data:", res.data)
          setProspects(res.data.data)
        } catch (err) {
          console.error("Error fetching prospect data:", err)
        }
      }
      fetchData()
   }, [])
  return (
    <Stack sx={{width: 300, margin: "auto"}}>
      <Autocomplete
        id=''
        getOptionLabel={(prospects) => `${prospects.proscpect_name}`}
        options={prospects}
        sx= {{width: 300}}
        isOption
        isOptionEqualToValue= {(option, value) =>
          option.prospect_name === value.prospect_name
        }

        noOptionsText={"No results"}
        renderOption={(props, prospects) => {
          <Box component="li" {...props} key={prospects.ID}>
            {prospects.proscpect_name}
          </Box>
        }}
        renderInput={(params) => <TextField{...params} label="Search..."/>}
      />
    </Stack>
  )
}

export default LiveSearch