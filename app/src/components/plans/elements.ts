import { Link } from "react-router-dom";
import styled from "styled-components";

export const Background = styled.div`
  padding: 0 25px 25px;
  position: relative;
  width: 100%;
  /* background: ${({ theme }) => theme.colors.primary}; */
`;

export const BackgroundOverlay = styled.div`
  content: "";
  background: ${({ theme }) => theme.colors.primary};
  background: -moz-linear-gradient(
    top,
    ${({ theme }) => theme.colors.primary} 0%,
    #4394f4 100%
  );
  background: -webkit-linear-gradient(
    top,
    ${({ theme }) => theme.colors.primary} 0%,
    #4394f4 100%
  );
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.primary} 0%,
    #4394f4 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=${({
    theme,
  }) => theme.colors.primary}, endColorstr='#4394f4', GradientType=0 );
  height: 350px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  width: 100%;
`;

export const Panel = styled.div`
  border-radius: 10px;
  padding: 15px 25px;
  position: relative;
  width: 100%;
  z-index: 10;
`;

export const PricingTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

export const PricingPlan = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: 1.5rem;
  background: #fff;
  border-radius: 9px;

  @media (min-width: 900px) {
    flex-basis: 100%;
  }
`;

export const PricingImg = styled.div`
  margin-bottom: 25px;
  max-width: 100%;
  display: flex;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`;
export const PricingDescription = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  margin: 1.5rem 0 0;
  font-size: 0.8rem;
`;

export const PricingHeader = styled.h2`
  font-weight: 400;
  letter-spacing: 1px;
  margin-left: 0.4rem;
  color: ${({ theme }) => theme.colors.grey};
`;

export const PricingFeatures = styled.ul`
  color: #016ff9;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 1rem 0 25px;
  list-style: none;
`;

export const PricingFeaturesItem = styled.li`
  /* border-top: 1px solid #e1f1ff; */
  font-size: 12px;
  line-height: 1.5;
  padding: 15px 0;

  span {
    margin-right: 0.5rem;
  }
`;

export const PricingPrice = styled.span`
  color: #016ff9;
  display: block;
  font-size: 32px;
  font-weight: 700;
`;

export const PricingButton = styled(Link)`
  border: 1px solid #9dd1ff;
  border-radius: 10px;
  color: #348efe;
  display: inline-block;
  margin: 25px 0 0;
  padding: 15px 35px;
  text-decoration: none;
  transition: all 150ms ease-in-out;

  &:hover,
  &:focus {
    background-color: #e1f1ff;
  }

  &.is-featured {
    background-color: #48aaff;
    color: #fff;

    &:hover,
    &:active {
      background-color: #269aff;
    }
  }
`;
export const PlansHero = styled.div`
  text-align: center;
  padding: 5rem 0 4.5rem;
  line-height: 1.21;
`;

export const PlansHeroTitle = styled.h1`
  font-weight: 700;
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: #000;
`;

export const PlansHeroSubtitle = styled.p`
  font-size: 1.2em;
  color: #888;
`;
