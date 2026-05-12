// src/components/GpaSummary.jsx — Session 3 version (no props)
import { useSelector } from "react-redux";
import {
  selectStudentCount,
} from "../features/students/studentsSlice";
import {
  selectAverageGpa,
  selectHighAchievers,
  selectGpaDistribution,
} from "../features/students/selectors";

function GpaSummary() {
  // Each useSelector is independent — only re-renders if its value changes
  const count = useSelector(selectStudentCount);
  const avgGpa = useSelector(selectAverageGpa);
  const highList = useSelector(selectHighAchievers);
  const distribution = useSelector(selectGpaDistribution);

  return (
    <div className="gpa-summary-container">
      <div className="gpa-summary">
        <div className="stat-card">
          <span className="stat-value">{count}</span>
          <span className="stat-label">Total Students</span>
        </div>
        <div className="stat-card highlight">
          <span className="stat-value">{avgGpa}</span>
          <span className="stat-label">Average GPA</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{highList.length}</span>
          <span className="stat-label">High Achievers (≥3.5)</span>
        </div>
      </div>
      
      {count > 0 && (
        <div className="distribution-bar">
          <div className="dist-segment high" style={{ width: `${(distribution.high / count) * 100}%` }} title="High Achievers"></div>
          <div className="dist-segment medium" style={{ width: `${(distribution.medium / count) * 100}%` }} title="Medium Achievers"></div>
          <div className="dist-segment low" style={{ width: `${(distribution.low / count) * 100}%` }} title="Low Achievers"></div>
        </div>
      )}
    </div>
  );
}

export default GpaSummary;
