type CoverageMetric = {
  covered: number;
  total: number;
};

type PitSummary = {
  numberOfClasses: number;
  lineCoverage: CoverageMetric;
  mutationCoverage: CoverageMetric;
  testStrength: CoverageMetric;
};

type PitPackageRow = {
  name: string;
  numberOfClasses: number;
  lineCoverage: CoverageMetric;
  mutationCoverage: CoverageMetric;
  testStrength: CoverageMetric;
};

const calculatePercentage = (covered: number, total: number): number => {
  if (total === 0) return 0;
  return Math.trunc((covered / total) * 100);
};

const CoverageBar = ({ metric }: { metric: CoverageMetric }) => {
  const percentage = calculatePercentage(metric.covered, metric.total);
  const greenWidth = percentage;
  const redWidth = 100 - percentage;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ minWidth: '40px', textAlign: 'right' }}>
        {percentage}%
      </span>
      <div
        style={{
          display: 'flex',
          width: '100px',
          height: '16px',
          border: '1px solid #ccc',
        }}
      >
        <div
          style={{
            width: `${greenWidth}%`,
            backgroundColor: '#a4f4a4',
            height: '100%',
          }}
        />
        <div
          style={{
            width: `${redWidth}%`,
            backgroundColor: '#f4a4a4',
            height: '100%',
          }}
        />
      </div>
      <span style={{ minWidth: '50px' }}>
        {metric.covered}/{metric.total}
      </span>
    </div>
  );
};

export const PitCoverageReport = ({
  summary,
  packages,
}: {
  summary: PitSummary;
  packages: PitPackageRow[];
}) => (
  <div style={{ overflowX: 'auto' }}>
    {/* Project Summary */}
    <h3>Project Summary</h3>
    <table>
      <thead>
        <tr>
          <th>Number of Classes</th>
          <th>Line Coverage</th>
          <th>Mutation Coverage</th>
          <th>Test Strength</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{summary.numberOfClasses}</td>
          <td>
            <CoverageBar metric={summary.lineCoverage} />
          </td>
          <td>
            <CoverageBar metric={summary.mutationCoverage} />
          </td>
          <td>
            <CoverageBar metric={summary.testStrength} />
          </td>
        </tr>
      </tbody>
    </table>

    {/* Breakdown by Package */}
    <h3>Breakdown by Package</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Number of Classes</th>
          <th>Line Coverage</th>
          <th>Mutation Coverage</th>
          <th>Test Strength</th>
        </tr>
      </thead>
      <tbody>
        {packages.map((row) => (
          <tr key={row.name}>
            <td>{row.name}</td>
            <td>{row.numberOfClasses}</td>
            <td>
              <CoverageBar metric={row.lineCoverage} />
            </td>
            <td>
              <CoverageBar metric={row.mutationCoverage} />
            </td>
            <td>
              <CoverageBar metric={row.testStrength} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
