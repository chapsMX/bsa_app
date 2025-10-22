"use client"

export function Ticker() {
  const results = [
    "CIN 18 - GB 27",
    "DET 17 - KC 30",
    "BUF 14 - ATL 24",
    "CHI 25 - WAS 24",
    "DEN 13 - LAR 17",
    "NYJ 11 - BAL 3",
    "DAL 27 - ARI 27",
    "CAR 30 - IND 31",
    "SEA 20 - LAC 28",
    "JAX 12 - MIA 27",
    "CLE 9 - PIT 23",
    "NE 25 - NO 19",
    "TEN 10 - LV 20",
    "SF 19 - TB 30",
  ]

  const doubledResults = [...results, ...results]

  return (
    <div className="bg-primary border-b border-primary-foreground/20 overflow-hidden group">
      <div className="flex animate-ticker group-hover:[animation-play-state:paused]">
        {doubledResults.map((result, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-8 py-2 text-sm font-medium text-primary-foreground whitespace-nowrap"
          >
            {result}
          </div>
        ))}
      </div>
    </div>
  )
}
