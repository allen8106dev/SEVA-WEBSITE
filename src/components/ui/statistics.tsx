import type { StatisticContent } from "@/content/home";
import { CountValue } from "@/components/animations/count-value";

/** Missing values remain explicit; no zeroes or illustrative impact numbers. */
export function Statistics({
  items,
  presentation = "detailed",
}: {
  items: readonly StatisticContent[];
  presentation?: "detailed" | "compact";
}) {
  const compact = presentation === "compact";

  return (
    <dl className="statistics">
      {items.map((item) => (
        <div
          key={item.label}
          className={compact ? "statistic statistic--compact" : "statistic"}
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
                <span className={compact ? "sr-only" : "statistic__source"}>
                  Source: {item.source} · {item.reportingPeriod}
                </span>
              </>
            ) : item.status === "reported" ? (
              <>
                <span className="statistic__value">
                  {typeof item.numericValue === "number" ? (
                    <CountValue
                      value={item.numericValue}
                      prefix={item.prefix}
                      suffix={item.suffix}
                    />
                  ) : (
                    item.value
                  )}
                </span>
                <span className={compact ? "sr-only" : "statistic__source"}>
                  Source: {item.source} · {item.reportingPeriod}
                </span>
                <span className={compact ? "sr-only" : "statistic__audit"}>
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
