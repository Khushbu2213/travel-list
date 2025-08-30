import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("items");
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const toCheck = (x) => x.toLowerCase().trim();
  function handleAddItems(newItem) {
    const comparison = (item) =>
      toCheck(item.description) === toCheck(newItem.description) &&
      item.packed === newItem.packed;
    // console.log(item.packed)
    // console.log(newItem.packed);

    const exists = items.find(comparison);
    // console.log(exists);

    if (exists) {
      const updatedItems = items.map((item) =>
        comparison(item)
          ? {
              ...item,
              quantity: item.quantity + newItem.quantity,
            }
          : item
      );

      // console.log(updatedItems);
      setItems(updatedItems);
      localStorage.setItem("items", JSON.stringify(updatedItems));
    } else {
      setItems((items) => [...items, newItem]); // add new item to the array
      localStorage.setItem("items", JSON.stringify([...items, newItem]));
    }
  }

  function handleItemsQty(id, type) {
    const updatedItem = items.find((item) => item.id === id);
    if (type === "inc") {
      const update = items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setItems(update);
      localStorage.setItem("items", JSON.stringify(update));
    } else {
      if (updatedItem.quantity !== 1) {
        const update = items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        );
        setItems(update);
        localStorage.setItem("items", JSON.stringify(update));
      } else {
        handleDeleteItem(id);
      }
    }
  }

  function handleDeleteItem(id) {
    const updatedItems = items.filter((item) => item.id !== id);

    setItems((items) => updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));
  }

  function handleToggleItem(id) {
    // else same logic
    const updatedItems = items.map((item) => {
      return item.id === id ? { ...item, packed: !item.packed } : item;
    });

    // console.log(updatedItems);

    const toggleItem = updatedItems.find((item) => item.id === id);
    if (toggleItem.packed === true) document.querySelector(".btn");
    const otherItem = updatedItems.find(
      (item) =>
        toCheck(item.description) === toCheck(toggleItem.description) &&
        item.id !== id
    );
    // console.log(toggleItem);
    // console.log(otherItem);

    if (otherItem && otherItem.packed === toggleItem.packed) {
      const update = updatedItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + otherItem.quantity }
            : item
        )
        .filter((item) => item.id !== otherItem.id);
      setItems(update);
      localStorage.setItem("items", JSON.stringify(update));
    } else {
      setItems(updatedItems);
      localStorage.setItem("items", JSON.stringify(updatedItems));
    }
  }

  function handleClearItems() {
    const confirmed = window.confirm(
      "Are you sure you want delete all the items?"
    );
    if (confirmed) {
      setItems([]);
      localStorage.removeItem("items");
    }
  }
  return (
    <div className="app">
      <Logo />
      <Form items={items} onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onUpdateQty={handleItemsQty}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}
