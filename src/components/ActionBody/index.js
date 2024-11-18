import React from 'react'
import { Fab, Tooltip } from '@mui/material'

export default function ActionBody({ tooltip, color, arialabel, handleClick, icon }) {
    return (
        <Tooltip title={tooltip}>
            <Fab
                color={color || "primary"}
                aria-label={arialabel}
                size='medium'
                className='mr-2'
                onClick={handleClick}
            >
                {icon}
            </Fab>
        </Tooltip>
    )
}
