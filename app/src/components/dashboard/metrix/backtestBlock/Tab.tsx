import React, { useState } from "react";
import {
  TabContainer,
  TabContainerWrapper,
  TabContent,
  TabLabel,
  TabWrapper,
} from "./elements";
import BacktestTabContent from "./BacktestTabContent";
import DataTabContent from "./dataTabContent/DataTabContent";
import { useAppSelector } from "@/redux/hooks";

interface SwitchableTabsProps {
  tabs: string[];
}

const Tab: React.FC<SwitchableTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const metrix = useAppSelector(
    (state) => state.strategy.selectedStrategyMetrix
  );
  const tradeStats = metrix?.tradeStats;

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <TabContainer>
      <TabWrapper>
        <TabContainerWrapper>
          {tabs.map((label, index) => (
            <TabLabel
              key={index}
              isActive={index === activeTab}
              onClick={() => handleTabClick(index)}
            >
              {label}
            </TabLabel>
          ))}
        </TabContainerWrapper>
      </TabWrapper>
      <TabContent>
        {tabs[activeTab] === "Backtest" && tradeStats ? (
          <BacktestTabContent tradeStats={tradeStats} />
        ) : null}
        {tabs[activeTab] === "Data" && tradeStats && (
          <DataTabContent tradeStats={tradeStats} />
        )}
      </TabContent>
    </TabContainer>
  );
};

export default Tab;
