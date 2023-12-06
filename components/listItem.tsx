'use client'
import { randomUUID } from 'crypto';
import { useState } from 'react';

type ListItemProps = {
    itemName: string;
    isNew: boolean;
};

export default function ListItem({ itemName, isNew = false }: ListItemProps) {
    const [isEditable, setIsEditable] = useState(isNew);
    const [inputValue, setInputValue] = useState(itemName);

    const handleBlur = () => {
        setIsEditable(false);
        // Here you can handle the update of the item
    };

    const handleClick = () => {
        setIsEditable(true);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setWishList(prev => {
                if ( isNew ) return [ ...prev, {id: randomUUID, name: inputValue}]
            })
        }
    };

    return (
        <div className="bg-white rounded min-h-[100px] min-w-[380px] p-5">
            {isEditable ?
            <div>
                <input 
                    type="text" 
                    className="" 
                    value={inputValue} 
                    onChange={handleChange} 
                    onBlur={handleBlur} 
                    onKeyDown={handleKeyPress}
                    autoFocus
                />
                <p className="">Press `enter` to <strong>Save</strong></p>
            </div> 
            : 
            <h2 className="" onClick={handleClick}>{itemName}</h2>
            }
        </div>
    );
}