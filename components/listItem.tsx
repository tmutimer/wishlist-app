'use client'

import { useState } from 'react';

export interface ListItemProps {
    id: string;
    name: string;
    note?: string;
    price?: number;
    updateItem: Function;
};

export default function ListItem({id, name, note, price, updateItem }: ListItemProps) {

    const [isEditable, setIsEditable] = useState(false);
    const [localName, setLocalName] = useState(name);
    const [localNote, setLocalNote] = useState(note);
    const [localPrice, setLocalPrice] = useState(price);    

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        const isFocusLeavingListItem = !event.currentTarget.contains(event.relatedTarget as Node);
        if (isFocusLeavingListItem) {
            setIsEditable(false);
        }
    };

    const handleClick = () => {
        setIsEditable(true);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalName(event.target.value);
    };

    const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalNote(event.target.value);
    };

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalPrice(parseFloat(event.target.value));
    };


    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const updatedItem: ListItemProps = {
                id: id,
                name: localName,
                note: localNote,
                price: localPrice,
                updateItem
            }
            updateItem(id, updatedItem)
                
            event.currentTarget.blur()
        }

        if (event.key === 'Escape') {
            event.currentTarget.blur()
        }
    };

    return (
        <div className="bg-white rounded min-h-[100px] min-w-[380px] p-5" onBlur={handleBlur} >
            {isEditable ?
            <form>
                <input 
                    type="text" 
                    className="block" 
                    value={localName} 
                    onChange={handleTitleChange} 
                    onKeyDown={handleKeyPress}
                    placeholder='What are you wishing for?'
                    autoFocus
                />
                <input 
                    type="text" 
                    className="block" 
                    value={localNote} 
                    onChange={handleNoteChange} 
                    onKeyDown={handleKeyPress}
                    placeholder='Add a note...'
                />
                <input 
                    type="number" 
                    className="block" 
                    value={localPrice} 
                    onChange={handlePriceChange} 
                    onKeyDown={handleKeyPress}
                    placeholder='£ What is the price?...'
                />
                <small className="block">Press <code>[enter]</code> to <strong>Save</strong></small>
            </form> 
            :
            <div>
                <h2 className="" onClick={handleClick}>{localName}</h2>
                <small className="block" onClick={handleClick}>{localNote}</small>
                {localPrice && <p>£{localPrice}</p>}
            </div> 
            
            }
        </div>
    );
}