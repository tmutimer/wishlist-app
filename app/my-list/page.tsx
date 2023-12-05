import ListItem from "@/components/listItem"
import { getMyList } from "@/datautils"


const myList = getMyList();

export default function MyList() {
    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-24">
            {myList.map((item) => (
                <ListItem key={item.id} itemName={item.name} />
            ))}
        </main>
    );
}