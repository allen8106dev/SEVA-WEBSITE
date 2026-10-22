import type { StatisticContent } from "@/content/home";
import { CountValue } from "@/components/animations/count-value";

/** Missing values remain explicit; no zeroes or illustrative impact numbers. */
export function Statistics({ items }: { items: readonly StatisticContent[] }) {
  return (
    <dl className="statistics">
      {items.map((item) => (
        <div
          key={item.label}
          className="statistic"
          data-statistic-status={item.status}
        >
          <dt>{item.label}</dt>
          <dd>
            {item.status === "verified" ? (
              <>
                <span className="statistic__value">
                  {typeof item.value === "number" ? (
                    <CountValue
                      value={item.value}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      maximumFractionDigits={item.maximumFractionDigits}
                    />
                  ) : (
                    item.value
                  )}
                </span>
                <span className="statistic__source">
                  Source: {item.source} · {item.reportingPeriod}
                </span>
              </>
            ) : item.status === "reported" ? (
              <>
                <span className="statistic__value">{item.value}</span>
                <span className="statistic__source">
                  Source: {item.source} · {item.reportingPeriod}
                </span>
                <span className="statistic__audit">
                  Organization-reported · Audit pending
                </span>
              </>
            ) : (
              <>
                <span className="statistic__pending">To be shared</span>
                <span className="statistic__source">
                  Awaiting verified information
                </span>
              </>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
