import { useRef } from "react";

import { createItem } from "@/components/item";

const ItemModificationBar = ({ setItems, items, saveList }) => {
  const inputNameRef = useRef(null);
  const inputQuantityRef = useRef(null);

  return (
    <div className="fixed bottom-6 w-full px-8">
      <div className="flex justify-between w-full rounded mx-auto p-1">
        <div className="flex md:max-w-lg border border-gray-400">
          <input
            ref={inputNameRef}
            className="flex-1"
            placeholder="Kekse, Wasser, Butter, ..."
            className="p-3"
          />
          <input
            ref={inputQuantityRef}
            className="flex-auto"
            type="number"
            min={1}
            max={100}
            placeholder="1"
            className="p-3"
          />
          <button
            className="w-16 bg-blue-600 text-white text-lg font-bold rounded"
            onClick={() => {
              const itemName = inputNameRef?.current?.value;
              const itemQuantity =
                parseInt(inputQuantityRef?.current?.value) || 1;

              if (itemName === "" || itemQuantity < 1 || itemQuantity > 100) {
                return;
              }

              const possibleItemPosition = items
                .map(({ item }) => item.toLowerCase())
                .indexOf(itemName.toLowerCase());

              let newList = null;

              if (possibleItemPosition >= 0) {
                items[possibleItemPosition].quantity += itemQuantity;
                newList = [...items];
              } else {
                newList = [...items, createItem(itemName, itemQuantity)];
              }

              setItems(newList);
              saveList(newList);

              inputNameRef.current.value = "";
              inputQuantityRef.current.value = "";
            }}
          >
            +
          </button>
        </div>
        <DeletionBar items={items} setItems={setItems} saveList={saveList} />
      </div>
    </div>
  );
};

const DeletionBar = ({ items, setItems, saveList }) => {
  if (items.filter(({ isSelected }) => isSelected).length > 0) {
    return (
      <div className="border bg-black text-white px-6 py-2 rounded-full flex items-center">
        {items.filter(({ isSelected }) => isSelected).length} Element(e)
        ausgewählt
        <button
          className="ml-2 px-2 rounded bg-red-500 font-semibold"
          onClick={async () => {
            const newItems = items.filter(({ isSelected }) => !isSelected);
            setItems(newItems);
            await saveList(newItems);
          }}
        >
          Ausgewählte Löschen
        </button>
        <button
          className="ml-2 px-2 rounded bg-white font-bold  bg-opacity-25"
          onClick={() => {
            items.forEach((item) => {
              item.isSelected = false;
            });
            setItems([...items]);
          }}
        >
          X
        </button>
      </div>
    );
  }
  return null;
};

export default ItemModificationBar;
