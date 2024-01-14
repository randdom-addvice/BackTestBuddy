import { FaCheck } from "react-icons/fa";
import { FcBusiness, FcEngineering, FcSalesPerformance } from "react-icons/fc";
import styled from "styled-components";

const Background = styled.div`
  padding: 0 25px 25px;
  position: relative;
  width: 100%;
  /* background: ${({ theme }) => theme.colors.primary}; */
`;

const BackgroundOverlay = styled.div`
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

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  width: 100%;
`;

const Panel = styled.div`
  border-radius: 10px;
  padding: 15px 25px;
  position: relative;
  width: 100%;
  z-index: 10;
`;

const PricingTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;

const PricingPlan = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  padding: 1.5rem;
  background: #fff;
  border-radius: 9px;

  @media (min-width: 900px) {
    flex-basis: 100%;
  }
`;

const PricingImg = styled.div`
  margin-bottom: 25px;
  max-width: 100%;
  display: flex;
  align-items: center;

  svg {
    font-size: 2rem;
  }
`;
const PricingDescription = styled.p`
  color: ${({ theme }) => theme.colors.grey};
  margin: 1.5rem 0 0;
  font-size: 0.8rem;
`;

const PricingHeader = styled.h2`
  font-weight: 400;
  letter-spacing: 1px;
  margin-left: 0.4rem;
  color: ${({ theme }) => theme.colors.grey};
`;

const PricingFeatures = styled.ul`
  color: #016ff9;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 1rem 0 25px;
  list-style: none;
`;

const PricingFeaturesItem = styled.li`
  /* border-top: 1px solid #e1f1ff; */
  font-size: 12px;
  line-height: 1.5;
  padding: 15px 0;

  span {
    margin-right: 0.5rem;
  }
`;

const PricingPrice = styled.span`
  color: #016ff9;
  display: block;
  font-size: 32px;
  font-weight: 700;
`;

const PricingButton = styled.a`
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
const PlansHero = styled.div`
  text-align: center;
  padding: 5rem 0 4.5rem;
  line-height: 1.21;
`;

const PlansHeroTitle = styled.h1`
  font-weight: 700;
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: #000;
`;

const PlansHeroSubtitle = styled.p`
  font-size: 1.2em;
  color: #888;
`;

const PlansContainer = () => {
  return (
    <Background>
      {/* <BackgroundOverlay /> */}
      <PlansHero>
        <PlansHeroTitle>Simple, transparent pricing</PlansHeroTitle>
        <PlansHeroSubtitle>No contracts. No surprise fees.</PlansHeroSubtitle>
      </PlansHero>
      <Container>
        <Panel>
          <PricingTable>
            <PricingPlan>
              <PricingImg>
                <FcEngineering />
                <PricingHeader>Personal</PricingHeader>
              </PricingImg>
              <PricingDescription>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus, debitis?
              </PricingDescription>
              <PricingFeatures>
                <PricingFeaturesItem>
                  <span>
                    <FaCheck />
                  </span>
                  Custom domains
                </PricingFeaturesItem>
                <PricingFeaturesItem>
                  <span>
                    <FaCheck />
                  </span>
                  Sleeps after 30 mins of inactivity
                </PricingFeaturesItem>
              </PricingFeatures>
              <PricingPrice>Free</PricingPrice>
              <PricingButton href="#/">Sign up</PricingButton>
            </PricingPlan>

            <PricingPlan>
              <PricingImg>
                <FcBusiness />
                <PricingHeader>Small team</PricingHeader>
              </PricingImg>
              <PricingDescription>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus, debitis?
              </PricingDescription>
              <PricingFeatures>
                <PricingFeaturesItem>
                  <span>
                    <FaCheck />
                  </span>
                  Never sleeps
                </PricingFeaturesItem>
                <PricingFeaturesItem>
                  <span>
                    <FaCheck />
                  </span>
                  Multiple workers for more powerful apps
                </PricingFeaturesItem>
              </PricingFeatures>
              <PricingPrice>$150</PricingPrice>
              <PricingButton href="#/" className="is-featured">
                Free trial
              </PricingButton>
            </PricingPlan>

            <PricingPlan>
              <PricingImg>
                <FcSalesPerformance />
                <PricingHeader>Enterprise</PricingHeader>
              </PricingImg>
              <PricingDescription>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Accusamus, debitis?
              </PricingDescription>
              <PricingFeatures>
                <PricingFeaturesItem>
                  <span>
                    <FaCheck />
                  </span>
                  Dedicated
                </PricingFeaturesItem>
                <PricingFeaturesItem>
                  <span>
                    <FaCheck />
                  </span>
                  Simple horizontal scalability
                </PricingFeaturesItem>
              </PricingFeatures>
              <PricingPrice>$400</PricingPrice>
              <PricingButton href="#/">Free trial</PricingButton>
            </PricingPlan>
          </PricingTable>
        </Panel>
      </Container>
    </Background>
  );
};

export default PlansContainer;
