import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

const sample: any[] = [
  { title:"Rounded Red Hat", brand:"FASCO", category:"fashion", collections:["best_sellers"], tags:["hat","red"], price:60, salePrice:null, rating:4.4, colors:["#c0392b","#000000"], sizes:["S","M"], thumbnail:"https://picsum.photos/seed/hat/420/520", images:[], popularity:140 },
  { title:"Linen-blend Shirt", brand:"FASCO", category:"fashion", collections:["best_sellers"], tags:["shirt","linen"], price:77, salePrice:65, rating:4.6, colors:["#000000","#2980b9"], sizes:["S","M","L","XL"], thumbnail:"https://picsum.photos/seed/shirt/420/520", images:[], popularity:210 },
  { title:"Long-sleeve Coat", brand:"FASCO", category:"fashion", collections:["new_arrivals"], tags:["coat"], price:106, salePrice:null, rating:4.8, colors:["#2c3e50","#7f8c8d"], sizes:["M","L","XL"], thumbnail:"https://picsum.photos/seed/coat/420/520", images:[], popularity:90 },
  { title:"Sexy Denim Hat", brand:"FASCO", category:"fashion", collections:["best_sellers"], tags:["hat","denim"], price:83, salePrice:null, rating:4.5, colors:["#34495e"], sizes:["S","M","L"], thumbnail:"https://picsum.photos/seed/denimhat/420/520", images:[], popularity:70 },
  { title:"Long Black Dress", brand:"FASCO", category:"fashion", collections:["new_arrivals"], tags:["dress","black"], price:79, salePrice:null, rating:4.7, colors:["#000000"], sizes:["S","M","L"], thumbnail:"https://picsum.photos/seed/dress/420/520", images:[], popularity:160 }
];

export async function seedProducts() {
  const col = collection(db, "products");
  for (const p of sample) {
    await addDoc(col, { ...p, createdAt: serverTimestamp() });
  }
}
