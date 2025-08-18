import {createContext, useContext, useEffect, useMemo, useReducer, type ReactNode,} from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image?: string;
  variant?: { size?: string | null; color?: string | null };
  qty: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type Action =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: { id: string; key?: string } }
  | { type: "QTY"; payload: { id: string; key?: string; qty: number } }
  | { type: "CLEAR" };

const initialState: CartState = { items: [], isOpen: false };

const keyFor = (i: CartItem) =>
  `${i.id}|${i.variant?.size ?? ""}|${i.variant?.color ?? ""}`;

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "ADD": {
      const k = keyFor(action.payload);
      const items = state.items.slice();
      const idx = items.findIndex((x) => keyFor(x) === k);
      if (idx >= 0)
        items[idx] = { ...items[idx], qty: items[idx].qty + action.payload.qty };
      else items.push(action.payload);
      return { ...state, items, isOpen: true };
    }
    case "REMOVE": {
      const items = state.items.filter(
        (x) => keyFor(x) !== `${action.payload.id}|${action.payload.key ?? ""}`
      );
      return { ...state, items };
    }
    case "QTY": {
      const items = state.items.map((x) =>
        keyFor(x) === `${action.payload.id}|${action.payload.key ?? ""}`
          ? { ...x, qty: Math.max(1, action.payload.qty) }
          : x
      );
      return { ...state, items };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

type Ctx = {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  add: (item: CartItem) => void;
  remove: (id: string, variantKey?: string) => void;
  setQty: (id: string, qty: number, variantKey?: string) => void;
  open: () => void;
  close: () => void;
  clear: () => void;
  format: (n: number) => string;
  freeShippingThreshold: number;
  missingForFreeShipping: number;
};

// Створюємо контекст з початковим значенням null замість порожнього об'єкта
const CartContext = createContext<Ctx | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    if (typeof window !== 'undefined') {
      try {
        const raw = localStorage.getItem("cart:v1");
        return raw ? (JSON.parse(raw) as CartState) : initialState;
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("cart:v1", JSON.stringify(state));
    }
  }, [state]);

  const subtotal = useMemo(
    () => state.items.reduce((s, i) => s + i.price * i.qty, 0),
    [state.items]
  );

  const freeShippingThreshold = 150;
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const value: Ctx = {
    items: state.items,
    isOpen: state.isOpen,
    subtotal,
    add: (item: CartItem) => dispatch({ type: "ADD", payload: item }),
    remove: (id: string, key?: string) => dispatch({ type: "REMOVE", payload: { id, key } }),
    setQty: (id: string, qty: number, key?: string) =>
      dispatch({ type: "QTY", payload: { id, qty, key } }),
    open: () => dispatch({ type: "OPEN" }),
    close: () => dispatch({ type: "CLOSE" }),
    clear: () => dispatch({ type: "CLEAR" }),
    format: (n: number) => `$${n.toFixed(2)}`,
    freeShippingThreshold,
    missingForFreeShipping,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};