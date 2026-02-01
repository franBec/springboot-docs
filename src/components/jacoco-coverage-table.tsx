type CoverageRow = {
  name: string;
  instructionCoverage?: number;
  branchCoverage?: number;
  missedComplexity: number;
  totalComplexity: number;
  missedLines: number;
  totalLines: number;
  missedMethods: number;
  totalMethods: number;
  missedClasses: number;
  totalClasses: number;
  isTotal?: boolean;
};

export const JacocoCoverageTable = ({ data }: { data: CoverageRow[] }) => (
  <div style={{ overflowX: 'auto' }}>
    <table>
      <thead>
        <tr>
          <th rowSpan={2}>Package / Class</th>
          <th colSpan={2}>Coverage</th>
          <th colSpan={2}>Complexity</th>
          <th colSpan={2}>Lines</th>
          <th colSpan={2}>Methods</th>
          <th colSpan={2}>Classes</th>
        </tr>
        <tr>
          <th>Instr. %</th>
          <th>Branch %</th>
          <th>Missed</th>
          <th>Total</th>
          <th>Missed</th>
          <th>Total</th>
          <th>Missed</th>
          <th>Total</th>
          <th>Missed</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.name}>
            <td>{row.isTotal ? <strong>{row.name}</strong> : row.name}</td>
            <td>
              <strong>
                {row.instructionCoverage === undefined
                  ? 'n/a'
                  : `${row.instructionCoverage}%`}
              </strong>
            </td>
            <td>
              <strong>
                {row.branchCoverage === undefined
                  ? 'n/a'
                  : `${row.branchCoverage}%`}
              </strong>
            </td>
            <td>{row.missedComplexity}</td>
            <td>{row.totalComplexity}</td>
            <td>{row.missedLines}</td>
            <td>{row.totalLines}</td>
            <td>{row.missedMethods}</td>
            <td>{row.totalMethods}</td>
            <td>{row.missedClasses}</td>
            <td>{row.totalClasses}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
