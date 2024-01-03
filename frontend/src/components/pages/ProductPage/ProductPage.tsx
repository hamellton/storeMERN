import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../organisms/Layout/Layout";
import { IApiResponseError, IProduct } from "../../../types/types";
import config from "../../../utils/config";
import { sendRequest } from "../../../utils/api";
import { Colors } from "../../../types/baseTypes";
import useDevice, { DeviceTypes } from "../../../hooks/useDevice";
import ProductCard from "../../atoms/ProductCard/ProductCard";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 0 20px;
  background-color: ${Colors.white};
`;

const Title = styled.h1`
  font-size: 24px;
  margin-top: 20px;
  color: ${Colors.black};
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${Colors.white};
`;

const ProductPageContainer = styled.div<{ device?: DeviceTypes }>`
  display: flex;
  justify-content: center;
  align-items: ${(props) => (props.device === DeviceTypes.MOBILE ? "center" : "flex-start")};
  height: 100%;
  width: ${(props) => (props.device === DeviceTypes.MOBILE ? "100%" : "auto")};
  flex-direction: ${(props) =>
    props.device === DeviceTypes.MOBILE ? "column" : "row"};
`;

const ProductImage = styled.img<{ device?: DeviceTypes }>`
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: ${(props) =>
    props.device === DeviceTypes.MOBILE ? "100%" : "50%"};
  margin-right: ${(props) =>
    props.device === DeviceTypes.MOBILE ? "0" : "20px"};
`;

const ProductInfo = styled.div<{ device?: DeviceTypes }>`
  background-color: ${Colors.white};
  padding: 20px;
  border-radius: 8px;
  flex: 1;
  color: ${Colors.black};
  text-align: ${(props) =>
    props.device === DeviceTypes.MOBILE ? "center" : "start"};
`;

const Subtitle = styled.p<{ device?: DeviceTypes }>`
  font-size: 1.1rem;
  color: ${Colors.lightGray};
  text-align: ${(props) =>
    props.device === DeviceTypes.MOBILE ? "center" : "start"};
  margin-bottom: 15px;
`;

const Price = styled.p`
  font-size: 1.1rem;
  color: ${Colors.primaryBlue};
  font-weight: bold;
  margin-bottom: 10px;
`;

const SkuTitle = styled.h1`
  font-size: 1.4rem;
  margin-bottom: 10px;
`;

const RelatedProducts = styled.div<{ device?: DeviceTypes }>`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-direction: ${(props) =>
    props.device === DeviceTypes.MOBILE ? "column" : "row"};
`;

const RelatedProductsTitle = styled.h2<{ device?: DeviceTypes }>`
  font-size: 1.5rem;
  color: ${Colors.black};
  margin: ${(props) =>
    props.device === DeviceTypes.MOBILE ? "20px 0" : "40px 0"};
`;

const serverUrl = `${config.serverUrl}/products`;
const defaultImageURL =
  "https://static.lenskart.com/media/owndays/desktop/img/od-misc/no-image.jpg";

const ProductPage: React.FC = () => {
  const { device } = useDevice() ?? {};
  const { productId } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const url = `${serverUrl}/product/${productId}`;
      const method = "GET";

      const { status, data } = await sendRequest(url, method);

      if (status === 200) {
        const productData = data as { product: IProduct };
        setProduct(productData.product);
      } else {
        const errorMessage = (data as IApiResponseError).message;
        if (errorMessage) {
          console.error(errorMessage);
        } else {
          console.error("Failed to fetch products");
        }
      }
    };

    const fetchRelatedProducts = async () => {
      const page = 1;
      const perPage = 20;

      const url = `${serverUrl}?page=${page}&perPage=${perPage}`;
      const method = "GET";

      const { status, data } = await sendRequest(url, method);

      if (status === 200) {
        const { products } = data as { products: IProduct[] };
        setRelatedProducts(products.slice(0, 3));
      } else {
        const errorMessage = (data as IApiResponseError).message;
        if (errorMessage) {
          console.error(errorMessage);
        } else {
          console.error("Failed to fetch related products");
        }
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [productId]);

  return (
    <Layout>
      <PageContainer>
        <Title>Product</Title>
        <Content>
          <ProductPageContainer device={device}>
            {product ? (
              <>
                <ProductImage
                  device={device}
                  src={product.imageURL || defaultImageURL}
                  alt={product.sku}
                  onError={(e) => {
                    e.currentTarget.src = defaultImageURL;
                  }}
                />
                <ProductInfo device={device}>
                  <Subtitle device={device}>Router</Subtitle>
                  <SkuTitle>{product.sku}</SkuTitle>
                  <p>Total Stock: {product.totalStock}</p>
                  {product?.retailPrice && (
                    <Price>
                      Retail Price: ${Number(product.retailPrice).toFixed(2)}
                    </Price>
                  )}
                  <p>{product.description}</p>
                </ProductInfo>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </ProductPageContainer>
        </Content>
        {relatedProducts.length > 0 && (
          <RelatedProductsTitle device={device}>
            Related Products
          </RelatedProductsTitle>
        )}
        {relatedProducts.length > 0 && (
          <RelatedProducts device={device}>
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.sku} product={relatedProduct} />
            ))}
          </RelatedProducts>
        )}
      </PageContainer>
    </Layout>
  );
};

export default ProductPage;
