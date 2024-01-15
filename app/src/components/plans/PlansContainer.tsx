import { useGetProFeaturesHook } from "@/graphql/queries/pro/pro.queries";
import { FaCheck } from "react-icons/fa";
import { FcBusiness, FcEngineering, FcSalesPerformance } from "react-icons/fc";
import {
  Background,
  BackgroundOverlay,
  Container,
  Panel,
  PlansHero,
  PlansHeroSubtitle,
  PlansHeroTitle,
  PricingButton,
  PricingDescription,
  PricingFeatures,
  PricingFeaturesItem,
  PricingHeader,
  PricingImg,
  PricingPlan,
  PricingPrice,
  PricingTable,
} from "./elements";
import { AppRoutes } from "@/routes/routesDeclaration";

const PlansContainer = () => {
  const { data, loading, error } = useGetProFeaturesHook();
  if (loading) return <div>Loading please wait...</div>;
  if (error) return <div>Sorry there was an error loading plans</div>;
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
            {data?.getProFeatures.map((plan) => (
              <PricingPlan>
                <PricingImg>
                  <FcEngineering />
                  <PricingHeader>{plan?.proName}</PricingHeader>
                </PricingImg>
                <PricingDescription>{plan?.description}</PricingDescription>
                <PricingFeatures>
                  {plan?.features.map((feature) => (
                    <PricingFeaturesItem>
                      <span>
                        <FaCheck />
                      </span>
                      {feature}
                    </PricingFeaturesItem>
                  ))}
                </PricingFeatures>
                <PricingPrice>${plan?.price}</PricingPrice>
                <PricingButton
                  to={`${AppRoutes.CHECKOUT}?planId=${plan?.plan_id}`}
                >
                  Proceed
                </PricingButton>
              </PricingPlan>
            ))}
            {/* <PricingPlan>
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
            </PricingPlan> */}
          </PricingTable>
        </Panel>
      </Container>
    </Background>
  );
};

export default PlansContainer;
