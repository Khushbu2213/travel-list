export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀.</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const packedPer = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {packedPer === 100
          ? `You packed everything! Ready to go ✈`
          : `💼You
        have ${numItems} items in your list, and you already packed ${numPacked}(
        ${packedPer}
        %)`}
      </em>
    </footer>
  );
}
