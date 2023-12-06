'use client'
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type ListItemProps = {
    id: any;
    itemName: string;
    isNew: boolean;
    setWishList: React.Dispatch<React.SetStateAction<Array<{id: string, name: string}>>>;
};

export default function ListItem({id, itemName, isNew = false, setWishList }: ListItemProps) {

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
            setWishList((prev: { id: string, name: string }[]) => {
                if ( isNew ) return [ ...prev, {id: uuidv4(), name: inputValue}]
                else {
                    let foundItemIdx = prev.findIndex(item => item.id === id)
                    if (foundItemIdx !== -1) {
                        let newList = [...prev]
                        newList[foundItemIdx].name = inputValue
                        return newList
                    } else {
                        return prev;
                    }
                }
                
            })
            setInputValue("")
        }

        if (event.key === 'Escape') {
            event.currentTarget.blur()
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
                <p className="">Press <code>[enter]</code> to <strong>Save</strong></p>
            </div> 
            : 
            <h2 className="" onClick={handleClick}>{itemName}</h2>
            }
        </div>
    );
}