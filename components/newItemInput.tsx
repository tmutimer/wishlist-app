import { useState } from "react";

export default function NewItemInput({submitAction}: {submitAction: Function}) {
    
    let [newItemName, setNewItemName] = useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemName(event.target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            submitAction(newItemName)
        }

    };

    const handleBlur = () => {
        submitAction() // submits without argument, no action taken
    }

    return (
        <div>
            <input type="text" placeholder="What do you want?" value={newItemName} onChange={handleChange} onKeyDown={handleKeyDown} autoFocus onBlur={handleBlur} />
            <small className="block">Press <code>[enter]</code> to <strong>Save</strong></small>
        </div>
    )
}