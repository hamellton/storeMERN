import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import ProductCard from "../../atoms/ProductCard/ProductCard";
import Pagination from "../../molecules/Pagination/Pagination";
import Layout from "../../organisms/Layout/Layout";
import { Colors } from "../../../types/baseTypes";
import config from "../../../utils/config";
import useDevice, { DeviceTypes } from "../../../hooks/useDevice";
import { sendRequest } from "../../../utils/api";
import { IApiResponseError, IProduct } from "../../../types/types";
import useAuth from "../../../hooks/useAuth";

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0 20px;
  background-color: ${Colors.white};
`;

const Content = styled.div`
  width: 100%;
  background-color: ${Colors.white};
`;

const ProductsPageContainer = styled.div<{ device?: DeviceTypes }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 50px;
  margin-top: 50px;

  & > div {
    width: 100%;

    ${(props) =>
      props.device === DeviceTypes.DESKTOP &&
      css`
        width: calc(33.33% - 20px);
      `}
  }
`;


const productsPerPage = 20;
const serverUrl = `${config.serverUrl}/products`;

const ProductsPage: React.FC = () => {
  const { device } = useDevice() ?? {};
  const { isAuthenticated } = useAuth();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  console.log("🚀 ~ file: ProductsPage.tsx:56 ~ products:", products)
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (!isAuthenticated) window.location.href = '/login'
  }, [isAuthenticated])
  

  useEffect(() => {
    const fetchProducts = async (page: number, perPage: number) => {
      const url = `${serverUrl}?page=${page}&perPage=${perPage}`;
      const method = "GET";

      const { status, data } = await sendRequest(url, method);

      if (status === 200) {
        const { products, totalProducts } = data as {
          products: IProduct[];
          totalProducts: number;
        };
        setProducts(products);
        setTotalPages(Math.ceil(totalProducts / perPage));
      } else {
        const errorMessage = (data as IApiResponseError).message;
        if (errorMessage) {
          console.error(errorMessage);
        } else {
          console.error("Failed to fetch products");
        }
      }
    };

    fetchProducts(currentPage, productsPerPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Layout>
      <PageContainer>
        <Content>
          <ProductsPageContainer device={device}>
            {products && products.length > 0 && products.map((product) => {
              return (
                <ProductCard key={product.id} product={product} />
              )
            })}
          </ProductsPageContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Content>
      </PageContainer>
    </Layout>
  );
};

export default ProductsPage;
