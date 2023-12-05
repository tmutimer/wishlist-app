type ListItemProps = {
    itemName: string;
};

export default function ListItem({ itemName }: ListItemProps) {
    return (
        <div className="bg-slate-200 rounded min-h-[100px] min-w-[380px] ">
            <h2 className="p-3">{itemName}</h2>
        </div>
    );
}