public class AttendanceRule implements Rules {
    public boolean isEligible(StudentProfile s) {
        return s.getAttendancePct() >= RuleInput.minAttendance;
    }
    
    public String reason() {
        return "attendance below 75";
    }
}
