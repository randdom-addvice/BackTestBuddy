import { Direction } from "@/graphql/api";

interface TradeDetail {
  commission: number;
  asset: string;
  direction: Direction;
  lossValue: number;
  profitValue: number;
  valueType: "percent" | "dollar";
}

enum MetricsInputKeys {
  COMMISSION = "MetricsInputKeys.commission",
  ASSET = "MetricsInputKeys.asset",
  DIRECTION = "MetricsInputKeys.direction",
  LOSS_VALUE = "MetricsInputKeys.lossValue",
  PROFIT_VALUE = "MetricsInputKeys.profitValue",
  VALUE_TYPE = "MetricsInputKeys.valueType",
}

interface IStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export abstract class Storage<T extends string> {
  private readonly storage: IStorage;

  public constructor(getStorage = (): IStorage => window.localStorage) {
    this.storage = getStorage();
  }

  protected get(key: T): T | string | null {
    return this.storage.getItem(key);
  }

  protected set(key: T, value: string | number): void {
    this.storage.setItem(key, value.toString());
  }

  protected clearItem(key: T): void {
    this.storage.removeItem(key);
  }

  protected clearItems(keys: T[]): void {
    keys.forEach((key) => this.clearItem(key));
  }
}

export class UseMetricsInputLocalStorage extends Storage<MetricsInputKeys> {
  private static instance?: UseMetricsInputLocalStorage;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new UseMetricsInputLocalStorage();
    }

    return this.instance;
  }

  public getInputAsset(): TradeDetail["asset"] {
    return this.get(MetricsInputKeys.ASSET) ?? "EURUSD";
  }

  public getInputDirection(): TradeDetail["direction"] {
    return (
      (this.get(MetricsInputKeys.DIRECTION) as Direction) ?? Direction.Long
    );
  }

  public getInputCommisssion(): TradeDetail["commission"] {
    return Number(this.get(MetricsInputKeys.COMMISSION)) ?? 0;
  }

  public getInputLossValue(): TradeDetail["lossValue"] {
    return Number(this.get(MetricsInputKeys.LOSS_VALUE)) ?? 1;
  }

  public getInputProfitValue(): TradeDetail["profitValue"] {
    return Number(this.get(MetricsInputKeys.PROFIT_VALUE)) ?? 2;
  }

  public getInputValueType(): TradeDetail["valueType"] {
    return (
      (this.get(MetricsInputKeys.VALUE_TYPE) as "percent" | "dollar") ??
      "percent"
    );
  }

  public setInputAsset(asset: TradeDetail["asset"]): void {
    this.set(MetricsInputKeys.ASSET, asset);
  }

  public setInputDirection(direction: TradeDetail["direction"]): void {
    this.set(MetricsInputKeys.DIRECTION, direction);
  }

  public setInputCommission(commission: TradeDetail["commission"]): void {
    this.set(MetricsInputKeys.COMMISSION, commission);
  }

  public setInputLossValue(lossValue: TradeDetail["lossValue"]): void {
    this.set(MetricsInputKeys.LOSS_VALUE, lossValue);
  }

  public setInputProfitValue(profitValue: TradeDetail["profitValue"]): void {
    this.set(MetricsInputKeys.PROFIT_VALUE, profitValue);
  }

  public setInputValueType(valueType: TradeDetail["valueType"]): void {
    this.set(MetricsInputKeys.VALUE_TYPE, valueType);
  }

  public clear() {
    this.clearItems([
      MetricsInputKeys.ASSET,
      MetricsInputKeys.COMMISSION,
      MetricsInputKeys.DIRECTION,
      MetricsInputKeys.LOSS_VALUE,
      MetricsInputKeys.PROFIT_VALUE,
      MetricsInputKeys.VALUE_TYPE,
    ]);
  }
}
