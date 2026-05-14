import type { IncomingMessage, ServerResponse } from "http";
import { fileRead, insertProduct } from "../service/product.service";
import type { Iproducts } from "../type/productType";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  console.log(method);
  const urlPath = url?.split("/");
  console.log(urlPath);
  const id = urlPath && urlPath[1] === "products" ? Number(urlPath[2]) : null;
  console.log(id);

  if (url === "/products" && method === "GET") {
    const products = fileRead();
    try {
      return sendResponse(
        res,
        200,
        true,
        "Data Retrived Successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  } else if (method === "GET" && id !== null) {
    const products = fileRead();
    const product = products.find((p: Iproducts) => p.id === id);
    // console.log(product);
    if (!product) {
      try {
        return sendResponse(res, 400, true, "Product Not Found!", product);
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went Wrong", error);
      }
    }
    try {
      return sendResponse(
        res,
        200,
        true,
        "Product with id retrived successfully",
        product,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  } else if (method === "POST" && url === "/products") {
    //created product by post method
    const body = await parseBody(req);
    const products = fileRead();
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);
    insertProduct(products);
    console.log("body", body);

    try {
      return sendResponse(
        res,
        200,
        true,
        "Product created successfully",
        products,
      );
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = fileRead();
    const index = products.findIndex((p: Iproducts) => p.id === id);
    if (index < 0) {
      try {
        return sendResponse(res, 200, true, "Product not found", null);
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went Wrong", error);
      }
    }
    console.log(index);
    products[index] = {
      id: products[index].id,
      ...body,
    };
    insertProduct(products);

    try {
      return sendResponse(res, 200, true, "Product Edited Successfully", null);
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  } else if (method === "DELETE" && id !== null) {
    const products = fileRead();
    const index = products.findIndex((p: Iproducts) => p.id === id);
    if (index < 0) {
      try {
        return sendResponse(res, 200, true, "Product Not Found", null);
      } catch (error) {
        return sendResponse(res, 500, false, "Something Went Wrong", error);
      }
    }
    products.splice(index, 1);
    //  console.log(products)
    insertProduct(products);
    try {
      return sendResponse(res, 200, true, "Product Deleted Successfully", null);
    } catch (error) {
      return sendResponse(res, 500, false, "Something Went Wrong", error);
    }
  }
};
