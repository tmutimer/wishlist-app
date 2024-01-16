'use client'

export default function AddItemButton({onPress}: {onPress: Function}) {

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPress()
    }

    return (
        <button onClick={handleClick}>Add an item...</button>
    )
}
