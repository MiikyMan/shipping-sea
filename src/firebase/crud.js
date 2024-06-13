import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db, storage } from "./firebase"; // Ensure storage is imported correctly
import { getDownloadURL, ref } from "firebase/storage";

// Fetch a specific document example
const fetchSpecificProduct = async (productId) => {
  try {
    const productDocRef = doc(db, "products", productId); // Replace 'productId' with an actual document ID
    const productDoc = await getDoc(productDocRef);

    if (productDoc.exists()) {
      console.log("Product:", productDoc.data());
    } else {
      console.log("No such document!");
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

// This function fetches all documents from the "products" collection
export const doFetchAllProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));

    const productsList = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const productData = doc.data();
        const productPicUrl = productData.productPicUrl; // Assuming this field exists in the document
        const queryProductPic = await ref(storage, productPicUrl); // Using the productPicUrl to fetch the image URL

        // Return the document's data along with the product picture URL
        return { id: doc.id, ...productData, queryProductPic };
      })
    );

    console.log("Products List:", productsList);
    return productsList;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
