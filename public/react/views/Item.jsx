function Item({ items }) {
  return (
    <div className="single-view">
      {items.map((item) => (
        <div key={item.id} className="item">
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <p>{item.category}</p>
          <p>{item.image}</p>
        </div>
      ))}
    </div>
  );
}

export default Item;
