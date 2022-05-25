import { CircularProgress, Stack } from '@mui/material'
import React from 'react'

const Loader = () =>
{
    return (
        <div style={ { background: 'transparent' } }>
            <Stack sx={ { color: 'grey.500', marginLeft: "48%", marginTop: "20%" } } spacing={ 2 } direction="row">

                <CircularProgress color="success" />

            </Stack>
        </div>
    )
}

export default Loader