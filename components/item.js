const Item = ({ item, className, items, setItems }) => {
  return (
    <div
      className={[
        "flex items-center p-2 my-1 rounded cursor-pointer",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={() => {
        item.isSelected = !item.isSelected;
        setItems([...items]);
      }}
    >
      <input checked={item.isSelected} type="checkbox"></input>
      <article className="ml-4">
        <h2
          className={[
            "font-semibold",
            item.isSelected && "line-through text-gray-400",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {item.item}
        </h2>
        <div
          className={["text-gray-400", item.isSelected && "line-through"]
            .filter(Boolean)
            .join(" ")}
        >
          {item.quantity}
        </div>
      </article>
    </div>
  );
};

export const createItem = (item, quantity, done = false) => ({
  item,
  quantity,
  done,
});

export default Item;
