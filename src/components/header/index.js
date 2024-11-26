import React from 'react'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { IconField } from 'primereact/iconfield'

const Header = ({ title, onSearch, placeholder = "Search..." }) => {
    return (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">{title}</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={(e) => onSearch(e.target.value)}
                    placeholder={placeholder}
                />
            </IconField>
        </div>
    );
};

export default Header
