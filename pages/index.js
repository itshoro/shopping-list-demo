import { useState } from "react";

import { getList } from "@/lib/shopping_list";
import Item from "@/components/item";
import ItemModificationBar from "@/components/itemModificationBar";

const Home = ({ id, title, listItems }) => {
  const [items, setItems] = useState(listItems);

  const saveList = async (list) => {
    await fetch("/api/shopping_list", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name: title,
        values: list.map(({ item, quantity }) => ({ item, quantity })),
      }),
    });
  };

  return (
    <>
      <h1 className="text-4xl">{title}</h1>
      <ul className="w-4/5 bg-white border min-h-screen mt-16 mx-auto p-8">
        {items.map((item, i) => (
          <li key={item.item}>
            <Item
              item={item}
              className={i % 2 == 1 && "bg-gray-100"}
              setItems={setItems}
              items={items}
            />
          </li>
        ))}
      </ul>
      <ItemModificationBar
        setItems={setItems}
        items={items}
        saveList={saveList}
      />
    </>
  );
};

export async function getStaticProps() {
  const { id, name, values } = await getList();
  return {
    props: {
      id,
      title: name,
      listItems: values.map(({ item, quantity }) => ({
        item,
        quantity,
        isSelected: false,
      })),
    },
  };
}

export default Home;
