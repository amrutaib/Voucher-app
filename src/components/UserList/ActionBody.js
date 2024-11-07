import React from 'react';
import { Button } from 'primereact/button';

function ActionBody({ iconName, handleClick, tooltip }) {
    return (
        <Button
            rounded
            outlined
            className="mr-2"
            tooltip={tooltip}
            onClick={handleClick}
            icon={`pi pi-${iconName}`}
            tooltipOptions={{ position: 'bottom' }}
        />
    )
}

export default ActionBody;
