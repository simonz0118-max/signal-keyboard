export interface Product {
  id: string;
  nameKey: string;
  image: string;
  price: number;
  switchCount: number;
}

export const products: Product[] = [
  { id: "s60", nameKey: "model60", image: "/images/product-s60-real.jpg", price: 219, switchCount: 61 },
  { id: "s75", nameKey: "model75", image: "/images/product-s75-real.jpg", price: 269, switchCount: 84 },
  { id: "tkl", nameKey: "model100", image: "/images/product-s100-real.jpg", price: 289, switchCount: 87 },
];

export const switchOptions = [
  { id: "linear", nameKey: "customize.switchLinear", price: 0 },
  { id: "tactile", nameKey: "customize.switchTactile", price: 0 },
  { id: "clicky", nameKey: "customize.switchClicky", price: 10 },
];

export const caseOptions = [
  { id: "aluminum", nameKey: "customize.caseAluminum", price: 0 },
  { id: "poly", nameKey: "customize.casePoly", price: -30 },
  { id: "wood", nameKey: "customize.caseWood", price: 20 },
];

export const keycapOptions = [
  { id: "cherry", nameKey: "customize.keycapCherry", price: 0 },
  { id: "sa", nameKey: "customize.keycapSA", price: 0 },
  { id: "dsa", nameKey: "customize.keycapDSA", price: 0 },
];
