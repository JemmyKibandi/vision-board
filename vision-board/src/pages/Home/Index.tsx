import { useState, ChangeEvent } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import { User } from "firebase/auth";

interface Item {
  id: string;
  type: "image" | "text";
  src?: string;
  text?: string;
}

interface VisionBoardProps {
  user: User;
}

const Index: React.FC<VisionBoardProps> = ({ user }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState<string>("");

  // Drag and Drop
  const [, dropRef] = useDrop(() => ({
    accept: "ITEM",
    drop: (item: Item) => {
      setItems((prev) => [...prev, item]);
    },
  }));

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    const storageRef = ref(storage, `images/${uuidv4()}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    setItems((prev) => [...prev, { id: uuidv4(), type: "image", src: url }]);
  };

  const handleSave = async () => {
    await addDoc(collection(db, "visionBoards"), {
      userId: user.uid,
      items,
      createdAt: new Date(),
    });
    alert("Vision board saved!");
  };

  return (
    <div className="p-6">
      <div
        ref={dropRef as unknown as React.RefObject<HTMLDivElement>} // Type cast dropRef to RefObject<HTMLDivElement>
        className="w-full h-96 border-2 border-dashed flex flex-wrap gap-4 p-4"
      >
        {items.map((item) =>
          item.type === "image" ? (
            <img key={item.id} src={item.src} className="w-20 h-20 object-cover" alt="Vision" />
          ) : (
            <div key={item.id} className="p-2 bg-gray-200">
              {item.text}
            </div>
          )
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input type="file" onChange={handleImageUpload} className="border p-2" />
        <input
          type="text"
          placeholder="Add a text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-2"
        />
        <button
          onClick={() => setItems([...items, { id: uuidv4(), type: "text", text }])}
          className="px-4 py-2 bg-green-500 text-white"
        >
          Add Text
        </button>
        <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white">
          Save Board
        </button>
      </div>
    </div>
  );
};

export default Index;
