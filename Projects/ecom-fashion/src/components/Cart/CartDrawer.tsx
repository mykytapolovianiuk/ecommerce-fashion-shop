import { useCart } from "../../context/CartContext.tsx";
import styles from "./CartDrawer.module.scss";

const CartDrawer = () => {
  const {
    isOpen, close, items, subtotal, setQty, remove, format,
    missingForFreeShipping, freeShippingThreshold
  } = useCart();

  return (
    <div className={`${styles.backdrop} ${isOpen ? styles["backdrop--show"] : ""}`} onClick={close}>
      <aside className={`${styles.drawer} ${isOpen ? styles["drawer--open"] : ""}`} onClick={e=>e.stopPropagation()}>
        <header className={styles.head}>
          <h3>Shopping Cart</h3>
          <button className={styles.x} onClick={close} aria-label="Close">×</button>
        </header>

        <p className={styles.free}>
          {missingForFreeShipping > 0
            ? <>Buy <strong>{format(missingForFreeShipping)}</strong> more and get <strong>Free Shipping</strong></>
            : <>You’ve got <strong>Free Shipping</strong> 🎉</>}
        </p>

        <div className={styles.list}>
          {items.map((i) => {
            const vKey = `${i.variant?.size ?? ""}|${i.variant?.color ?? ""}`;
            return (
              <div className={styles.row} key={`${i.id}|${vKey}`}>
                <img className={styles.thumb} src={i.image} alt="" />
                <div className={styles.info}>
                  <div className={styles.title}>{i.title}</div>
                  {i.variant?.color || i.variant?.size ? (
                    <div className={styles.variant}>
                      {i.variant?.color ? <>Color: <span>{i.variant.color}</span>&nbsp;</> : null}
                      {i.variant?.size ? <>Size: <span>{i.variant.size}</span></> : null}
                    </div>
                  ) : null}
                  <div className={styles.price}>{format(i.price)}</div>
                </div>

                <div className={styles.qty}>
                  <button onClick={()=>setQty(i.id, i.qty - 1, vKey)}>-</button>
                  <span>{String(i.qty).padStart(2,'0')}</span>
                  <button onClick={()=>setQty(i.id, i.qty + 1, vKey)}>+</button>
                </div>

                <button className={styles.remove} onClick={()=>remove(i.id, vKey)} aria-label="Remove">×</button>
              </div>
            );
          })}
          {!items.length && <div className={styles.empty}>Your cart is empty</div>}
        </div>

        <footer className={styles.foot}>
          <div className={styles.subrow}>
            <span>Subtotal</span>
            <strong>{format(subtotal)}</strong>
          </div>
          <button className={styles.checkout} disabled={!items.length}>Checkout</button>
          <button className={styles.view}>View Cart</button>
          <div className={styles.note}>Free shipping for orders over {format(freeShippingThreshold)}</div>
        </footer>
      </aside>
    </div>
  );
};

export default CartDrawer;
