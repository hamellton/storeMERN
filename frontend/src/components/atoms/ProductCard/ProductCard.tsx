import React from "react";
import styled from "styled-components";
import { Colors } from "../../../types/baseTypes";
import useDevice, { DeviceTypes } from "../../../hooks/useDevice";
import { IProduct } from "../../../types/types";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  border: 1px solid ${Colors.lightGray};
  border-radius: 8px;
  background-color: ${Colors.white};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  padding: 20px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  max-width: 500px;
`;

const CardContent = styled.div<{ device?: DeviceTypes }>`
  display: flex;
  flex-direction: ${(props) =>
    props.device === DeviceTypes.MOBILE ? "column" : "row"};
  align-items: ${(props) =>
    props.device === DeviceTypes.MOBILE ? "center" : "flex-end"};
  justify-content: ${(props) =>
    props.device === DeviceTypes.MOBILE ? "center" : "space-between"};
  padding: 0 10px;
  margin-top: 20px;
`;

const TitleContainer = styled.div<{ device?: DeviceTypes }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.device === DeviceTypes.MOBILE ? "center" : "start"};
`;

const Title = styled.h2`
  font-size: 1.2rem;
  color: ${Colors.black};
  margin-bottom: 5px;
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
  text-align: right;
`;

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 4px;
`;

interface IProductCardProps {
  product: IProduct;
}

const defaultImageURL =
  "https://static.lenskart.com/media/owndays/desktop/img/od-misc/no-image.jpg";

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const { device } = useDevice() ?? {};

  return (
    <CardContainer>
        <Link to={`/product/${product.id}`}>
          <ProductImage
            src={product.imageURL || defaultImageURL}
            alt={product.sku}
            onError={(e) => {
              e.currentTarget.src = defaultImageURL;
            }}
          />
        </Link>
      <CardContent device={device}>
        <TitleContainer device={device}>
          <Subtitle device={device}>Router</Subtitle>
          <Title>{product.sku}</Title>
        </TitleContainer>
        {product?.retailPrice && (
          <Price>{Number(product?.retailPrice).toFixed(2)} грн</Price>
        )}
      </CardContent>
    </CardContainer>
  );
};

export default ProductCard;
